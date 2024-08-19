const bcrypt = require('bcrypt')

const User = require('../models/user.models')

exports.register = async (req, res) => {
    try {
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        })
        await newUser.save()
        return res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message });
    }
}

exports.login = (req, res) => {
    res.send("OK")
}

exports.getUsers = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(200).json(await User.find())
        }
        const getUser = await User.findOne({ _id: req.params.id })
        if (getUser == null) {
            return res.status(404).json({ error: `user ${req.params.id} not found` })
        }
        return res.status(200).json(getUser)
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}

exports.putUsers = async (req, res) => {
    try {
        var getUser = await User.findOne({ _id: req.params.id })
        if (getUser == null) {
            return res.status(404).json({ error: `user ${req.params.id} not found` })
        }
        if (req.body == 0) {
            return res.status(400).json({ error: `no request body` })
        }
        if (req.body.password != null) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        await User.updateOne(getUser, req.body)
        getUser = await User.findOne({ _id: req.params.id })
        return res.status(200).json(getUser)
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}

exports.deleteUsers = async (req, res) => {
    try {
        const getUser = await User.findOne({ _id: req.params.id })
        if (getUser == null) {
            return res.status(404).json({ error: `user ${req.params.id} not found` })
        }
        await User.deleteOne(getUser)
        return res.status(200).json(getUser)
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}