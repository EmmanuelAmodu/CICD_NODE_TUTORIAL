const router = require('express').Router()

router.use('/', require('./home.route'))
router.use('/courses', require('./courses.route'))
router.use('/user', require('./users.route'))

module.exports = router
