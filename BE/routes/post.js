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

// Get MyPost 
router.get("/mypost", middlewareController.verifyToken, postController.getMyPosts)

// Delete 
router.post("/delete", middlewareController.verifyToken, postController.delete)

// Edit
router.post("/edit", middlewareController.verifyToken, postController.modify)
module.exports = router;