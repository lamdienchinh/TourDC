const voucherController = require("../controllers/voucherController");
const middlewareController = require('../controllers/middlewareController');

const router = require("express").Router();

// Add Voucher To Sale
router.post("/add", voucherController.addVoucherToSale);

// Sale Voucher
router.post("/sale", middlewareController.verifyToken, voucherController.saleVoucher)

// Get All Vouchers Sale
router.get("/", voucherController.getAllVoucherSale)

router.post("/check", voucherController.checkVoucher)

module.exports = router;