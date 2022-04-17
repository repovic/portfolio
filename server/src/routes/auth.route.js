const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const rateLimit = require("express-rate-limit");

const authController = require("../controllers/auth.controller");

router.route("/register/").post(
    rateLimit({
        windowMs: 60 * 60 * 1000,
        max: 15,
        message: {
            success: false,
            error: {
                message:
                    "Too many requests sent from this IP, please try again after an hour!",
            },
        },
    }),
    authController.register
);

router.route("/login/").post(
    rateLimit({
        windowMs: 60 * 60 * 1000,
        max: 100,
        message: {
            success: false,
            error: {
                message:
                    "Too many requests sent from this IP, please try again after an hour!",
            },
        },
    }),
    authController.login
);

router
    .route("/check-token/")
    .post(auth("Subscriber"), authController.checkToken);

module.exports = router;
