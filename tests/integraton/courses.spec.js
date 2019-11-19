const request = require("supertest");
const CourseModel = require("../../models/course.model");
const mongoose = require('mongoose')
const app = require('../../services/express.service')()

const jwt = require('jsonwebtoken')
const config = require('../../config')
let server, seed;

describe("/api/courses", () => {
    beforeEach(async () => {
        const main = require("../../main")
        seed = require('./seed')
        server = await main(app, mongoose)
    });

    afterEach(async () => {
        await server.close()
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
        const token = jwt.sign({
            sample: "user",
            role: 'admin'
        }, config.appKey)
    
        it("should return 400 for invalid input", async () => {
            const newCourse = Object.assign({}, seed.courses[1].name);
            delete newCourse.name
            const res = await request(server).post("/api/courses").set('x-auth-token', token).send(newCourse);
            expect(res.status).toBe(400);
        });

        it("should create course", async () => {
            const res = await request(server).post("/api/courses").set('x-auth-token', token).send(seed.courses[1]);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(seed.courses[1]);
        });
    });

    describe("DELETE /:id", () => {
        const token = jwt.sign({
            sample: "user",
            role: 'admin'
        }, config.appKey)

        it("should return courses", async () => {
            await CourseModel.create(seed.courses[1]);
            const res = await request(server).delete(`/api/courses/${seed.courses[1]._id}`).set('x-auth-token', token)
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(seed.courses[1]);
        });
    });

    describe("PUT /:id", () => {
        const token = jwt.sign({
            sample: "user",
            role: 'admin'
        }, config.appKey)

        it("should update courses", async () => {
            await CourseModel.create(seed.courses[1]);
            const res = await request(server).put(`/api/courses/${seed.courses[1]._id}`).set('x-auth-token', token).send(seed.courses[1])
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(seed.courses[1]);
        });
    });
});
