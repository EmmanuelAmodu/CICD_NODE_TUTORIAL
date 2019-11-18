const http =  require('http');
const app = require('../../app')

describe("App", () => {
    it("should return an instance of http.Server", async () => {
        let server = await app
        expect(server).toBeInstanceOf(http.Server)
        await server.close();
    });
});
