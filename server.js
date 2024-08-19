require("dotenv").config({ path: "./env-development.env" })
const cors = require("cors")
const express = require("express")

const app = express();

const database = require("./src/configs/database.configs");

const authentication = require("./src/routes/auth.routes");
const user = require("./src/routes/user.routes");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

database()

app.use("/auth", authentication)
app.use("/users", user)

app.listen(process.env.APP_PORT, process.env.APP_URL, () =>
    console.log(`API server started on ${process.env.APP_URL}:${process.env.APP_PORT}`)
);