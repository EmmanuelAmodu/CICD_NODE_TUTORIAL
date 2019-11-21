const router = require('express').Router();
const coursesController = require('../controllers/courses.controller')
const auth = require('../middlewares/auth')
const asyncHandler = require('../middlewares/asyncHandler')

router.get('', asyncHandler(coursesController.getAllCourses))
router.get('/:id', asyncHandler(coursesController.getCourse))
router.post('', auth(), asyncHandler(coursesController.createCourse))
router.put('/:id', auth(), asyncHandler(coursesController.updateCourses))
router.delete('/:id', auth(), asyncHandler(coursesController.deleteCourse))

module.exports = router;
