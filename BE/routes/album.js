const albumController = require("../controllers/albumController");

const router = require("express").Router();

// ADD an album
router.post("/",albumController.addAlbum);

module.exports = router;