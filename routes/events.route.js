const router = require('express').Router();
const eventsController = require('../controllers/events.controller')
const auth = require('../middlewares/auth')
const asyncHandler = require('../middlewares/asyncHandler')

router.get('', asyncHandler(eventsController.getAllEvents))
router.get('/:id', asyncHandler(eventsController.getEvent))
router.post('', auth(), asyncHandler(eventsController.createEvent))
router.put('/:id', auth(), asyncHandler(eventsController.updateEvents))
router.delete('/:id', auth(), asyncHandler(eventsController.deleteEvent))

module.exports = router;
