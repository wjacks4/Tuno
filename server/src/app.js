
console.log('Hello bitch')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const app = express()

app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

console.log(config.port)
console.log(config.db.host)
console.log(config.db.database)
console.log(config.db.user)
console.log(config.db.password)

sequelize.sync({force: false})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
