module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'nfl_odds_table' // eslint-disable-line camelcase
  })

  return Game
}
