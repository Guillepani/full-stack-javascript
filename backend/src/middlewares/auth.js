const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json('No autorizado')
    }

    const parsedToken = token.replace('Bearer ', '')

    const decoded = jwt.verify(parsedToken, process.env.JWT_SECRET)

    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json('Token inválido')
  }
}

module.exports = auth