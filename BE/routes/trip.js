const tripController = require("../controllers/tripController");
const middlewareController = require('../controllers/middlewareController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = require("express").Router();

// Change Avatar
router.post("/upload", middlewareController.verifyToken, upload.array('images', 10), tripController.upload);

// Get Trip

// By user
router.get("/", middlewareController.verifyToken, tripController.getTrips)
// By placeid
router.post("/", middlewareController.verifyToken, tripController.getTripsofPlace)

module.exports = router;