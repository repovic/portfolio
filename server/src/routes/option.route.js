const router = require("express").Router();

const optionController = require("../controllers/option.controller");

router.route("/").get(optionController.getAll);

router.route("/:name").get(optionController.getByName);

module.exports = router;
