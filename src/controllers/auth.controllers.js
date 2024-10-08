const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.models')

exports.authenticate = async (req, res, next) => {
    try {
        const header = req.headers["authorization"]
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized Header. Access Denied" })
        }
        const token = header.substring(7)
        if (!token) {
            return res.status(401).json({ error: "Unauthorized Token. Access Denied" })
        }
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error != null) {
                return res.status(401).json({ error: error.message })
            }
            req.headers.id = decoded._id;
            next();
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        if (req.body == 0) {
            return res.status(400).json({ error: `No request body` })
        }
        const user = await User.findOne({ email: req.body.email })
        if (user == null || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        return res.status(200).json({
            token: jwt.sign({ id: user._id }, process.env.JWT_KEY)
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
}

exports.register = async (req, res) => {
    try {
        if (req.body == 0) {
            return res.status(400).json({ error: `No request body` })
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