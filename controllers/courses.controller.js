const validate = require('../schema')
const CourseModel = require('../models/course.model')

module.exports = {
    async getAllCourses(req, res) {
        const courses = await CourseModel.find({});
        res.send(courses)
    },

    async getCourse(req, res) {
        const course = await CourseModel.find({ _id: req.params.id })
        if (!course) res.status(404).send('The course with the given id does not exist');
        else res.send(course);
    },

    async createCourse(req, res) {
        const { error }  = validate.course(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        const course = await new CourseModel({
            name: req.body.name,
            author: req.body.author,
            tags: req.body.tags
        }).save();

        res.send(course)
    },

    async updateCourses(req, res) {
        const { error } = validate.course(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        const course = await CourseModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.send(course)
    },

    async deleteCourse(req, res) {
        const course = await CourseModel.findByIdAndRemove({ _id: req.params.id })
        res.send(course)
    }
}
