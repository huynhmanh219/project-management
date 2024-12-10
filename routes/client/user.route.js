const express = require('express')
const router = express.Router();
const controller = require("../../controller/client/user.controller");
const userValidate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.get('/register',controller.register);
router.post('/register',userValidate.registerPost,controller.registerPost);
router.get('/login',controller.login);
router.post('/login',userValidate.loginPost,controller.loginPost);
router.get("/logout",controller.logout);
router.get("/password/forgot",controller.forgot);
router.post("/password/forgot",controller.forgotPost);
router.get("/password/otp",controller.otp);
router.post("/password/otp",controller.otpPost);
router.get("/password/reset",controller.resetPassword);
router.post("/password/reset",
    userValidate.forgotPasswordPost,
    controller.resetPasswordPost);

router.get("/info",authMiddleware.requireAuth,controller.info)
module.exports = router
