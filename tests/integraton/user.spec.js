const request = require("supertest");
const jwt = require('jsonwebtoken')
const config = require('../../config')
const UserModel = require("../../models/user.model");
let server;

describe("/api/user", () => {
    beforeEach(async () => {
        const app = require("../../app");
        server = await app;
    });

    afterEach(async () => {
        await server.close()
        await UserModel.remove({})
    });

    describe("POST /register", () => {
        it("status should be 400 for invalid input", async () => {
            const res = await request(server).post("/api/user/register").send({});
            expect(res.status).toBe(400);
        });

        it("status should be 400 for invalid input", async () => {
            await request(server).post("/api/user/register").send({
                name: 'Emmanuel Amodu',
                email: 'e@a.o',
                password: 'A1@lskdnklwner'
            });

            const res = await request(server).post("/api/user/register").send({
                name: 'Emmanuel Amodu',
                email: 'e@a.o',
                password: 'A1@lskdnklwner'
            });
            expect(res.status).toBe(400);
        });

        it("status should be 200 for valid", async () => {
            const res = await request(server).post("/api/user/register").send({
                name: 'Emmanuel Amodu',
                email: 'e@a.o',
                password: 'A1@lskdnklwner'
            });
            expect(res.status).toBe(200);
        });
    });

    describe("POST /login", () => {
        it("status should be 400 for invalid input", async () => {
            const res = await request(server).post("/api/user/login").send({});
            expect(res.status).toBe(400);
        });

        it("status should be 400 if username deos not exist", async () => {
            const res = await request(server).post("/api/user/login").send({
                email: 'e@a.o',
                password: 'A1@lskdnklwner'
            });
            expect(res.status).toBe(400);
        });

        it("status should be 400 if password is wrong", async () => {
            const user = { email: 'e@a.o', password: 'A1@lskdnklwner' };
            await request(server).post("/api/user/register").send(Object.assign({
                name: 'Emmanuel Amodu'
            }, user));

            user.password = 'A1@lskdnklwneq'
            const res = await request(server).post("/api/user/login").send(user)
            expect(res.status).toBe(400)
        });

        it("status should be 200 for valid input", async () => {
            const user = { email: 'e@a.o', password: 'A1@lskdnklwner' };
            await request(server).post("/api/user/register").send(Object.assign({
                name: 'Emmanuel Amodu'
            }, user));
            const res = await request(server).post("/api/user/login").send(user)
            delete user.password
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject(user)
        });
    });

    describe("GET /me", () => {
        it("status should be 200 for valid token", async () => {
            const user = {
                name: 'Emmanuel Amodu',
                email: 'e@a.o',
                password: 'A1@lskdnklwner'
            }

            const { body } = await request(server).post("/api/user/register").send(user);
            body.role = 'user';
            const token = jwt.sign(body, config.appKey)
            const res = await request(server).get("/api/user/me").set('x-auth-token', token)

            delete user.password
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject(user)
        });
    })
});
