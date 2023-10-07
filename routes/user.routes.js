const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.post("/api/register", UserController.register);
router.post("/api/login", UserController.login);
router.get("/api/logout", UserController.logout);
router.post("/api/activate", UserController.activate);
router.post("/api/verify-otp", UserController.verifyOtp);

module.exports = router;
