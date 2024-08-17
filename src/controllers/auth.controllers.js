const User = require('../models/user.models')

exports.register = async (req, res) => {
    var newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        await newUser.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json(errors);
        }
        return res.status(500).json({ message: "Something went wrong!" });
    }
    return res.status(200).json(newUser)
}

exports.login = (req, res) => {
    res.send("OK")
}