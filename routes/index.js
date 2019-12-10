const router = require('express').Router()

router.use('/events', require('./events.route'))
router.use('/user', require('./users.route'))

module.exports = router
