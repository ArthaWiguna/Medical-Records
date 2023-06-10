const express = require("express");
const medicalRecordController = require("../controller/MedicalRecords");
const validation = require("../middleware/validationMiddleware");
const medicalRecordSchema = require("../validation/MedicalRecords");

const router = express.Router();

router.post(
  "/",
  validation(medicalRecordSchema),
  medicalRecordController.createNewMedicalRecord
);

router.get("/", medicalRecordController.getAllMedicalRecords);
router.get("/:id", medicalRecordController.getDetailMedicalRecord);
router.patch("/:id", medicalRecordController.updateMedicalRecord);

module.exports = router;
