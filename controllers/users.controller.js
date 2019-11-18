const _ = require('lodash')
const bcrypt = require('bcrypt')

const validate = require('../middlewares/validate')
const UserModel = require('../models/user.model')

module.exports = {
    async createUser(req, res) {
        const { error }  = validate.user(req.body)
        if (error) return res.status(400).send(error);

        let user = await UserModel.findOne({ email: req.body.email })
        if (user) return res.status(400).send('User already Exist');

        user = new UserModel(_.pick(req.body, ['name', 'email', 'password']))
        await user.save()

        const token = user.generateAuthToken()
        const result = _.pick(user, ['_id', 'name', 'email', 'isVerified'])
        result.token = token
        res.header('x-auth-token', result.token).send(result)
    },

    async me(req, res) {
        const user = await UserModel.findById({ _id: req.user._id }).select('-password')
        res.send(user)
    },

    async auth(req, res) {
        const { error }  = validate.userAuth(req.body)
        if (error) return res.status(400).send(error);

        let user = await UserModel.findOne({ email: req.body.email})
        if (!user) return res.status(400).send('Invalid username or password');
        user.token = user.generateAuthToken()

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid username or password');

        user = _.pick(user, ['_id', 'name', 'email', 'isVerified'])
        res.send(user)
    }
}
