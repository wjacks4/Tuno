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
    var errorArr = []
    for (var eachBettor in bettordat) {
      const {error, value} = Joi.validate(bettordat[eachBettor], schema) // eslint-disable-line no-unused-vars
      if (error) {
        switch (error.details[0].context.key) {
          case 'username' :
            console.log('Ayo your username is fucked up')
            console.log(value)
            errorArr.push(value)
            break
        }
      } else {
      }
    }
    console.log(errorArr)
    if (errorArr.length !== 0) {
      res.status(400).send({
        error: 'Something fucked up hombre'
      })
    } else {
      next()
    }
  }
}
