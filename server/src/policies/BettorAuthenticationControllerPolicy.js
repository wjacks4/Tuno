const Joi = require('joi')

module.exports = {
  createBettor (req, res, next) {
    const schema = {
      username: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      credit: Joi.number().integer().min(0).max(1000),
      bookowner: Joi.string(),
      bookname: Joi.string()
    }
    const bettordat = JSON.parse(JSON.stringify(req.body.bettors))
    for (var eachBettor in bettordat) {
      const {error, value} = Joi.validate(bettordat[eachBettor], schema) // eslint-disable-line no-unused-vars
      if (error) {
        switch (error.details[0].context.key) {
          case 'email' :
            res.status(400).send({
              error: `The username provided failed to match the following rules:
              <br>
              1. It must contain only the following characters: lower case, upper case, numbers.
              <br>
              2. It must be at least 8 characters in length.
              `
            })
            break
          case 'password' :
            res.status(400).send({
              error: `The password provided failed to match the following rules:
              <br>
              1. It must contain only the following characters: lower case, upper case, numbers.
              <br>
              2. It must be at least 8 characters in length.
              `
            })
            break
          case 'credit' :
            res.status(400).send({
              error: 'The credit amount provided must be in the form of an integer between 0 and 1000'
            })
            break
          case 'bookowner' :
            res.status(400).send({
              error: 'No premium user is signed in'
            })
            break
          case 'bookname' :
            res.status(400).send({
              error: 'There was a problem creating a bettor in this book'
            })
            break
          default:
            res.status(400).send({
              error: 'Invalid bettor registration information'
            })
        }
      } else {
      }
    }
    next()
  }
}
