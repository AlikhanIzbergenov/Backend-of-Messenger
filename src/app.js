const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const {sequelize} = require('./models')
const config = require('./config/config')
const passport = require('passport')
const { Strategy } = require('passport-jwt')

const app = express()

passport.use(new Strategy({
  secretOrKey: config.auth.jwtSecret,
  jwtFromRequest: config.auth.ExtractJwt

}, function (jwtPayload, done) {
  if (jwtPayload) return done(false, jwtPayload)
  done()
}))

app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors())

require('./routes')(app)

sequelize.sync()
  .then(() => {
    app.listen(config.PORT)
  })
