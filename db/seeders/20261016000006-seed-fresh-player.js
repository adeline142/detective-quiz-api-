'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      "INSERT INTO users (school_id, full_name, email, role, created_at) " +
        "SELECT '2023-0005', 'Sample Player Five', 'player5@example.com', 'PLAYER', NOW() " +
        "WHERE NOT EXISTS (SELECT 1 FROM users WHERE school_id = '2023-0005')"
    );
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query("DELETE FROM users WHERE school_id = '2023-0005'");
  },
};
