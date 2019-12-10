const EventModel = require('../../../models/event.model') 
const mongoose = require('mongoose')

describe('EventModel.validate', () => {
    it('should error if isPublished is true but price is not set', () => {
        const event = new EventModel({
            name: 'Eerf4tf 4tg4gt4g',
            category: 'web',
            author: [ new mongoose.Types.ObjectId() ],
            tags: [ 'email' ],
            isPublished: true
        })
        expect(event.validateSync().name).toBe('ValidationError')
    })

    it('should validate if document is valid', () => {
        const event = new EventModel({
            name: 'Eerf4tf 4tg4gt4g',
            category: 'web',
            author: [ new mongoose.Types.ObjectId() ],
            tags: [ 'email' ],
            isPublished: true,
            price: 10
        })
        expect(event.validateSync()).toBeUndefined()
    })

    it('should error if tags falsy', () => {
        const event = new EventModel({
            name: 'Eerf4tf 4tg4gt4g',
            category: 'web',
            author: [ new mongoose.Types.ObjectId() ],
            isPublished: true,
            price: 10
        })
        expect(event.validateSync().name).toBe('ValidationError')
    })

    it('should round price on set', () => {
        const event = new EventModel({
            name: 'Eerf4tf 4tg4gt4g',
            category: 'web',
            author: [ new mongoose.Types.ObjectId() ],
            tags: [ 'email' ],
            isPublished: true,
            price: 10.094
        })
        expect(event.get('price')).toBe(10)
    })

    it('should round price on get', () => {
        const event = new EventModel({
            name: 'Eerf4tf 4tg4gt4g',
            category: 'web',
            author: [ new mongoose.Types.ObjectId() ],
            tags: [ 'email' ],
            isPublished: true
        })
        event.set('price', 10.180)
        expect(event.price).toBe(10)
    })
})
