const authController = require('./controllers/AuthController')
const authControllerPolicy = require('./policies/authControllerPolicy')
const passport = require('passport')

function checkAuth (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, decryptToken, jwtError) => {
    if (jwtError || err) {
      return res.status(403).send({
        error: 'you must auth'
      })
    }
    req.user = decryptToken
    next()
  })(req, res, next)
}

module.exports = (app) => {
  app.post('/profile', checkAuth)
  app.post('/register', authControllerPolicy.register, authController.register)
  app.post('/login', authController.login)
}
