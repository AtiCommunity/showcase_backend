require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(process.env.APP_PORT, process.env.APP_URL, () =>
    console.log(`API server started on ${process.env.APP_URL}:${process.env.APP_PORT}`)
);