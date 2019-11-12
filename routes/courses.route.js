const router = require('express').Router();
const coursesController = require('../controllers/courses.controller')

router.get('', coursesController.getAllCourses)
router.get('/:id', coursesController.getCourse)
router.post('', coursesController.createCourse)
router.put('/:id', coursesController.updateCourses)
router.delete('/:id', coursesController.deleteCourse)

module.exports = router;
