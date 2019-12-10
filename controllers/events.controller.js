const validate = require('../middlewares/validate')
// const Fawn = require('fawn')

const EventModel = require('../models/event.model')

module.exports = {
    async getAllEvents(req, res) {
        const pageNumber = parseInt(req.params.pageNumber || 1);
        const pageSize = parseInt(req.params.pageSize || 50);

        const events = await EventModel.find({}).skip((pageNumber - 1) * pageSize).limit(pageSize);
        res.send({ events, pageNumber })
    },

    async getEvent(req, res) {
        const event = await EventModel.findOne({ _id: req.params.id })
        if (!event) res.status(404).send('The event with the given id does not exist');
        else res.send(event);
    },

    async createEvent(req, res) {
        const { error } = validate.event(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        const event = await new EventModel(req.body).save();
        res.send(event)

        // TODO user fawn to achieve atomicity
        // new Fawn.Task()
        //     .save('events', req.body)
        //     .update('users', { _id: req.body.author }, { isPublished: true })
    },

    async updateEvents(req, res) {
        const event = await EventModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.send(event)
    },

    async deleteEvent(req, res) {
        const event = await EventModel.findByIdAndRemove({ _id: req.params.id })
        res.send(event)
    }
}
