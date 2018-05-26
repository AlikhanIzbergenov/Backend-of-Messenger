function ExtractJwt (req) {
  let token = null
  if (req.cookies && req.cookies.token) {
    token = req.cookies['token']
  }
  return token
}
module.exports = {
  PORT: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'social',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: process.env.PORT || './social.sqlite'
    }
  },
  auth: {
    jwtSecret: 'ZgpSvUte48mbCSyRt7xAJXR9Jqy9y3vL',
    TIME: 60 * 60 * 24 * 7,
    ExtractJwt: ExtractJwt
  }
}
