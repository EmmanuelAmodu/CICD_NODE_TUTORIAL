const courses = require('../../../controllers/courses.controller')

describe('courses.getAllCourses', () => {
    it('should return a function', () => {
        const result = courses.getAllCourses()
        expect(result).toBeInstanceOf(Function)
    })
});
