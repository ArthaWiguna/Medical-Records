const {
  Medicines,
  Histories,
  MedicineIntakes,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

// Create Medicine
const createNewMedicine = async (req, res) => {
  const {
    name,
    unit,
    general_indication,
    composition,
    age_category,
    usage,
    contra_indication,
    side_effect,
    classMedicine,
    expired,
    stock,
    description,
  } = req.body;
  const image = req.file.path;
  try {
    await Medicines.create({
      name: name,
      unit: unit,
      general_indication: general_indication,
      composition: composition,
      age_category: age_category,
      usage: usage,
      contra_indication: contra_indication,
      side_effect: side_effect,
      class: classMedicine,
      expired: expired,
      stock: stock,
      description: description,
      image: image,
    });
    res.json("Create medicine success");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get All Medicines
const getAllMedicines = async (req, res) => {
  let filterSearch = req.query.params
    ? { name: { [Op.like]: `%${req.query.params}%` } }
    : null;

  let filterStatus =
    req.query.status !== "All"
      ? { status: { [Op.eq]: `${req.query.status}` } }
      : null;

  try {
    const medicines = await Medicines.findAll({
      where: {
        [Op.and]: [filterSearch, filterStatus],
      },
      order: [
        ["status", "ASC"],
        ["updatedAt", "DESC"],
      ],
    });
    res.json({
      message: "Get all medicines success",
      data: medicines,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get All Medicines history patient dan mengembalikan stock ke sebelum di update
const getAllMedicineHistories = async (req, res) => {
  const { id } = req.params;
  const data = [];
  try {
    const medicines = await Medicines.findAll({
      include: {
        model: Histories,
        through: {
          where: { id_history: id },
        },
      },
      order: [["updatedAt", "DESC"]],
    });
    medicines.forEach((element) => {
      if (
        element.dataValues.status === "Available" ||
        element.dataValues.Histories[0]
      ) {
        data.push({
          ["id_medicine"]: element.dataValues.id_medicine,
          ["name"]: element.dataValues.name,
          ["unit"]: element.dataValues.unit,
          ["stock"]:
            element.dataValues.Histories[0] &&
            element.dataValues.Histories[0].dataValues.MedicineIntakes
              ? element.dataValues.stock +
                element.dataValues.Histories[0].dataValues.MedicineIntakes
                  .dataValues.quantity
              : element.dataValues.stock,
        });
      }
    });
    res.json({
      message: "Get all medicines histories success",
      data: {
        medicines: data,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get Detail Medicine
const getDetailMedicine = async (req, res) => {
  const { id } = req.params;
  try {
    const medicine = await Medicines.findByPk(id);
    res.json({
      message: "Get detail medicine success",
      data: medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Update Medicines
const updateMedicine = async (req, res) => {
  const {
    name,
    unit,
    general_indication,
    composition,
    age_category,
    usage,
    contra_indication,
    side_effect,
    classMedicine,
    expired,
    stock,
    description,
    status,
  } = req.body;
  const image = req.file ? req.file.path : "";
  const { id } = req.params;

  try {
    if (image) {
      await Medicines.update(
        {
          name: name,
          unit: unit,
          general_indication: general_indication,
          composition: composition,
          age_category: age_category,
          usage: usage,
          contra_indication: contra_indication,
          side_effect: side_effect,
          class: classMedicine,
          expired: expired,
          stock: stock,
          description: description,
          image: image,
          status: status,
        },
        {
          where: {
            id_medicine: {
              [Op.eq]: id,
            },
          },
        }
      );
      res.json({
        message: "Update medicine success",
      });
    } else {
      await Medicines.update(
        {
          name: name,
          unit: unit,
          general_indication: general_indication,
          composition: composition,
          age_category: age_category,
          usage: usage,
          contra_indication: contra_indication,
          side_effect: side_effect,
          class: classMedicine,
          expired: expired,
          stock: stock,
          description: description,
          status: status,
        },
        {
          where: {
            id_medicine: {
              [Op.eq]: id,
            },
          },
        }
      );
      res.json({
        message: "Update medicine success",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get most given medicine by doctor overview
const getMostGivenMedicine = async (req, res) => {
  const { year } = req.query;
  try {
    const medicines = await MedicineIntakes.findAll({
      include: Medicines,
      attributes: [
        [
          sequelize.fn(
            "COUNT",
            sequelize.col("MedicineIntakes.id_medicine_intake")
          ),
          "num_intakes",
        ],
      ],
      group: ["Medicine.id_medicine"],
      order: [
        [
          sequelize.fn(
            "COUNT",
            sequelize.col("MedicineIntakes.id_medicine_intake")
          ),
          "DESC",
        ],
      ],
      limit: 3,
      where: {
        createdAt: {
          [Op.between]: [`${year}-01-01`, `${year}-12-31`],
        },
      },
    });
    res.json({
      message: "Get medicines given overview success",
      data: medicines,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get most received medicine by patient overview
const getMostReceivedMedicine = async (req, res) => {
  const { id } = req.params;
  const { year } = req.query;
  try {
    const medicines = await MedicineIntakes.findAll({
      include: Medicines,
      include: {
        model: Histories,
        where: {
          id_medical_record: {
            [Op.eq]: id,
          },
        },
      },
      where: {
        createdAt: {
          [Op.between]: [`${year}-01-01`, `${year}-12-31`],
        },
      },
    });

    // Count the frequency of each medicine
    const medicineCount = [];
    medicines.forEach((i) => {
      const medicineId = i.id_medicine;
      medicineCount[medicineId] = (medicineCount[medicineId] || 0) + 1;
    });

    // Get the top 3 most received medicines
    const mostReceivedMedicines = Object.keys(medicineCount)
      .sort((a, b) => medicineCount[b] - medicineCount[a])
      .slice(0, 3);

    // Get the details of the most received medicines
    let data = [];
    const topMedicines = await Medicines.findAll({
      where: {
        id_medicine: {
          [Op.in]: mostReceivedMedicines,
        },
      },
    });
    topMedicines.forEach((medicine) =>
      data.push({
        ["name"]: medicine.name,
        ["num_intakes"]: medicineCount[medicine.id_medicine],
      })
    );

    res.json({
      message: "Get medicines received overview success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// get the low stock of medicine
const getLowStockMedicine = async (req, res) => {
  const { size } = req.query;
  try {
    const medicine = await Medicines.findAndCountAll({
      where: {
        stock: {
          [Op.between]: [1, 9],
        },
      },
      order: [["stock", "ASC"]],
      limit: size,
    });
    res.json({
      message: "Get low stock medicine success",
      data: medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  createNewMedicine,
  getAllMedicines,
  getDetailMedicine,
  updateMedicine,
  getAllMedicineHistories,
  getMostGivenMedicine,
  getMostReceivedMedicine,
  getLowStockMedicine,
};
