'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('seats', [
      {
        seat_id: 1,
        game: 1,
        user_id: 1,
        nickname: 'CaseBreaker',
        score: 150,
        completed: true,
        created_at: new Date('2026-01-01T10:00:00Z'),
        updated_at: new Date('2026-01-01T11:00:00Z'),
      },
      {
        seat_id: 2,
        game: 1,
        user_id: 2,
        nickname: 'Inspector',
        score: 130,
        completed: true,
        created_at: new Date('2026-01-01T10:00:00Z'),
        updated_at: new Date('2026-01-01T11:00:00Z'),
      },
      {
        seat_id: 3,
        game: 1,
        user_id: 3,
        nickname: 'Sleuth',
        score: 90,
        completed: true,
        created_at: new Date('2026-01-01T10:00:00Z'),
        updated_at: new Date('2026-01-01T11:00:00Z'),
      },
      {
        seat_id: 4,
        game: 1,
        user_id: 4,
        nickname: 'Rookie',
        score: 40,
        completed: false,
        created_at: new Date('2026-01-01T10:00:00Z'),
        updated_at: new Date('2026-01-01T11:00:00Z'),
      },
      {
        seat_id: 5,
        game: 2,
        user_id: 1,
        nickname: 'CaseBreaker',
        score: 30,
        completed: false,
        created_at: new Date('2026-01-02T10:00:00Z'),
        updated_at: new Date('2026-01-02T10:00:00Z'),
      },
      {
        seat_id: 6,
        game: 2,
        user_id: 2,
        nickname: 'Inspector',
        score: 70,
        completed: false,
        created_at: new Date('2026-01-02T10:00:00Z'),
        updated_at: new Date('2026-01-02T10:00:00Z'),
      },
    ]);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('seats', 'seat_id'), (SELECT MAX(seat_id) FROM seats))"
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('seats', null, {});
  },
};
