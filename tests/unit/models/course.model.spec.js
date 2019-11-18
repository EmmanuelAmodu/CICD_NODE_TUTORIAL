const CourseModel = require('../../../models/course.model') 
const mongoose = require('mongoose')

describe('CourseModel.validate', () => {
    it('should error if isPublished is true but price is not set', () => {
        const course = new CourseModel({
            name: 'Eerf4tf 4tg4gt4g',
            category: 'web',
            author: [ new mongoose.Types.ObjectId() ],
            tags: [ 'email' ],
            isPublished: true
        })
        expect(course.validateSync().name).toBe('ValidationError')
    })

    it('should validate if document is valid', () => {
        const course = new CourseModel({
            name: 'Eerf4tf 4tg4gt4g',
            category: 'web',
            author: [ new mongoose.Types.ObjectId() ],
            tags: [ 'email' ],
            isPublished: true,
            price: 10
        })
        expect(course.validateSync()).toBeUndefined()
    })

    it('should error if tags falsy', () => {
        const course = new CourseModel({
            name: 'Eerf4tf 4tg4gt4g',
            category: 'web',
            author: [ new mongoose.Types.ObjectId() ],
            isPublished: true,
            price: 10
        })
        expect(course.validateSync().name).toBe('ValidationError')
    })

    it('should round price on set', () => {
        const course = new CourseModel({
            name: 'Eerf4tf 4tg4gt4g',
            category: 'web',
            author: [ new mongoose.Types.ObjectId() ],
            tags: [ 'email' ],
            isPublished: true,
            price: 10.094
        })
        expect(course.get('price')).toBe(10)
    })

    it('should round price on get', () => {
        const course = new CourseModel({
            name: 'Eerf4tf 4tg4gt4g',
            category: 'web',
            author: [ new mongoose.Types.ObjectId() ],
            tags: [ 'email' ],
            isPublished: true
        })
        course.set('price', 10.180)
        expect(course.price).toBe(10)
    })
})
