const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (bettor, options) {
  const SALT_FACTOR = 8

  if (!bettor.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(bettor.password, salt, null))
    .then(hash => {
      bettor.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const Bettor = sequelize.define('Bettor', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    credit: DataTypes.STRING,
    bookowner: DataTypes.STRING,
    bookname: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  Bettor.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  return Bettor
}
