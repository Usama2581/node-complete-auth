const jwt = require('jsonwebtoken')
const config = require('../config/jwt')
const secret = config.secret

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization

    if (!token) {
        return res.send({ message: 'Authorization token required' })
    }

    if (token.indexOf('Bearer') !== -1) {
        token = token.slice(7)
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.send({ message: 'Invalid Authorization Token' })
        }

        next()
    })
}

module.exports = verifyToken