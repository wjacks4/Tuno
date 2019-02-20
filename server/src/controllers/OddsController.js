const {Game} = require('../models/')

module.exports = {
  async getOdds (req, res) {
    try {
      const odds = await Game.findAll({
        attributes: ['game_id', 'away_team', 'home_team', 'away_moneyline',
          'home_moneyline', 'away_spread', 'away_spread_odds', 'home_spread', 'home_spread_odds', 'line',
          'line_over_odds', 'line_under_odds'],
        limit: 10
      })
      res.send(odds)
    } catch (err) {
      res.status(400).send({
        error: 'An error occured trying to fetch songs'
      })
    }
  }
}
