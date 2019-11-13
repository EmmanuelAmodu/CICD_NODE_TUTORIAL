const express = require('express')
const config = require('./config')
const helmet = require('helmet')
const morgan = require('morgan')
const startUpDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const router = require('./routes')
const mongo = require('./services/mongoose.service')
const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(morgan('tiny', { skip: () => config.env === 'prod' }))
app.use(helmet())

app.use('/api', router)

app.use(function(req, res, next){
    next();
})

mongo().then(db => {
    console.log(`db name ${db.name}`)
    app.listen(config.port, () => startUpDebugger(`Listen on port ${config.port}`))
}).catch(err => {
    console.error(err)
})
