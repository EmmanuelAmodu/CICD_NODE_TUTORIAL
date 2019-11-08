const express = require('express')
const validate = require('./schema/index')
const config = require('./config/index')

const app = express()
app.use(express.json())

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given id does not exist');
    else res.send(course);
})

app.post('/api/courses', (req, res) => {
    const { error }  = validate.course(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (course) {
        const { error } = validate.course(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        course.name = req.body.name
        res.send(course)
    } else {
        res.status(404).send('The course with the given id does not exist');
    }
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (course) {
        const index = courses.indexOf(course)
        courses.splice(index, 1);
        res.send(course)
    } else {
        res.status(404).send('The course with the given id does not exist');
    }
})

const port = config.port
app.listen(port, () => console.log(`Listen on port ${port}`))
