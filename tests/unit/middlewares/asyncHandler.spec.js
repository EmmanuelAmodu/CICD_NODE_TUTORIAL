const asyncHandler = require('../../../middlewares/asyncHandler')

describe('asyncHandler', () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnValue()
    }

    it('should sent response with status 400 if error contains property errors', async () => {
        const func = jest.fn().mockResolvedValue()
        await asyncHandler(func)({}, res, jest.fn())
        expect(func).toHaveBeenCalled()
    })

    it('should sent response with status 500 if error contains property errors', async () => {
        const func = jest.fn().mockRejectedValue({})
        await asyncHandler(func)({}, res, jest.fn())
        expect(res.status).toHaveBeenCalledWith(500)
    })

    it('should sent response with status 400 if error contains property errors', async () => {
        const func = jest.fn().mockRejectedValue({ errors: {
            name: { message: 'not defined' }
        } })
        await asyncHandler(func)({}, res, jest.fn())
        expect(res.status).toHaveBeenCalledWith(400)
    })
})
