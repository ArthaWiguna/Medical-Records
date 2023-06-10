const express = require("express");
const medicineController = require("../controller/Medicines");
const validation = require("../middleware/validationMiddleware");
const medicineSchema = require("../validation/Medicines");

const router = express.Router();

router.post(
  "/",
  validation(medicineSchema),
  medicineController.createNewMedicine
);

router.get("/", medicineController.getAllMedicines);

router.get("/:id", medicineController.getDetailMedicine);

router.patch("/:id", medicineController.updateMedicine);

router.get("/histories/:id", medicineController.getAllMedicineHistories);

router.get("/given/overview", medicineController.getMostGivenMedicine);
router.get(
  "/received/overview/:id",
  medicineController.getMostReceivedMedicine
);
router.get("/low/stock", medicineController.getLowStockMedicine);

module.exports = router;
