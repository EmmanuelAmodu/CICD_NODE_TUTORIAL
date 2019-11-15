const async = require('../../../middlewares/async')

describe('async', () => {
    it('should return a function', () => {
        const result = async()
        expect(result).toBeInstanceOf(Function)
    })

    it('should return call func', () => {
        const func = jest.fn()
        async(func)()
        expect(func).toHaveBeenCalled()
    })

    it('should call next on error', async () => {
        const func = jest.fn().mockRejectedValue('Error')
        const next = jest.fn()
        await async(func)({}, {}, next)
        expect(next).toHaveBeenCalled()
    })
});
