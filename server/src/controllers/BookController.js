const {Book} = require('../models/')
const {Bettor} = require('../models/')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignBettor (bettor) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(bettor, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async createBook (req, res) {
    try {
      var jsonArr = []
      console.log(req.body)
      console.log(JSON.stringify(req.body.books))
      const dat = JSON.parse(JSON.stringify(req.body.books))
      for (var eachbook in dat) {
        const book = await Book.create(dat[eachbook])
        const bookJson = book.toJSON()
        jsonArr.push({bookJson})
      }
      res.send({
        book: jsonArr
      })
    } catch (err) {
      res.status(400).send({
        error: 'An error occurred trying to create your book'
      })
    }
  },
  async createBookTest (req, res) {
    try {
      var jsonArr = []
      for (var eachbook in req.body) {
        const book = await Book.create(req.body[eachbook])
        const bookJson = book.toJSON()
        jsonArr.push({bookJson})
      }
      res.send({
        book: jsonArr
      })
    } catch (err) {
      res.status(400).send({
        error: 'An error occurred trying to create your book'
      })
    }
  },
  async createBettor (req, res) {
    try {
      var jsonBettorArr = []
      console.log(JSON.stringify(req.body.bettors))
      const bettordat = JSON.parse(JSON.stringify(req.body.bettors))
      for (var eachBettor in bettordat) {
        const bettor = await Bettor.create(bettordat[eachBettor])
        const bettorJson = bettor.toJSON()
        jsonBettorArr.push({bettorJson})
      }
      res.send({
        bettor: jsonBettorArr,
        token: jwtSignBettor(jsonBettorArr[eachBettor])
      })
    } catch (err) {
      res.status(400).send({
        error: 'This username account is already in use.'
      })
    }
  },
  async createBettorTest (req, res) {
    try {
      var jsonBettorArr = []
      console.log(JSON.stringify(req.body.bettors))
      const bettordat = JSON.parse(JSON.stringify(req.body.bettors))
      for (var eachBettor in bettordat) {
        const bettor = await Bettor.create(bettordat[eachBettor])
        const bettorJson = bettor.toJSON()
        jsonBettorArr.push({bettorJson})
      }
      res.send({
        bettor: jsonBettorArr,
        token: jwtSignBettor(jsonBettorArr[eachBettor])
      })
    } catch (err) {
      res.status(400).send({
        error: 'This username account is already in use.'
      })
    }
  },
  async getBook (req, res) {
    try {
      const books = await Book.findAll({
        where: {
          owner: req.body.owner
        },
        limit: 10
      })
      res.send(books)
    } catch (err) {
      res.status(400).send({
        error: 'An error occured trying to fetch your books'
      })
    }
  },
  async getBettor (req, res) {
    try {
      const bettors = await Bettor.findAll({
        where: {
          bookowner: req.body.bookowner,
          bookname: req.body.bookname
        },
        limit: 10
      })
      res.send(bettors)
    } catch (err) {
      res.status(400).send({
        error: 'An error occurred trying to fetch the bettors in this book'
      })
    }
  }
}
