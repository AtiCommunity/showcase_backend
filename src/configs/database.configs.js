const mongoose = require("mongoose")

const database = async () => {
    mongoose.connect(`mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}`)
        .then(() => console.log(`Database connected on ${process.env.DATABASE_URL}:${process.env.DATABASE_PORT} with ${process.env.DATABASE_USERNAME} credentials.`))
        .catch((error) => {
            console.log(error)
            process.exit()
        })
}

module.exports = database