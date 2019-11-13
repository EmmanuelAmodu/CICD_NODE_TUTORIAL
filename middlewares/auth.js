const jwt = require('jsonwebtoken')
const config = require('../config')

const UserModel = require('../models/user.model')

module.exports = (roles = UserModel.getRoles()) =>  (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Access denied. No token provided')

    try {
        const decoded = jwt.verify(token, config.appKey)
        if (roles.include(decoded.role)) {
            req.user = decoded
            next()
        } else return res.status(403).send('Insufficient priviledge');
    } catch (error) {
        res.status(400).send('Access denied. Invalid token')
    }
}
