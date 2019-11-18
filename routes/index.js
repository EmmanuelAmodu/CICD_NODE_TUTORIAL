const router = require('express').Router()

router.use('/courses', require('./courses.route'))
router.use('/user', require('./users.route'))

module.exports = router
