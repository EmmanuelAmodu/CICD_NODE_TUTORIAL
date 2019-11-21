const router = require('express').Router();
const usersController = require('../controllers/users.controller')
const auth = require('../middlewares/auth')
const asyncHandler = require('../middlewares/asyncHandler')

router.post('/register', asyncHandler(usersController.createUser))
router.post('/login', asyncHandler(usersController.auth))
router.get('/me', auth(), asyncHandler(usersController.me))

module.exports = router;
