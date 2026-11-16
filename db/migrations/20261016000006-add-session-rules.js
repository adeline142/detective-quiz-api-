'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Room limit for SESSION_FULL.
    await queryInterface.addColumn('game_sessions', 'max_players', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 50,
    });
    // A new game starts in the lobby. Old rows keep their status.
    await queryInterface.changeColumn('game_sessions', 'status', {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: 'LOBBY',
    });
    // One nickname per game.
    await queryInterface.addConstraint('seats', {
      fields: ['game', 'nickname'],
      type: 'unique',
      name: 'uq_seats_game_nickname',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('seats', 'uq_seats_game_nickname');
    await queryInterface.changeColumn('game_sessions', 'status', {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: 'IN_PROGRESS',
    });
    await queryInterface.removeColumn('game_sessions', 'max_players');
  },
};
