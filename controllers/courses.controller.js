const validate = require('../middlewares/validate')
// const Fawn = require('fawn')

const CourseModel = require('../models/course.model')

module.exports = {
    async getAllCourses(req, res) {
        const pageNumber = parseInt(req.params.pageNumber || 1);
        const pageSize = parseInt(req.params.pageSize || 50);

        const courses = await CourseModel.find({}).skip((pageNumber - 1) * pageSize).limit(pageSize);
        res.send({ courses, pageNumber })
    },

    async getCourse(req, res) {
        const course = await CourseModel.find({ _id: req.params.id })
        if (course) res.status(404).send('The course with the given id does not exist');
        else res.send(course);

    },

    async createCourse(req, res) {
        const { error } = validate.course(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        const course = await new CourseModel(req.body).save();
        res.send(course)

        // TODO user fawn to achieve atomicity
        // new Fawn.Task()
        //     .save('courses', req.body)
        //     .update('users', { _id: req.body.author }, { isPublished: true })
    },

    async updateCourses(req, res) {
        const { error } = validate.course(req.body)
        if (error) return res.status(400).send(error.details[0].message);
        const course = await CourseModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.send(course)
    },

    async deleteCourse(req, res) {
        const course = await CourseModel.findByIdAndRemove({ _id: req.params.id })
        res.send(course)
    }
}
