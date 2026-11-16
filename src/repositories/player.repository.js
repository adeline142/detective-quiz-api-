// The only file that queries seats. No rules here.
const { Op } = require('sequelize');
const { Seat, GameSession } = require('../models');

const RUNNING = ['RUNNING', 'IN_PROGRESS'];

function findSeat(sessionId, userId) {
  return Seat.findOne({ where: { game: sessionId, user_id: userId } });
}
function countBySession(sessionId) {
  return Seat.count({ where: { game: sessionId } });
}
function create(data) {
  return Seat.create(data);
}
function listBySession(sessionId) {
  return Seat.findAll({
    where: { game: sessionId },
    order: [['score', 'DESC'], ['seat_id', 'ASC']],
  });
}
// A seat of this account in ANOTHER game that is running, or null.
function findRunningSeatElsewhere(userId, sessionId) {
  return Seat.findOne({
    where: { user_id: userId, game: { [Op.ne]: sessionId } },
    include: [{ model: GameSession, as: 'session', where: { status: { [Op.in]: RUNNING } } }],
  });
}

module.exports = { findSeat, countBySession, create, listBySession, findRunningSeatElsewhere };
