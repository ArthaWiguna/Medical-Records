const {
  Histories,
  MedicineIntakes,
  MedicalRecords,
  Patients,
  Medicines,
  Prescriptions,
  PrescriptionMedicineIntakes,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

// Create History
const createNewHistory = async (req, res) => {
  const {
    complaint,
    tension,
    body_temperature,
    diagnosis,
    treatment,
    description,
    id_medical_record,
    medicineIntake,
    prescription,
  } = req.body;
  // console.log(prescription[0].prescription_start_date);

  // history
  const rowMedicineIntake = [];
  const promiseUpdateMedicine = [];
  // prescription
  const rowPrescriptionMedicineIntake = [];

  try {
    const history = await Histories.create({
      complaint: complaint,
      tension: tension,
      body_temperature: body_temperature,
      diagnosis: diagnosis,
      treatment: treatment,
      description: description,
      id_medical_record: id_medical_record,
    });
    if (medicineIntake) {
      medicineIntake.forEach((i) => {
        rowMedicineIntake.push({
          quantity: i.quantity,
          dose: i.dose,
          id_history: history.dataValues.id_history,
          id_medicine: i.id_medicine,
        });
        promiseUpdateMedicine.push(
          Medicines.update(
            { stock: sequelize.literal("stock -" + i.quantity) },
            { where: { id_medicine: i.id_medicine } }
          )
        );
      });
      await MedicineIntakes.bulkCreate(rowMedicineIntake);
      await Promise.all(promiseUpdateMedicine);
    }
    if (prescription) {
      // console.log(prescription[0].prescription_start_date);
      const prescriptionResult = await Prescriptions.create({
        prescription_start_date: prescription[0].prescription_start_date,
        prescription_end_date: prescription[0].prescription_end_date,
        note: prescription[0].prescription_note,
        id_history: history.dataValues.id_history,
      });
      prescription[0].prescription_medicineIntake.forEach((i) => {
        rowPrescriptionMedicineIntake.push({
          name: i.name,
          quantity: i.quantity,
          dose: i.dose,
          usage: i.usage,
          id_prescription: prescriptionResult.dataValues.id_prescription,
        });
      });
      await PrescriptionMedicineIntakes.bulkCreate(
        rowPrescriptionMedicineIntake
      );
    }
    res.json("Create histories success");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get All Patient History
const getPatientlHistory = async (req, res) => {
  const { id } = req.params;
  const filterTreatmentDate = req.query.date
    ? {
        createdAt: {
          [Op.between]: [
            req.query.date + " 00:00:00",
            req.query.date + " 23:59:00",
          ],
        },
      }
    : null;

  const data = [];
  try {
    const history = await Histories.findAll({
      include: [
        {
          model: MedicalRecords,
          include: {
            model: Patients,
          },
        },
        {
          model: Medicines,
        },
        {
          model: Prescriptions,
        },
      ],
      distinct: true,
      where: {
        [Op.and]: [{ id_medical_record: id }, filterTreatmentDate],
        [Op.or]: [
          { complaint: { [Op.like]: `%${req.query.params}%` } },
          { diagnosis: { [Op.like]: `%${req.query.params}%` } },
        ],
      },
      order: [["updatedAt", "DESC"]],
    });

    history.forEach((element) => {
      data.push({
        ["id_history"]: element.dataValues.id_history,
        ["complaint"]: element.dataValues.complaint,
        ["diagnosis"]: element.dataValues.diagnosis,
        ["treatment"]: element.dataValues.treatment,
        ["medicine"]: element.dataValues.Medicines,
        ["prescription"]: element.dataValues.Prescription,
        ["description"]: element.dataValues.description,
        ["status"]: element.dataValues.status,
        ["createdAt"]: element.dataValues.createdAt,
        ["updatedAt"]: element.dataValues.updatedAt,
      });
    });
    res.json({
      message: "Get history success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// get detail patient history
const getDetailPatientHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const history = await Histories.findByPk(id, {
      include: [
        {
          model: MedicalRecords,
          include: {
            model: Patients,
          },
        },
        {
          model: Medicines,
        },
        {
          model: Prescriptions,
          include: {
            model: PrescriptionMedicineIntakes,
          },
        },
      ],
      distinct: true,
    });

    res.json({
      message: "Get detail patient history success",
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// update History
const updateHistory = async (req, res) => {
  const {
    complaint,
    tension,
    body_temperature,
    diagnosis,
    treatment,
    description,
    medicineIntake,
    prescription,
  } = req.body;
  const { id } = req.params;
  const rowMedicineIntake = [];
  const promiseResetMedicineStock = [];
  const promiseUpdateMedicine = [];
  const rowPrescriptionMedicineIntake = [];
  console.log(req.body, "ini body");

  try {
    // update history
    await Histories.update(
      {
        complaint: complaint,
        tension: tension,
        body_temperature: body_temperature,
        diagnosis: diagnosis,
        treatment: treatment,
        description: description,
      },
      {
        where: {
          id_history: {
            [Op.eq]: id,
          },
        },
      }
    );
    // take data to delete
    const medicineIntakeToDelete = await MedicineIntakes.findAll({
      where: {
        id_history: {
          [Op.eq]: id,
        },
      },
    });

    // reset data
    if (medicineIntakeToDelete.length > 0) {
      // reset the value of medicine stock to the start before this history inserted
      medicineIntakeToDelete.forEach((i) => {
        promiseResetMedicineStock.push(
          Medicines.update(
            { stock: sequelize.literal("stock +" + i.dataValues.quantity) },
            { where: { id_medicine: i.dataValues.id_medicine } }
          )
        );
      });
      await Promise.all(promiseResetMedicineStock);
      await MedicineIntakes.destroy({
        where: {
          id_history: {
            [Op.eq]: id,
          },
        },
      });
    }

    //create-update new data
    if (medicineIntake.length > 0) {
      medicineIntake.forEach((i) => {
        rowMedicineIntake.push({
          quantity: i.quantity,
          dose: i.dose,
          id_history: id,
          id_medicine: i.id_medicine,
        });
        promiseUpdateMedicine.push(
          Medicines.update(
            { stock: sequelize.literal("stock -" + i.quantity) },
            { where: { id_medicine: i.id_medicine } }
          )
        );
      });
    }

    await MedicineIntakes.bulkCreate(rowMedicineIntake);
    await Promise.all(promiseUpdateMedicine);

    // prescription
    if (prescription) {
      // check is this history have a prescription
      const historyPrescription = await Prescriptions.findAll({
        where: {
          id_history: {
            [Op.eq]: id,
          },
        },
      });
      // console.log(
      //   historyPrescription[0].dataValues.id_prescription,
      //   "ini history prescription id"
      // );
      if (historyPrescription.length > 0) {
        await Prescriptions.update(
          {
            prescription_start_date: prescription[0].prescription_start_date,
            prescription_end_date: prescription[0].prescription_end_date,
            note: prescription[0].prescription_note,
          },
          {
            where: {
              id_history: {
                [Op.eq]: id,
              },
            },
          }
        );

        await PrescriptionMedicineIntakes.destroy({
          where: {
            id_prescription: {
              [Op.eq]: historyPrescription[0].dataValues.id_prescription,
            },
          },
        });

        prescription[0].prescription_medicineIntake.forEach((i) => {
          rowPrescriptionMedicineIntake.push({
            name: i.name,
            quantity: i.quantity,
            dose: i.dose,
            usage: i.usage,
            id_prescription: historyPrescription[0].dataValues.id_prescription,
          });
        });
        await PrescriptionMedicineIntakes.bulkCreate(
          rowPrescriptionMedicineIntake
        );
      } else {
        const prescriptionCreated = await Prescriptions.create({
          prescription_start_date: prescription[0].prescription_start_date,
          prescription_end_date: prescription[0].prescription_end_date,
          note: prescription[0].prescription_note,
          id_history: id,
        });
        console.log("ini prescrition created");
        prescription[0].prescription_medicineIntake.forEach((i) => {
          rowPrescriptionMedicineIntake.push({
            name: i.name,
            quantity: i.quantity,
            dose: i.dose,
            usage: i.usage,
            id_prescription: prescriptionCreated.dataValues.id_prescription,
          });
        });
        await PrescriptionMedicineIntakes.bulkCreate(
          rowPrescriptionMedicineIntake
        );
      }
    }

    res.json("Update history success");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get history created yearly overview
const getHistoryYearlyOverview = async (req, res) => {
  let year = req.query.year;
  currentMonth = moment().month();

  let month = [];
  let currentNum = 1;
  let data = [];

  try {
    const overviewHistory = await Histories.findAll({
      attributes: [
        [sequelize.fn("MONTH", sequelize.col("createdAt")), "month"], //ambil nilai bulan dari created at dan tulis sebagai month
        [sequelize.fn("COUNT", sequelize.col("id_history")), "totalHistory"], //hitung total data visitation
      ],
      group: [sequelize.fn("MONTH", sequelize.col("createdAt"))], //group berdasarkan bulan
      order: sequelize.literal("month ASC"),
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.between]: [`${year}-01-01`, `${year}-12-31`],
            },
          },
        ],
      },
    });

    overviewHistory.forEach((element) => {
      month.push(element.dataValues.month);
      data.push({
        ["month"]: element.dataValues.month,
        ["totalHistory"]: element.dataValues.totalHistory,
      });
    });

    for (let i = 0; i < currentMonth + 1; i++) {
      console.log(month[i]);

      while (currentNum <= currentMonth + 1) {
        if (!month.includes(currentNum)) {
          data.push({ ["month"]: currentNum, ["totalHistory"]: 0 });
        }
        currentNum++;
      }
      currentNum++; // increment the current number to fill gaps
    }
    data.sort((a, b) => parseInt(a.month) - parseInt(b.month));
    console.log(data);

    res.json({
      message: "Get all visitation overview success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  createNewHistory,
  getPatientlHistory,
  getDetailPatientHistory,
  updateHistory,
  getHistoryYearlyOverview,
};
