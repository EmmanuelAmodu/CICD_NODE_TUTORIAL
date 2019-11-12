const validate = require('../schema')

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

module.exports = {
    getAllCourses(req, res) {
        res.send(courses)
    },

    getCourse(req, res) {
        const course = courses.find(c => c.id === parseInt(req.params.id))
        if (!course) res.status(404).send('The course with the given id does not exist');
        else res.send(course);
    },

    createCourse(req, res) {
        const { error }  = validate.course(req.body)
        if (error) return res.status(400).send(error.details[0].message);
        const course = {
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course)
        res.send(course)
    },

    updateCourses(req, res) {
        const course = courses.find(c => c.id === parseInt(req.params.id))
    
        if (course) {
            const { error } = validate.course(req.body)
            if (error) return res.status(400).send(error.details[0].message);
    
            course.name = req.body.name
            res.send(course)
        } else {
            res.status(404).send('The course with the given id does not exist');
        }
    },

    deleteCourse(req, res) {
        const course = courses.find(c => c.id === parseInt(req.params.id))
    
        if (course) {
            const index = courses.indexOf(course)
            courses.splice(index, 1);
            res.send(course)
        } else {
            res.status(404).send('The course with the given id does not exist');
        }
    }
}
