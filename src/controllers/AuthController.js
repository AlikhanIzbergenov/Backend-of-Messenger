const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcryptjs')

function jwtSignUser (user) {
  return jwt.sign({
    email: user.email,
    id: user.id
  },
  config.auth.jwtSecret, {
    expiresIn: config.auth.TIME
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create({
        'email': req.body.email,
        'user': req.body.user,
        'password': bcrypt.hashSync(req.body.password, 12)
      })
      const userJson = user.toJSON()

      res.cookie('token', jwtSignUser(userJson), {
        httpOnly: true
      })
    } catch (err) {
      res.status(400).send({
        error: 'error'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const isPasswordValid = await bcrypt.compareSync(password, user.password)

      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const userJson = user.toJSON()

      res.cookie('token', jwtSignUser(userJson), {
        httpOnly: true
      })

      res.send({
        msg: 'OK'
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}
