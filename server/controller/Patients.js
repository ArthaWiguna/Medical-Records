const {
  Patients,
  Users,
  Visitations,
  MedicalRecords,
  sequelize,
} = require("../models");
const { Op, or } = require("sequelize");
const bcrypt = require("bcrypt");
const moment = require("moment");

// registration patient
const createNewPatient = async (req, res) => {
  const {
    name,
    birth_place,
    birth_date,
    gender,
    address,
    identity_number,
    category,
    insurance_number,
    phone,
    allergy,
    blood,
    height,
    weight,
    medical_history,
  } = req.body;

  let generatePassword = "12345678";
  let generateUsername =
    name.replace(/\s+$/, "").split(" ").pop().toLowerCase() +
    moment(birth_date).format("DDMMYYYY");

  try {
    const patient = await Patients.create({
      name: name,
      username: generateUsername,
      birth_place: birth_place,
      birth_date: birth_date,
      gender: gender,
      address: address,
      identity_number: identity_number,
      category: category,
      insurance_number: insurance_number,
      phone: phone,
    });
    console.log(patient, "data dari create");

    await MedicalRecords.create({
      allergy: allergy,
      blood: blood,
      height: height,
      weight: weight,
      medical_history: medical_history,
      id_patient: patient.dataValues.id_patient,
    });

    // username pasien: kombinasi antara kata terakhir pada nama + waktu registrasi
    bcrypt.hash(generatePassword, 10).then((hash) => {
      Users.create({
        name: name,
        username: generateUsername,
        password: hash,
        level: "pasien",
        image: "",
      });
    });

    // // lalu tampilkan username dan password ini ketika succes create sebagai alert success
    res.json({
      message: "Create patient success",
      data: {
        username: generateUsername,
        password: generatePassword,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// // Get All Patient
// const getAllPatients = async (req, res) => {
//   const currentPage = req.query.page || 1;
//   const size = req.query.size || 10;
//   const todayStart = moment().startOf("day").toDate();
//   const now = moment().toDate();

//   let filterStatus = req.query.status
//     ? { status: { [Op.eq]: `${req.query.status}` } }
//     : null;
//   let filterCategory = req.query.category
//     ? { category: { [Op.eq]: `${req.query.category}` } }
//     : null;

//   try {
//     const patients = await Patients.findAndCountAll({
//       include: [
//         {
//           model: Visitations,
//           where: {
//             createdAt: {
//               [Op.gt]: todayStart,
//               [Op.lt]: now,
//             },
//           },
//           required: false, // set to false to use a left join(semua data pasien ditampilkan termasuk yg tidak berkunjung hari ini)
//         },
//       ],
//       limit: parseInt(size),
//       offset: (parseInt(currentPage) - 1) * parseInt(size),
//       order: [["updatedAt", "DESC"]],
//       where: {
//         [Op.and]: [filterStatus, filterCategory],
//         [Op.or]: [
//           { name: { [Op.like]: `%${req.query.params}%` } },
//           { identity_number: { [Op.like]: `%${req.query.params}%` } },
//         ],
//       },
//     });
//     res.json({
//       message: "Get all patients success",
//       data: {
//         patients: patients.rows,
//         totalItems: patients.count,
//         totalPage: Math.ceil(patients.count / size),
//         currentPage: currentPage,
//         size: size,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server Error",
//       serverMessage: error,
//     });
//   }
// };

// Get All Patient
const getAllPatients = async (req, res) => {
  const todayStart = moment().startOf("day").toDate();
  const now = moment().toDate();

  let filterStatus =
    req.query.status !== "All"
      ? { status: { [Op.eq]: `${req.query.status}` } }
      : null;

  try {
    const patients = await Patients.findAll({
      include: [
        {
          model: Visitations,
          where: {
            createdAt: {
              [Op.gt]: todayStart,
              [Op.lt]: now,
            },
          },
          required: false, // set to false to use a left join(semua data pasien ditampilkan termasuk yg tidak berkunjung hari ini)
        },
      ],
      order: [
        ["status", "ASC"],
        ["updatedAt", "DESC"],
      ],
      where: {
        [Op.and]: [filterStatus],
        [Op.or]: [
          { name: { [Op.like]: `%${req.query.params}%` } },
          { identity_number: { [Op.like]: `%${req.query.params}%` } },
        ],
      },
    });
    res.json({
      message: "Get all patients success",
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get Detail Patient
const getDetailPatient = async (req, res) => {
  let filter = req.query.id
    ? { id_patient: { [Op.eq]: req.query.id } }
    : { username: { [Op.eq]: req.query.username } };
  try {
    const patient = await Patients.findOne({
      include: {
        model: MedicalRecords,
      },
      where: {
        [Op.and]: [filter],
      },
    });
    res.json({
      message: "Get detail patient success",
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Update Patient
// Hanya untuk admin, untuk menghindari kecerobohan pasien mengupdate datanya karna berpengaruh ke laporan nantinya
const updatePatient = async (req, res) => {
  const {
    name,
    birth_place,
    birth_date,
    gender,
    address,
    identity_number,
    category,
    insurance_number,
    phone,
    status,
    username,
  } = req.body;
  const { id } = req.params;

  try {
    await Patients.update(
      {
        name: name,
        birth_place: birth_place,
        birth_date: birth_date,
        gender: gender,
        address: address,
        identity_number: identity_number,
        category: category,
        insurance_number: insurance_number,
        phone: phone,
        status: status,
      },
      {
        where: {
          id_patient: {
            [Op.eq]: id,
          },
        },
      }
    );
    await Users.update(
      { name: name, status: status },
      {
        where: {
          username: {
            [Op.eq]: username,
          },
        },
      }
    );
    res.json({
      message: "Update patient success",
      data: {
        name: name,
        birth_place: birth_place,
        birth_date: birth_date,
        gender: gender,
        address: address,
        identity_number: identity_number,
        category: category,
        insurance_number: insurance_number,
        phone: phone,
        status: status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get total patient group by category (for admin home page card)
const getTotalPatientsGroupByCategory = async (req, res) => {
  try {
    const patients = await Patients.findAll({
      attributes: [
        "category",
        [sequelize.fn("COUNT", sequelize.col("id_patient")), "total"],
      ],
      group: ["category"],
      where: {
        status: {
          [Op.eq]: "Active",
        },
      },
    });
    res.json({
      message: "Get total patient group by category success",
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  createNewPatient,
  getAllPatients,
  getDetailPatient,
  updatePatient,
  getTotalPatientsGroupByCategory,
};
