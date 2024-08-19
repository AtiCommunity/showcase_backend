const express = require("express")

router = express.Router()

const authController = require("../controllers/auth.controllers")

router.post("/authenticate", authController.authenticate)
router.post("/login", authController.login)
router.post("/register", authController.register)

module.exports = router