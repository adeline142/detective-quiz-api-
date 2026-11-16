// The rules for games. No req, no res.
const crypto = require('crypto');
const { UniqueConstraintError } = require('sequelize');
const sessionRepository = require('../repositories/session.repository');
const { notFound, conflict } = require('../errors/app-error');

// Old seed rows may say IN_PROGRESS. It means RUNNING.
function normalize(status) {
  return status === 'IN_PROGRESS' ? 'RUNNING' : status;
}

// Which status may follow which.
const ALLOWED = {
  LOBBY: ['RUNNING', 'CLOSED'],
  RUNNING: ['CLOSED'],
  CLOSED: [],
};

// Six digits, never starting with 0.
function newCode() {
  return String(crypto.randomInt(100000, 1000000));
}

async function findOrFail(code) {
  const session = await sessionRepository.findByCode(code);
  if (!session) throw notFound('SESSION_NOT_FOUND', `No game has the code ${code}.`);
  return session;
}

// The server makes the code. The client never chooses it.
async function create(data) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = newCode();
    if (await sessionRepository.findByCode(code)) continue;
    try {
      return await sessionRepository.create({ ...data, session_code: code, status: 'LOBBY' });
    } catch (error) {
      if (error instanceof UniqueConstraintError) continue; // two games chose the same code
      throw error;
    }
  }
  throw new Error('Could not make a free join code.');
}

function get(code) {
  return findOrFail(code);
}

async function changeStatus(code, status) {
  const session = await findOrFail(code);
  const current = normalize(session.status);
  if (!ALLOWED[current] || !ALLOWED[current].includes(status)) {
    if (current === 'CLOSED') throw conflict('SESSION_ENDED', 'This game has ended.');
    throw conflict('INVALID_STATUS_CHANGE', `A ${current} game cannot become ${status}.`);
  }
  const changes = { status };
  if (status === 'RUNNING') changes.started_at = new Date();
  if (status === 'CLOSED') changes.ended_at = new Date();
  return sessionRepository.update(session, changes);
}

module.exports = { findOrFail, normalize, create, get, changeStatus };
