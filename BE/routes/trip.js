const tripController = require("../controllers/tripController");
const middlewareController = require('../controllers/middlewareController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = require("express").Router();

// Change Avatar
router.post("/upload", middlewareController.verifyToken, upload.array('images', 10), tripController.upload);

module.exports = router;