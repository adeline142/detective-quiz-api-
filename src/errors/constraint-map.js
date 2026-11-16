// A database rule was broken -> what the client should hear.
// The key is the constraint name from YOUR migration.
// A constraint that is not listed here still answers 409, with the code CONFLICT.
module.exports = {
  uq_question_sets_host_title: {
    status: 409,
    code: 'QUESTION_SET_TITLE_TAKEN',
    message: 'You already have a question set with that title.',
  },
  uq_seats_game_nickname: {
    status: 409,
    code: 'NICKNAME_TAKEN',
    message: 'That nickname is already used in this game.',
  },
};
