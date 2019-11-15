const UserModel = require('../../../models/user.model') 
const jwt = require('jsonwebtoken')
const config = require('../../../config')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

describe('user.generateAuthToken', () => {
    it('should generate valid JWT', () => {
        const user = {
            name: 'sample name',
            email: 'a@b.c',
            isVerified: true,
            role: 'admin'
        }
        const payload = new UserModel(user)

        const token = payload.generateAuthToken()
        const decoded = jwt.verify(token, config.appKey)
        expect(decoded).toMatchObject(user)
    })
})

describe('UserModel.getRoles', () => {
    it('should return roles', () => {
        expect(UserModel.getRoles().length).toBeGreaterThan(0)
    })
})

describe('UserModel._generateHash', () => {
    const next = jest.fn()
    const user = { password: 'haba' }
    const _generateHash = UserModel._generateHash.bind(user)

    it('should generate hash', async () => {
        await  _generateHash(next)
        expect(next).toBeCalled()
    })

    it('should match hash', () => {
        const isMatched = bcrypt.compareSync('haba', user.password)
        expect(isMatched).toBe(true)
    })
})
