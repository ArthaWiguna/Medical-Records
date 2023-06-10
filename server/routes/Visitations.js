const express = require("express");
const visitationController = require("../controller/Visitations");
const validation = require("../middleware/validationMiddleware");
const visitationSchema = require("../validation/Visitations");
const { route } = require("./Medicines");

const router = express.Router();

router.post(
  "/",
  validation(visitationSchema),
  visitationController.createNewVistation
);

router.get("/", visitationController.getVisitationToday);
router.get("/:id", visitationController.getDetailVisitation);
router.patch("/:id", visitationController.updateVisitation);
router.get(
  "/total/group/category",
  visitationController.getTotalVisitationsGroupByCategory
);
router.get(
  "/yearly/overview",
  visitationController.getVisitationYearlyOverview
);

router.get(
  "/patient/comparasion",
  visitationController.getComparasionVisitation
);
router.get("/today/overview", visitationController.getVisitationTodayOverview);
router.get(
  "/total/patient/:id",
  visitationController.getTotalVisitationForPatient
);
router.get(
  "/yearly/overview/patient/:id",
  visitationController.getVisitationYearlyOverviewForPatient
);

module.exports = router;
