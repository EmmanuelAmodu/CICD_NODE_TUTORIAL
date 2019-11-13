const router = require('express').Router();
const coursesController = require('../controllers/courses.controller')
const auth = require('../middlewares/auth')

router.get('', coursesController.getAllCourses)
router.get('/:id', coursesController.getCourse)
router.post('', auth(), coursesController.createCourse)
router.put('/:id', auth(), coursesController.updateCourses)
router.delete('/:id', auth(), coursesController.deleteCourse)

module.exports = router;
