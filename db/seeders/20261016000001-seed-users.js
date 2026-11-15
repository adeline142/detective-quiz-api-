'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        school_id: '2023-0001',
        full_name: 'Adeline D. Rodriguez',
        email: 'adeline@example.com',
        role: 'HOST',
        created_at: new Date('2026-01-01T00:00:00Z'),
        updated_at: new Date('2026-01-01T00:00:00Z'),
      },
      {
        user_id: 2,
        school_id: '2023-0002',
        full_name: 'Sample Host Two',
        email: 'host2@example.com',
        role: 'HOST',
        created_at: new Date('2026-01-01T00:00:00Z'),
        updated_at: new Date('2026-01-01T00:00:00Z'),
      },
      {
        user_id: 3,
        school_id: '2023-0003',
        full_name: 'Sample Admin Three',
        email: 'admin3@example.com',
        role: 'ADMIN',
        created_at: new Date('2026-01-01T00:00:00Z'),
        updated_at: new Date('2026-01-01T00:00:00Z'),
      },
      {
        user_id: 4,
        school_id: '2023-0004',
        full_name: 'Sample Player Four',
        email: 'player4@example.com',
        role: 'PLAYER',
        created_at: new Date('2026-01-01T00:00:00Z'),
        updated_at: new Date('2026-01-01T00:00:00Z'),
      },
    ]);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('users', 'user_id'), (SELECT MAX(user_id) FROM users))"
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
