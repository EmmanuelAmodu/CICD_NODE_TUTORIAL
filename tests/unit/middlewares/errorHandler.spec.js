const errorHandler = require('../../../middlewares/errorHandler')

describe('errorHandler', () => {
    const error = {
        errors: {
            name: {
                message: 'Name not defined'
            }
        },
    }

    const res = {
        status: jest.fn().mockReturnValue({
            send: jest.fn().mockReturnValue()
        })
    }

    it('should sent response with status 400 if error contains property errors', () => {
        errorHandler(error, {}, res)
        expect(res.status).toHaveBeenCalledWith(400)
    })

    it('should sent response with status 500 if error contains property errors', () => {
        errorHandler({}, {}, res)
        expect(res.status).toHaveBeenCalledWith(500)
    })
})
