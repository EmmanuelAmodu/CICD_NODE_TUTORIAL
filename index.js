const mongoose = require('mongoose')
const app = require('./services/express.service')()
require('./main')(app, mongoose)
