module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'GameSession',
    {
      game_session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      session_code: { type: DataTypes.STRING(6), allowNull: false, unique: true },
      status: { type: DataTypes.STRING(32), allowNull: false, defaultValue: 'LOBBY' },
      max_players: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 50 },
      started_at: { type: DataTypes.DATE, allowNull: true },
      ended_at: { type: DataTypes.DATE, allowNull: true },
    },
    { tableName: 'game_sessions', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
  );
