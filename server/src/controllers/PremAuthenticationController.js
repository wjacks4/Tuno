const {PremUser} = require('../models/')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async premregister (req, res) {
    try {
      const premuser = await PremUser.create(req.body)
      const premuserJson = premuser.toJSON()
      res.send({
        premuser: premuserJson,
        premtoken: jwtSignUser(premuserJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },

  async premlogin (req, res) {
    try {
      const {email, password} = req.body
      const premuser = await PremUser.findOne({
        where: {
          email: email
        }
      })

      if (!premuser) {
        res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await premuser.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const premuserJson = premuser.toJSON()
      res.send({
        premuser: premuserJson,
        premtoken: jwtSignUser(premuserJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'Invalid login information'
      })
    }
  }
}
