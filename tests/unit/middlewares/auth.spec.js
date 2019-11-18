const jwt = require('jsonwebtoken')
const config = require('../../../config')
const auth = require('../../../middlewares/auth')

describe('auth', () => {
    const res = {
        status: jest.fn().mockReturnValue({
            send: jest.fn().mockReturnValue()
        })
    }

    const user = {
        name: 'sample name',
        email: 'a@b.c',
        isVerified: true,
        role: 'admin'
    }

    it('should return a function', () => {
        const result = auth()
        expect(result).toBeInstanceOf(Function)
    })

    it('should get token', () => {
        const req = { header: jest.fn().mockReturnValue() }
        const next = jest.fn();
        auth()(req, res, next)
        expect(req.header).toHaveBeenCalledWith('x-auth-token')
    })

    it('should send response with status 401 if token is not defined', () => {
        const req = { header: jest.fn().mockReturnValue() }
        const next = jest.fn();
        auth()(req, res, next)
        expect(res.status).toHaveBeenCalledWith(401)
    })

    it('should add decoded user to req object', () => {
        const token = jwt.sign(user, config.appKey)
        const req = { header: jest.fn().mockReturnValue(token) }
        const next = jest.fn();
        auth()(req, res, next)
        expect(req.user).toMatchObject(user)
    })

    it('should call next', () => {    
        const token = jwt.sign(user, config.appKey)
        const req = { header: jest.fn().mockReturnValue(token) }
        const next = jest.fn()
        auth()(req, res, next)
        expect(next).toHaveBeenCalled()
    })

    it('should to fail for role mismatch', () => {    
        user.role = 'user'
        const token = jwt.sign(user, config.appKey)
        const req = { header: jest.fn().mockReturnValue(token) }
        const next = jest.fn()
        auth(['admin'])(req, res, next)
        expect(res.status).toHaveBeenCalledWith(403)
    })

    it('should send response with status 400 if token is invalid', () => {
        const req = { header: jest.fn().mockReturnValue('erfertvqkjdwncqiurhfu2ef2njrenfkqernf') }
        const next = jest.fn()
        auth()(req, res, next)
        expect(res.status).toHaveBeenCalledWith(400)
    })
})
