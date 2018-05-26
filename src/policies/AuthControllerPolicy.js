const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      user: Joi.string().regex(
        new RegExp('^[A-Za-z0-9]{8,32}')
      ),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[A-Za-z0-9]{8,32}')
      )
    }
    const {err} = Joi.validate(req.body, schema)

    if (err) {
      switch (err.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'your email is not vaild'
          })
          break
        case 'user':
          res.status(400).send({
            error: `The username provided failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numerics.
              <br>
              2. It must be at least 8 characters in length and not greater than 32 characters in length.
            `
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numerics.
              <br>
              2. It must be at least 8 characters in length and not greater than 32 characters in length.
            `
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
