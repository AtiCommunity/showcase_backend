require("dotenv").config()
const express = require("express")

const app = express();

const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authentication = require("./src/routes/auth.routes")

app.use("/auth", authentication)

app.listen(process.env.APP_PORT, process.env.APP_URL, () =>
    console.log(`API server started on ${process.env.APP_URL}:${process.env.APP_PORT}`)
);