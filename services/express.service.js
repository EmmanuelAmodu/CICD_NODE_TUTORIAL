require('express-async-errors')
const express = require('express')
const config = require('../config')
const helmet = require('helmet')
const morgan = require('morgan')
const router = require('../routes')
const app = express()
const errorHandler = require('../middlewares/errorHandler')

module.exports = function() {
    app.set('view engine', 'pug')
    app.set('views', '../views')

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(morgan('tiny', { skip: () => config.env === 'prod' }))
    app.use(helmet())
    app.use('/api', router)
    app.use(errorHandler)
    return app
}
