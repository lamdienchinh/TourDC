const albumController = require("../controllers/albumController");
const middlewareController = require('../controllers/middlewareController');
const router = require("express").Router();

// ADD an album
router.post("/", middlewareController.verifyToken, albumController.addAlbum);

// Get Albums
router.get("/", middlewareController.verifyToken, albumController.getAlbums);
module.exports = router;