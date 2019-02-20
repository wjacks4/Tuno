const {Bet} = require('../models/')

module.exports = {
  async placeBets (req, res) {
    try {
      const bet = await Bet.create(req.body)
      const betJson = bet.toJSON()
      res.send({
        bet: betJson
      })
    } catch (err) {
      res.status(400).send({
        error: 'An error occured trying to place bet'
      })
    }
  }
}
