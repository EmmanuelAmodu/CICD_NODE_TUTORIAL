const request = require("supertest");
const EventModel = require("../../models/event.model");
const mongoose = require('mongoose')
const app = require('../../services/express.service')()

const jwt = require('jsonwebtoken')
const config = require('../../config')
let server, seed;

describe("/api/events", () => {
    beforeEach(async () => {
        const main = require("../../main")
        seed = require('./seed')
        server = await main(app, mongoose)
    });

    afterEach(async () => {
        await server.close()
        await EventModel.remove({})
    });

    describe("GET /", () => {
        it("should return events", async () => {
            await EventModel.insertMany(seed.events);
            const res = await request(server).get("/api/events");
            expect(res.status).toBe(200);
            expect(res.body.events.length).toBe(seed.events.length);
        });
    });

    describe("GET /:id", () => {
        it("should return event if valid id is passed", async () => {
            await EventModel.create(seed.events[0]);
            const res = await request(server).get(`/api/events/${seed.events[0]._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(seed.events[0]);
        });

        it("should return 404 if id is invalid", async () => {
            const res = await request(server).get(`/api/events/${seed.events[0]._id}`);
            expect(res.status).toBe(404);
        });
    });

    describe("POST /", () => {
        const token = jwt.sign({
            sample: "user",
            role: 'admin'
        }, config.appKey)
    
        it("should return 400 for invalid input", async () => {
            const newEvent = Object.assign({}, seed.events[1].name);
            delete newEvent.name
            const res = await request(server).post("/api/events").set('x-auth-token', token).send(newEvent);
            expect(res.status).toBe(400);
        });

        it("should create event", async () => {
            const res = await request(server).post("/api/events").set('x-auth-token', token).send(seed.events[1]);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(seed.events[1]);
        });
    });

    describe("DELETE /:id", () => {
        const token = jwt.sign({
            sample: "user",
            role: 'admin'
        }, config.appKey)

        it("should return events", async () => {
            await EventModel.create(seed.events[1]);
            const res = await request(server).delete(`/api/events/${seed.events[1]._id}`).set('x-auth-token', token)
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(seed.events[1]);
        });
    });

    describe("PUT /:id", () => {
        const token = jwt.sign({
            sample: "user",
            role: 'admin'
        }, config.appKey)

        it("should update events", async () => {
            await EventModel.create(seed.events[1]);
            const res = await request(server).put(`/api/events/${seed.events[1]._id}`).set('x-auth-token', token).send(seed.events[1])
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(seed.events[1]);
        });
    });
});
