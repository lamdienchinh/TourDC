const placeController = require("../controllers/placeController");

const router = require("express").Router();

// ADD User
router.post("/", placeController.addPlace);
router.get("/getallplaces", placeController.getAllPlaces);
router.post("/get", placeController.getPlace);
router.post("/update", placeController.updatePlace);
router.delete("/delete", placeController.deletePlace);
router.delete("/deletetrip", placeController.deleteTrip)

//get four places
router.get("/getfour", placeController.getFourPlaces)
// Get all users
module.exports = router;