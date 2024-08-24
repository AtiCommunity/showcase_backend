const express = require("express")

router = express.Router()

const authentication = require('../controllers/auth.controllers')
const userController = require("../controllers/user.controllers")

router.use(authentication.authenticate)

router.get("/", userController.getUsers)
router.get("/:id", userController.getUsers)
router.put("/:id", userController.putUsers)
router.delete("/:id", userController.deleteUsers)

module.exports = router