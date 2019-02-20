module.exports = (sequelize, DataTypes) => {
  const Bet = sequelize.define('Bet', {
    event: DataTypes.STRING,
    outcome: DataTypes.STRING,
    bet_type: DataTypes.STRING, // eslint-disable-line camelcase
    odds: DataTypes.STRING,
    wager: DataTypes.INTEGER,
    payout: DataTypes.INTEGER
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: 'user_bets' // eslint-disable-line camelcase
  })
  return Bet
}
