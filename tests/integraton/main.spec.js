const http =  require('http');
const main = require('../../main')
const mongoose = require('mongoose')
const app = require('../../services/express.service')()

describe("App", () => {
    afterEach(async () => {
        try {
            await server.close();
        } catch (err) {}
    })

    it("should return an instance of http.Server", async () => {
        let server = await main(app, mongoose)
        expect(server).toBeInstanceOf(http.Server)
    });

    it("should return an instance of http.Server", async () => {
        mongoose.connect = jest.fn().mockRejectedValue()
        let server = await main(app, mongoose)
        expect(server).toBeInstanceOf(Error)
    });

    it("should return an instance of http.Server", async () => {
        app.listen = jest.fn().mockRejectedValue()
        let server = await main(app, mongoose)
        expect(server).toBeInstanceOf(Error)
    });
});
