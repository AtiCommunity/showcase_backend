const express = require("express")

router = express.Router()

const authController = require("../controllers/auth.controller")

router.get("/register", authController.register)
router.get("/login", authController.login)

module.exports = router