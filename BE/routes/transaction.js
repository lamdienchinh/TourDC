const transactionController = require("../controllers/transactionController")
const router = require("express").Router();

// check-in 
router.post("/autocheckin", transactionController.autoCheckIn)

module.exports = router;