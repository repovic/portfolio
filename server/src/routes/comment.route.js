const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const rateLimit = require("express-rate-limit");

const commentController = require("../controllers/comment.controller");

router.route("/").get(commentController.getAll);

router.route("/:commentId").get(commentController.getById);

router
    .route("/post/:objectId")
    .get(commentController.getCommentsOfPost)
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
        commentController.createComment
    );

router
    .route("/project/:objectId")
    .get(commentController.getCommentsOfProject)
    .post(auth("Subscriber"), commentController.createComment);

router
    .route("/:commentId/like")
    .post(auth("Subscriber"), commentController.likeComment);
router
    .route("/:commentId/dislike")
    .post(auth("Subscriber"), commentController.dislikeComment);

module.exports = router;
