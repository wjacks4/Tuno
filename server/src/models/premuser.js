const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (premuser, options) {
  const SALT_FACTOR = 8

  if (!premuser.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(premuser.password, salt, null))
    .then(hash => {
      premuser.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const PremUser = sequelize.define('PremUser', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  PremUser.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  return PremUser
}
