const express = require("express");
const visitationController = require("../controller/Visitations");

const router = express.Router();

router.get("/", visitationController.getVisitationReport);

module.exports = router;
