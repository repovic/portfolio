const router = require("express").Router();

const projectController = require("../controllers/project.controller");

router.route("/").get(projectController.getAll);

router.route("/:slug").get(projectController.getBySlug);

module.exports = router;
