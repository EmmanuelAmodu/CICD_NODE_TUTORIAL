const request = require("supertest");
const CourseModel = require("../../models/course.model");

const jwt = require('jsonwebtoken')
const config = require('../../config')
let server, seed;

describe("/api/courses", () => {
    beforeEach(async () => {
        const app = require("../../app");
        seed = require('./seed')
        server = await app;
    });

    afterEach(async () => {
        server.close()
        await CourseModel.remove({})
    });

    describe("GET /", () => {
        it("should return courses", async () => {

            await CourseModel.insertMany(seed.courses);
            const res = await request(server).get("/api/courses");
            expect(res.status).toBe(200);
            expect(res.body.courses.length).toBe(seed.courses.length);
        });
    });

    describe("GET /:id", () => {
        it("should return course if valid id is passed", async () => {

            await CourseModel.create(seed.courses[0]);
            const res = await request(server).get(`/api/courses/${seed.courses[0]._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(seed.courses[0]);
        });

        it("should return 404 if id is invalid", async () => {
            const res = await request(server).get(`/api/courses/${seed.courses[0]._id}`);
            expect(res.status).toBe(404);
        });
    });

    describe("POST /", () => {
        it("should return courses", async () => {
            // await CourseModel.create(seed.courses[1]);
            const token = jwt.sign({
                sample: "user",
                role: 'admin'
            }, config.appKey)
            const res = await request(server).post("/api/courses").set('x-auth-token', token).send(seed.courses[1]);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(seed.courses[1]);
        });

        it("should return courses", async () => {
            // await CourseModel.create(seed.courses[1]);
            const token = jwt.sign({
                sample: "user",
                role: 'admin'
            }, config.appKey)
            const res = await request(server).post("/api/courses").set('x-auth-token', token).send(seed.courses[1]);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(seed.courses[1]);
        });
    });
});
