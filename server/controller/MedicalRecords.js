const { MedicalRecords, Patients } = require("../models");
const { Op } = require("sequelize");

// Create Medial Record
const createNewMedicalRecord = async (req, res) => {
  const { allergy, blood, height, weight, medical_history, id_patient } =
    req.body;

  try {
    await MedicalRecords.create({
      allergy: allergy,
      blood: blood,
      height: height,
      weight: weight,
      medical_history: medical_history,
      id_patient: id_patient,
    });
    res.json("Create medical record success");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get All Medical Record
const getAllMedicalRecords = async (req, res) => {
  let filterSearch = req.query.params
    ? { name: { [Op.like]: `%${req.query.params}%` } }
    : null;
  const data = [];
  try {
    const medicalRecords = await MedicalRecords.findAll({
      include: {
        model: Patients,
        where: {
          [Op.and]: [filterSearch],
        },
        required: true, //inner join -> berarti data yang benar benar sesui dengan include ini saja yg ditampilkan
      },
      order: [["updatedAt", "DESC"]],
    });
    medicalRecords.forEach((element) => {
      data.push({
        ["id_medical_record"]: element.dataValues.id_medical_record,
        ["name"]: element.dataValues.Patient.name,
        ["id_patient"]: element.dataValues.Patient.id_patient,
        ["allergy"]: element.dataValues.allergy,
        ["medical_history"]: element.dataValues.medical_history,
        ["height"]: element.dataValues.height,
        ["weight"]: element.dataValues.weight,
        ["blood"]: element.dataValues.blood,
        ["status"]: element.dataValues.status,
        ["createdAt"]: element.dataValues.createdAt,
        ["updatedAt"]: element.dataValues.updatedAt,
      });
    });
    res.json({
      message: "Get medical records success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get Detail Medical Record
const getDetailMedicalRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalRecord = await MedicalRecords.findByPk(id, {
      include: {
        model: Patients,
      },
    });
    res.json({
      message: "Get detail medical record success",
      data: medicalRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Update  Medical Record
const updateMedicalRecord = async (req, res) => {
  const medicalRecordData = req.body;
  const { id } = req.params;

  try {
    await MedicalRecords.update(medicalRecordData, {
      where: {
        id_medical_record: {
          [Op.eq]: id,
        },
      },
    });
    res.json({
      message: "Update medical record success",
      data: {
        medicalRecordData,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  createNewMedicalRecord,
  getAllMedicalRecords,
  getDetailMedicalRecord,
  updateMedicalRecord,
};
