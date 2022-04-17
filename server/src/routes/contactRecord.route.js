const router = require("express").Router();

const contactRecordController = require("../controllers/contactRecord.controller");

router.route("/").post(contactRecordController.createContactRecord);

module.exports = router;
