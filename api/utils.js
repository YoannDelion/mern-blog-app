const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, 'notSoSecretKey', (err, payload) => {
      if (err) {
        res.status(403).json('Invalid token!')
      }

      req.user = payload
      next()
    })
  } else {
    res.status(401).json("You are not authenticated!")
  }
}

module.exports = { verify }