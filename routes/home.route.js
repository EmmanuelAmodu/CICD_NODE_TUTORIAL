const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'express App',
        message: 'Hello World'
    })
})

module.exports = router;
