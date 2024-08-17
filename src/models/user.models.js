const mongoose = require("mongoose")
const { Schema } = mongoose

const userModel = new Schema({
    firstname: {
        required: [true, "required field"],
        type: String,
    },
    lastname: {
        required: [true, "required field"],
        type: String,
    },
    email: {
        lowercase: true,
        required: [true, "required field"],
        trim: true,
        type: String,
        unique: true,
    },
    password: {
        required: [true, "required field"],
        type: String,
    },
})

module.exports = mongoose.model("User", userModel)