const express = require('express')
const config = require('./config')
const helmet = require('helmet')
const morgan = require('morgan')
const startUpDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const router = require('./routes')
const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(morgan('tiny', { skip: (req, res) => config.env === 'prod' }))
app.use(helmet())

app.use('/api', router)

app.use(function(req, res, next){
    next();
})

const port = config.port
app.listen(port, () => startUpDebugger(`Listen on port ${port}`))
