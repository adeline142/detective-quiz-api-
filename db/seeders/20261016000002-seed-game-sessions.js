'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('game_sessions', [
      {
        game_session_id: 1,
        session_code: '123456',
        status: 'FINISHED',
        started_at: new Date('2026-01-01T10:00:00Z'),
        ended_at: new Date('2026-01-01T11:00:00Z'),
        created_at: new Date('2026-01-01T09:59:00Z'),
        updated_at: new Date('2026-01-01T11:00:00Z'),
      },
      {
        game_session_id: 2,
        session_code: '654321',
        status: 'IN_PROGRESS',
        started_at: new Date('2026-01-02T10:00:00Z'),
        ended_at: null,
        created_at: new Date('2026-01-02T09:59:00Z'),
        updated_at: new Date('2026-01-02T10:00:00Z'),
      },
    ]);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('game_sessions', 'game_session_id'), (SELECT MAX(game_session_id) FROM game_sessions))"
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('game_sessions', null, {});
  },
};
