const express = require('express')
const config = require('../config')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const router = require('../routes')
const app = express()

module.exports = function() {
    app.set('view engine', 'pug')
    app.set('views', '../views')

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(morgan('tiny', { skip: () => config.env === 'prod' }))
    app.use(helmet())
    app.use(compression())
    app.use('/api', router)
    return app
}
