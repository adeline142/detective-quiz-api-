const { matchedData } = require('express-validator');
const playerService = require('../services/player.service');
const sessionService = require('../services/session.service');

function toJson(seat) {
  return { player_id: seat.seat_id, nickname: seat.nickname, score: seat.score };
}

async function join(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const { nickname } = matchedData(req, { locations: ['body'] });
  const { session, player, created } = await playerService.join(code, nickname, req.user);
  res.status(created ? 201 : 200).json({
    ...toJson(player),
    rejoined: !created,
    session: { code: session.session_code, status: sessionService.normalize(session.status) },
  });
}

async function list(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const seats = await playerService.list(code);
  res.status(200).json(seats.map(toJson));
}

module.exports = { join, list };
