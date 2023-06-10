const express = require("express");
const historyController = require("../controller/Histories");
const validation = require("../middleware/validationMiddleware");
const historySchema = require("../validation/Histories");

const router = express.Router();

router.post("/", validation(historySchema), historyController.createNewHistory);
router.patch("/:id", historyController.updateHistory);
router.get("/:id", historyController.getPatientlHistory);
router.get("/detail/:id", historyController.getDetailPatientHistory);
router.get("/yearly/overview", historyController.getHistoryYearlyOverview);

module.exports = router;
