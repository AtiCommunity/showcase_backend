const express = require("express")

router = express.Router()

const authController = require("../controllers/auth.controllers")

router.post("/register", authController.register)
router.post("/login", authController.login)

router.get("/users", authController.getUsers)
router.get("/users/:id", authController.getUsers)
router.put("/users/:id", authController.putUsers)
router.delete("/users/:id", authController.deleteUsers)

module.exports = router