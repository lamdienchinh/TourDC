const postController = require("../controllers/postController");
const middlewareController = require('../controllers/middlewareController');

const router = require("express").Router();

// Change Avatar
router.post("/add", middlewareController.verifyToken, postController.addPost);


// By user
router.get("/", postController.getPosts)


// Reaction 
router.post("/reaction", middlewareController.verifyToken, postController.controlReaction)

// Comment
router.post("/comment", middlewareController.verifyToken, postController.comment)
module.exports = router;