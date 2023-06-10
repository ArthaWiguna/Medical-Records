const express = require("express");
const referenceController = require("../controller/References");
const validation = require("../middleware/validationMiddleware");
const referenceSchema = require("../validation/References");

const router = express.Router();

router.post(
  "/",
  validation(referenceSchema),
  referenceController.createNewReference
);

router.get("/", referenceController.getAllReference);

router.get("/:id", referenceController.getDetailReference);

router.patch(
  "/:id",
  validation(referenceSchema),
  referenceController.updateReference
);

module.exports = router;
