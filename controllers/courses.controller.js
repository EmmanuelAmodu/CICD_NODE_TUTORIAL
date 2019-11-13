const validate = require('../schema')
const CourseModel = require('../models/course.model')

module.exports = {
    async getAllCourses(req, res) {
        const pageNumber = parseInt(req.params.pageNumber || 1);
        const pageSize = parseInt(req.params.pageSize || 50);

        try {
            const courses = await CourseModel.find({}).skip((pageNumber - 1) * pageSize).limit(pageSize);
            res.send({ courses, pageNumber })
        } catch (error) {
            res.status(400).send(error)
            console.log(error)
        }
    },

    async getCourse(req, res) {
        try {
            const course = await CourseModel.find({ _id: req.params.id })
            if (course) res.status(404).send('The course with the given id does not exist');
            else res.send(course);
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    },

    async createCourse(req, res) {
        const { error }  = validate.course(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        try {
            const course = await new CourseModel(req.body).save();
            res.send(course)
        } catch (error) {
            let message = 'Errors: '
            for (const field in error.errors) {
                message += `\n ${error.errors[field].message}`;
            }
            res.status(400).send({ message })
            console.log(error)
        }
    },

    async updateCourses(req, res) {
        const { error } = validate.course(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        try {
            const course = await CourseModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
            res.send(course)
        } catch (error) {
            let message = 'Errors: '
            for (const field in error.errors) {
                message += `\n ${error.errors[field].message}`;
            }
            res.status(400).send({ message })
            console.log(error)
        }
    },

    async deleteCourse(req, res) {
        const course = await CourseModel.findByIdAndRemove({ _id: req.params.id })
        res.send(course)
    }
}
