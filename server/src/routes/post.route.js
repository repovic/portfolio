const router = require("express").Router();

const postController = require("../controllers/post.controller");

router.route("/").get(postController.getAll);

router.route("/:slug").get(postController.getBySlug);

module.exports = router;
