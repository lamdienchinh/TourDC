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
router.post("/", tripController.getTripsofPlace)

// Reaction
router.post("/reaction", middlewareController.verifyToken, tripController.controlReaction)

// Get Four
router.get("/getfour", tripController.getFourTrips)
module.exports = router;