const config = require('../../../config')

describe('config.dbUrl', () => {
    it('should return prod url', () => {
        expect(config.dbUrl('prod')).toContain('learningApp')
    })

    it('should return dev url', () => {
        expect(config.dbUrl('dev')).toContain('learningApp_dev')
    })

    it('should return dev url', () => {
        expect(config.dbUrl(false)).toContain('learningApp_test')
    })

    it('should return dev url', () => {
        expect(config.dbUrl('staging')).toContain('learningApp_staging')
    })
})