const express = require("express")

router = express.Router()

const userController = require("../controllers/user.controllers")

router.get("/", userController.getUsers)
router.get("/:id", userController.getUsers)
router.put("/:id", userController.putUsers)
router.delete("/:id", userController.deleteUsers)

module.exports = router