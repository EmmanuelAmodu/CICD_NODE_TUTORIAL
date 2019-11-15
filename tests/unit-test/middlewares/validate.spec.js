const validate = require('../../../middlewares/validate')
const Joi = require('joi')

describe('validate.course', () => {
    it('should return error if name is not defined', () => {
        const { error } = validate.course({  })
        expect(error.name).toBe('ValidationError')
    })

    it('should return error if name has less than 3 character', () => {
        const { error } = validate.course({ name: 'we' })
        expect(error.name).toBe('ValidationError')
    })

    it('should return validate correct input', () => {
        const { error } = validate.course({ name: 'wefvrtf' })
        expect(error).toBeNull()
    })
})

describe('validate.user', () => {
    it('should return error if name is not defined', () => {
        const { error } = validate.user({  })
        expect(error.name).toBe('ValidationError')
    })

    it('should return error if name has less than 3 character', () => {
        const { error } = validate.user({ name: 'we', email: 'ab@cd.ef', password: 'A_1akjwdnjnee' })
        expect(error.name).toBe('ValidationError')
    })

    it('should return error if password does not match pattern', () => {
        const { error } = validate.user({ name: 'weerf4rf', email: 'ab@cd.ef', password: 'njnee' })
        expect(error.name).toBe('ValidationError')
    })

    it('should return error if email does not match pattern', () => {
        const { error } = validate.user({ name: 'weerf4rf', email: 'abcd', password: 'A_1akjwdnjnee' })
        expect(error.name).toBe('ValidationError')
    })

    it('should return error if inout is longer 255 chars', () => {
        const { error } = validate.user({ name: 'w'.repeat(300), email: 'ab@cd.ef', password: 'A_1akjwdnjnee' })
        expect(error.name).toBe('ValidationError')
    })

    it('should valiadet for correct input', () => {
        const { error } = validate.user({ name: 'weerf4rf', email: 'ab@cd.ef', password: 'A_1akjwdnjnee' })
        expect(error).toBeNull()
    })
})

describe('validate.userAuth', () => {
    it('should return error if email is not defined', () => {
        const { error } = validate.userAuth({ password: 'A_1akjwdnjnee' })
        expect(error.name).toBe('ValidationError')
    })

    it('should return error if password is not defined', () => {
        const { error } = validate.userAuth({ email: 'ab@cd.ef' })
        expect(error.name).toBe('ValidationError')
    })

    it('should return error if email does not match pattern', () => {
        const { error } = validate.userAuth({ email: 'abcd', password: 'A_1akjwdnjnee' })
        expect(error.name).toBe('ValidationError')
    })

    it('should return error if password does not match pattern', () => {
        const { error } = validate.userAuth({ email: 'ab@cd.ef', password: 'Aakjwdnjnee' })
        expect(error.name).toBe('ValidationError')
    })

    it('should return error if password does not match pattern', () => {
        const { error } = validate.userAuth({ email: 'ab@cd.ef', password: 'A_1akjwdnjnee' })
        expect(error).toBeNull()
    })
})
