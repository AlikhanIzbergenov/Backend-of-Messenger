const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const {sequelize} = require('./models')
const config = require('./config/config')
const passport = require('passport')
const { Strategy } = require('passport-jwt')

// const app = express()

// const server = require('http').Server(app)
// const io = require('socket.io')(server, {serveClient: true})
// const io = require('socket.io')(server)

const app = express()
const server = app.listen(8081)

var io = require('socket.io').listen(server)

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

app.use(cors({ origin: 'http://localhost:8080', credentials: true }))

sequelize.sync()

io.on('connection', (socket) => {
  console.log('A user connected:' + socket.id)
  io.emit('conn', socket.id)

  socket.on('disconnect', function () {
    console.log('User left: ' + socket.id)
    socket.broadcast.emit('user left', socket.id)
  })
})
require('./routes')(app)
