const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.models')

exports.authenticate = async (req, res) => {
    res.send("OK")
}

exports.register = async (req, res) => {
    try {
        if (req.body == 0) {
            return res.status(400).json({ error: `no request body` })
        }
        const newUser = new User({
            firstname: req.body.firstname ? req.body.firstname : "",
            lastname: req.body.lastname ? req.body.lastname : "",
            email: req.body.email ? req.body.email : "",
            password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : "",
        })
        await newUser.save()
        return res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        if (req.body == 0) {
            return res.status(400).json({ error: `no request body` })
        }
        const user = await User.findOne({ email: req.body.email })
        if (user == null || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({ error: "invalid credentials" })
        }
        return res.status(200).json({ token: jwt.sign({ type: user._id, exp: Math.floor(Date.now() / 1000) + 86400 }, process.env.JWT_KEY) })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
}
