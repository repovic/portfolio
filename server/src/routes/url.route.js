const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const rateLimit = require("express-rate-limit");

const urlController = require("../controllers/url.controller");

router
    .route("/")
    .get(urlController.getAll)
    .post(
        rateLimit({
            windowMs: 60 * 60 * 1000,
            max: 20,
            message: {
                success: false,
                error: {
                    message:
                        "Too many requests sent from this IP, please try again after an hour!",
                },
            },
        }),
        auth("Subscriber"),
        urlController.create
    );

router.route("/:slug").get(urlController.getBySlug);

router.route("/:urlId/redirect").get(urlController.increaseNumberOfRedirects);

module.exports = router;
