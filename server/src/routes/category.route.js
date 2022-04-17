const router = require("express").Router();

const categoryController = require("../controllers/category.controller");

router.route("/").get(categoryController.getAll);

router.route("/:categoryId").get(categoryController.getById);

module.exports = router;
