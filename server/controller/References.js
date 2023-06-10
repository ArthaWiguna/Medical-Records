const { References, Visitations, Patients } = require("../models");
const { Op } = require("sequelize");

// Create Reference
const createNewReference = async (req, res) => {
  const { reference_place, poly, reference_date, description, id_visitation } =
    req.body;

  try {
    await References.create({
      reference_place: reference_place,
      poly: poly,
      reference_date: reference_date,
      description: description,
      id_visitation: id_visitation,
    });
    res.json("Create reference success");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get Detail Reference
const getDetailReference = async (req, res) => {
  const { id } = req.params;
  try {
    const reference = await References.findByPk(id, {
      include: [
        {
          model: Visitations,
          include: {
            model: Patients,
          },
        },
      ],
    });
    res.json({
      message: "Get detail reference success",
      data: reference,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get All Reference
const getAllReference = async (req, res) => {
  const currentPage = req.query.page || 1;
  const size = req.query.size || 10;
  let title = req.query.title
    ? { name: { [Op.like]: `%${req.query.title}%` } }
    : null;
  let category = req.query.category
    ? { category: { [Op.eq]: `${req.query.category}` } }
    : null;
  try {
    const references = await References.findAndCountAll({
      include: [
        {
          model: Visitations,
          required: true,
          include: {
            model: Patients,
            required: true, //inner join -> berarti data yang benar benar sesui dengan include ini saja yg ditampilkan
            where: {
              [Op.and]: [title, category],
            },
          },
        },
      ],
      limit: parseInt(size),
      offset: (parseInt(currentPage) - 1) * parseInt(size),
      order: [["updatedAt", "DESC"]],
      where: {
        [Op.and]: [{ status: "Active" }],
      },
    });
    res.json({
      message: "Get all references success",
      data: {
        references: references.rows,
        totalItems: references.count,
        totalPage: Math.ceil(references.count / size),
        currentPage: currentPage,
        size: size,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Update References
const updateReference = async (req, res) => {
  const referenceData = req.body;
  const { id } = req.params;

  try {
    await References.update(referenceData, {
      where: {
        id_reference: {
          [Op.eq]: id,
        },
      },
    });
    res.json({
      message: "Update reference success",
      data: {
        referenceData,
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
  createNewReference,
  getAllReference,
  getDetailReference,
  updateReference,
};
