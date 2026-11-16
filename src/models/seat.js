// A seat = one account inside one game. The slides call it a "player".
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Seat',
    {
      seat_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      game: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      nickname: { type: DataTypes.STRING(128), allowNull: false },
      score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { tableName: 'seats', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
  );
