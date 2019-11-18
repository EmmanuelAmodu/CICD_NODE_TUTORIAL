const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('here,  heree')
    res.render('index', {
        title: 'express App',
        message: 'Hello World'
    })
})

module.exports = router;
