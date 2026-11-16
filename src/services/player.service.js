// The rules for joining. No req, no res.
const { UniqueConstraintError } = require('sequelize');
const playerRepository = require('../repositories/player.repository');
const sessionService = require('./session.service');
const { conflict } = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');

async function join(code, nickname, user) {
  const session = await sessionService.findOrFail(code);

  // 1. Rejoin: this account already has a seat here. Same row, same score.
  const seat = await playerRepository.findSeat(session.game_session_id, user.user_id);
  if (seat) return { session, player: seat, created: false };

  // 2. One game at a time: a RUNNING seat in another game blocks a new seat.
  const elsewhere = await playerRepository.findRunningSeatElsewhere(
    user.user_id,
    session.game_session_id
  );
  if (elsewhere) {
    throw conflict('ALREADY_IN_GAME', 'You are still playing another game. Finish it first.');
  }

  // 3. A new seat: only in the lobby, and only if there is room.
  const status = sessionService.normalize(session.status);
  if (status === 'CLOSED') throw conflict('SESSION_ENDED', 'This game has ended.');
  if (status !== 'LOBBY') throw conflict('SESSION_NOT_JOINABLE', 'This game has already started.');

  const taken = await playerRepository.countBySession(session.game_session_id);
  if (taken >= session.max_players) throw conflict('SESSION_FULL', 'This game is full.');

  try {
    const player = await playerRepository.create({
      game: session.game_session_id,
      user_id: user.user_id,
      nickname,
    });
    return { session, player, created: true };
  } catch (error) {
    // Two requests from one account at the same instant: the second one is a rejoin.
    if (error instanceof UniqueConstraintError && constraintOf(error) === 'seats_game_user_id_unique') {
      const existing = await playerRepository.findSeat(session.game_session_id, user.user_id);
      return { session, player: existing, created: false };
    }
    throw error; // a taken nickname is mapped in constraint-map.js
  }
}

async function list(code) {
  const session = await sessionService.findOrFail(code);
  return playerRepository.listBySession(session.game_session_id);
}

module.exports = { join, list };
