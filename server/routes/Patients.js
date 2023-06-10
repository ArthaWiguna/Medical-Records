const express = require("express");
const patientController = require("../controller/Patients");
const validation = require("../middleware/validationMiddleware");
const patientSchema = require("../validation/Patients");

const router = express.Router();

router.post("/", validation(patientSchema), patientController.createNewPatient);
router.get("/", patientController.getAllPatients);
router.get("/detail", patientController.getDetailPatient);
router.patch("/:id", patientController.updatePatient);
router.get(
  "/total/group/category",
  patientController.getTotalPatientsGroupByCategory
);

module.exports = router;
