const userController = require("../controllers/userController");

const router = require("express").Router();

// ADD User
router.post("/",userController.addUser);

// Get all users
router.get("/", userController.getAllUsers);
module.exports = router;