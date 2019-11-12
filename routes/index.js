const router = require('express').Router()

router.use('/', require('./home.route'))
router.use('/courses', require('./courses.route'))

module.exports = router
