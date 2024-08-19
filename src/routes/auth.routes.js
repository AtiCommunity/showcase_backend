const express = require("express")

router = express.Router()

const authController = require("../controllers/auth.controllers")

router.post("/", authController.authenticate)
router.post("/register", authController.register)
router.post("/login", authController.login)

module.exports = router