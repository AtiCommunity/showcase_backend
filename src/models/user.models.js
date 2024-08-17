const mongoose = require("mongoose")
const validator = require("validator");
const { Schema } = mongoose

const userModel = new Schema({
    firstname: {
        required: [true, "required field"],
        set: value => value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
        type: String,
    },
    lastname: {
        required: [true, "required field"],
        type: String,
        uppercase: true,
    },
    email: {
        lowercase: true,
        required: [true, "required field"],
        trim: true,
        type: String,
        unique: true,
        validate: [validator.isEmail, "enter a valid email"],
    },
    password: {
        required: [true, "required field"],
        type: String,
    },
})

module.exports = mongoose.model("User", userModel)