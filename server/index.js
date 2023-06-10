const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const db = require("./models");
const usersRouter = require("./routes/Users");
const patientsRouter = require("./routes/Patients");
const visitationRouter = require("./routes/Visitations");
const referenceRouter = require("./routes/References");
const medicalRecordRouter = require("./routes/MedicalRecords");
const medicineRouter = require("./routes/Medicines");
const historyRouter = require("./routes/Histories");
const reportRouter = require("./routes/Reports");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// config multer for image upload
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(express.json());
// alow access image from server
app.use("/images", express.static(path.join(__dirname, "images")));
// multer for handle input multipart/form-data
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// Users Router
app.use("/users", usersRouter);
// Patients Router
app.use("/patients", patientsRouter);
// Visitation
app.use("/visitations", visitationRouter);
// References
app.use("/references", referenceRouter);
// Medical Record
app.use("/medical-records", medicalRecordRouter);
// Medicine
app.use("/medicines", medicineRouter);
//History
app.use("/histories", historyRouter);
// Report
app.use("/reports", reportRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on PORT: ${process.env.PORT}`);
  });
});
