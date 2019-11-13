const router = require('express').Router();
const usersController = require('../controllers/users.controller')
const auth = require('../middlewares/auth')

router.post('/register', usersController.createUser)
router.post('/login', usersController.auth)
router.post('/me', auth(), usersController.me)

module.exports = router;
