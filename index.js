const mongoose = require('mongoose')
const express = require('express');
require('express-async-errors')
const app = require('./services/express.service')()
require('./main')(app, mongoose)
