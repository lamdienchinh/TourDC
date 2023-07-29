const userController = require("../controllers/userController");
const middlewareController = require('../controllers/middlewareController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = require("express").Router();

// ADD User
router.post("/", userController.addUser);

// Get all users
router.get("/", userController.getAllUsers);

// Login with metamask
router.post("/loginByMetamask", userController.loginByMetamask);

// Login with email and password
router.post("/login", userController.login);

// Logout 

router.post("/logout", middlewareController.verifyToken, userController.logout);

// Change Infor
router.post("/changeinfor", middlewareController.verifyToken, userController.changeInfor);

// Change Avatar
router.post("/changeavatar", middlewareController.verifyToken, upload.single('avatar'), userController.changeAvatar);

// RefreshToken
router.post("/refresh", userController.requestRefreshToken)

// Get Vouchers

router.get("/getvouchers", middlewareController.verifyToken, userController.getVouchers)

// Get TrustRate

router.post("/gettrustrate", userController.getTrustRate)
module.exports = router;