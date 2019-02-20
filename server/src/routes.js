const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const PremAuthenticationController = require('./controllers/PremAuthenticationController')
const PremAuthenticationControllerPolicy = require('./policies/PremAuthenticationControllerPolicy')

const BettorAuthenticationControllerPolicy = require('./policies/BettorAuthenticationControllerPolicy')
const BettorAuthTest = require('./policies/BettorAuthTest')

const BetsController = require('./controllers/BetsController')
const OddsController = require('./controllers/OddsController')
const BookController = require('./controllers/BookController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/premregister',
    PremAuthenticationControllerPolicy.premregister,
    PremAuthenticationController.premregister)

  app.post('/premlogin',
    PremAuthenticationController.premlogin)

  app.post('/login',
    AuthenticationController.login)

  app.post('/premlogin',
    PremAuthenticationController.premlogin)

  app.get('/odds',
    OddsController.getOdds)

  app.post('/bets',
    BetsController.placeBets)

  app.post('/books/createBook',
    BookController.createBook)

  app.post('/books/createBookTest',
    BookController.createBookTest)

  app.post('/books/getBook',
    BookController.getBook)

  app.post('/books/createBettor',
    BettorAuthenticationControllerPolicy.createBettor,
    BookController.createBettor)

  app.post('/books/createBettorTest',
    BettorAuthTest.createBettor,
    BookController.createBettorTest)

  app.post('/books/getBettors',
    BookController.getBettor)
}
