const { Visitations, Patients, References, sequelize } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

// Create New Vistation
const createNewVistation = async (req, res) => {
  const { description, id_patient } = req.body;
  const todayStart = moment().startOf("day").toDate();
  const now = moment().toDate();

  try {
    // ambil data kunjungan berdasarkan tanggal hari ini
    // hitung jumlah dan queue = jumlah +1
    const visitationToday = await Visitations.findAndCountAll({
      where: {
        createdAt: {
          [Op.gt]: todayStart,
          [Op.lt]: now,
        },
      },
    });
    await Visitations.create({
      queue: visitationToday.count + 1,
      description: description,
      id_patient: id_patient,
    });

    res.json("Create visitation success");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get  Visitation Today
const getVisitationToday = async (req, res) => {
  const todayStart = moment().startOf("day").toDate();
  const now = moment().toDate();
  const data = [];
  let filterSearch = req.query.params
    ? { name: { [Op.like]: `%${req.query.params}%` } }
    : null;
  try {
    const visitations = await Visitations.findAll({
      include: {
        model: Patients,
        where: {
          [Op.and]: [filterSearch],
        },
      },
      where: {
        createdAt: {
          [Op.gt]: todayStart,
          [Op.lt]: now,
        },
      },
      //basic sorting
      order: [["queue", "ASC"]],

      // sorting from diperiksa, menunggu, lewat selesai
      // order: [
      //   [
      //     sequelize.literal(
      //       "CASE WHEN Visitations.status = 'Selesai' THEN 1 ELSE 0 END"
      //     ),
      //     "ASC",
      //   ],
      //   [
      //     sequelize.literal(
      //       "FIELD(Visitations.status, 'Diperiksa', 'Menunggu', 'Lewat')"
      //     ),
      //     "ASC",
      //   ],
      // ],

      // sorting from selesai on bottom
      // order: [
      //   [
      //     sequelize.literal(
      //       "CASE WHEN Visitations.status = 'Selesai' THEN 1 ELSE 0 END"
      //     ),
      //     "ASC",
      //   ],
      //   ["queue", "ASC"],
      // ],
    });
    visitations.forEach((element) => {
      data.push({
        ["id_visitation"]: element.dataValues.id_visitation,
        ["queue"]: element.dataValues.queue,
        ["name"]: element.dataValues.Patient.name,
        ["id_patient"]: element.dataValues.Patient.id_patient,
        ["category"]: element.dataValues.Patient.category,
        ["address"]: element.dataValues.Patient.address,
        ["description"]: element.dataValues.description,
        ["status"]: element.dataValues.status,
        ["createdAt"]: element.dataValues.createdAt,
        ["updatedAt"]: element.dataValues.updatedAt,
      });
    });
    res.json({
      message: "Get visitations today success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get All Visitation
const getVisitationReport = async (req, res) => {
  //inititate filter
  const range =
    req.query.start && req.query.end
      ? {
          createdAt: {
            [Op.between]: [
              req.query.start + " 00:00:00",
              req.query.end + " 23:59:00",
            ],
          },
        }
      : null;

  let category =
    req.query.category && req.query.category !== "All"
      ? { category: { [Op.eq]: `${req.query.category}` } }
      : null;

  try {
    const visitations = await Visitations.findAll({
      include: [
        {
          model: Patients,
          where: category,
        },
        {
          model: References,
        },
      ],

      order: [["createdAt", "ASC"]],
      where: {
        [Op.and]: [range, { status: "Selesai" }],
      },
    });
    res.json({
      message: "Get visitation report success",
      data: visitations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get Detail Visitation
const getDetailVisitation = async (req, res) => {
  const { id } = req.params;
  try {
    const visitation = await Visitations.findByPk(id, { include: Patients });
    res.json({
      message: "Get detail visitation success",
      data: visitation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Update visitation
const updateVisitation = async (req, res) => {
  const visitationData = req.body;
  const { id } = req.params;

  try {
    await Visitations.update(visitationData, {
      where: {
        id_visitation: {
          [Op.eq]: id,
        },
      },
    });
    res.json({
      message: "Update visitation success",
      data: {
        visitationData,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get total visitation group by category patient (for admin home page card)
const getTotalVisitationsGroupByCategory = async (req, res) => {
  try {
    const visitation = await Visitations.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("id_visitation")), "total"],
        [sequelize.col("Patient.category"), "category"],
      ],
      include: [
        {
          model: Patients,
          attributes: [],
        },
      ],
      group: ["Patient.category"],
      where: {
        status: {
          [Op.eq]: "Selesai",
        },
      },
    });
    res.json({
      message: "Get total visitation group by category success",
      data: visitation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// // Get all visitation yearly overview (for admin home page chart)
// const getVisitationYearlyOverview = async (req, res) => {
//   let year = req.query.year;
//   currentMonth = moment().month();

//   let month = [];
//   let currentNum = 1;
//   let data = [];

//   try {
//     const overviewVisitation = await Visitations.findAll({
//       attributes: [
//         [sequelize.fn("MONTH", sequelize.col("createdAt")), "month"], //ambil nilai bulan dari created at dan tulis sebagai month
//         [
//           sequelize.fn("COUNT", sequelize.col("id_visitation")),
//           "totalVisitation",
//         ], //hitung total data visitation
//       ],
//       group: [sequelize.fn("MONTH", sequelize.col("createdAt"))], //group berdasarkan bulan
//       order: sequelize.literal("month ASC"),
//       where: {
//         [Op.and]: [
//           {
//             createdAt: {
//               [Op.between]: [`${year}-01-01`, `${year}-12-31`],
//             },
//           },
//           { status: "Selesai" },
//         ],
//       },
//     });

//     // Menyesuaikan jumlah data yang dikirim agar sesuai dengan jumlah bulan saat ini
//     // Dan memberikan niali 0 jika diantara bulan awal hingga bulam saat ini ada kosong

//     // loop data overview yg sudah di group
//     overviewVisitation.forEach((element) => {
//       month.push(element.dataValues.month); //tampung nilai month untuk perbandingan
//       //tampung data overview per month yang ada beseta totalnya
//       data.push({
//         ["month"]: element.dataValues.month,
//         ["totalVisitation"]: element.dataValues.totalVisitation,
//       });
//     });

//     //lakukan loop sebanyak bulan saat ini
//     for (let i = 0; i < currentMonth + 1; i++) {
//       // jika nilai patoakn awal current num masih dibawah niali current month maka terus lakukan loop
//       while (currentNum <= currentMonth + 1) {
//         // jika data visitation di bulan itu ada jangan push, jika tidak ada maka push dengan niali total 0
//         if (!month.includes(currentNum)) {
//           data.push({ ["month"]: currentNum, ["totalVisitation"]: 0 });
//         }
//         currentNum++;
//       }
//       currentNum++;
//     }
//     data.sort((a, b) => parseInt(a.month) - parseInt(b.month)); //urutkan sesuai urutan bulan
//     // console.log(data);

//     res.json({
//       message: "Get all visitation overview success",
//       data: data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server Error",
//       serverMessage: error,
//     });
//   }
// };

// Get all visitation yearly overview (for admin home page chart)
const getVisitationYearlyOverview = async (req, res) => {
  let year = req.query.year;
  currentMonth = moment().month();

  try {
    // Umum
    const overviewVisitationForGeneral = await Visitations.findAll({
      include: {
        model: Patients,
        attributes: [],
        where: { category: "Umum" },
      },
      attributes: [
        [
          sequelize.fn("MONTH", sequelize.col("Visitations.createdAt")),
          "month",
        ], //ambil nilai bulan dari created at dan tulis sebagai month
        [
          sequelize.fn("COUNT", sequelize.col("Visitations.id_visitation")),
          "totalVisitation",
        ], //hitung total data visitation
      ],
      group: [sequelize.fn("MONTH", sequelize.col("Visitations.createdAt"))], //group berdasarkan bulan
      order: sequelize.literal("month ASC"),
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.between]: [`${year}-01-01`, `${year}-12-31`],
            },
          },
          { status: "Selesai" },
        ],
      },
    });

    // Menyesuaikan jumlah data yang dikirim agar sesuai dengan jumlah bulan saat ini
    // Dan memberikan niali 0 jika diantara bulan awal hingga bulam saat ini ada kosong

    // loop data overview yg sudah di group
    let monthForGeneralPatient = [];
    let currentNumForGeneralPatient = 1;
    let dataForGeneralPatient = [];
    overviewVisitationForGeneral.forEach((element) => {
      monthForGeneralPatient.push(element.dataValues.month); //tampung nilai month untuk perbandingan
      //tampung data overview per month yang ada beseta totalnya
      dataForGeneralPatient.push({
        ["month"]: element.dataValues.month,
        ["totalVisitation"]: element.dataValues.totalVisitation,
      });
    });

    //lakukan loop sebanyak bulan saat ini
    for (let i = 0; i < currentMonth + 1; i++) {
      // jika nilai patoakn awal current num masih dibawah niali current month maka terus lakukan loop
      while (currentNumForGeneralPatient <= currentMonth + 1) {
        // jika data visitation di bulan itu ada jangan push, jika tidak ada maka push dengan niali total 0
        if (!monthForGeneralPatient.includes(currentNumForGeneralPatient)) {
          dataForGeneralPatient.push({
            ["month"]: currentNumForGeneralPatient,
            ["totalVisitation"]: 0,
          });
        }
        currentNumForGeneralPatient++;
      }
      currentNumForGeneralPatient++;
    }
    dataForGeneralPatient.sort((a, b) => parseInt(a.month) - parseInt(b.month)); //urutkan sesuai urutan bulan

    // BPJS
    const overviewVisitationForBPJS = await Visitations.findAll({
      include: {
        model: Patients,
        attributes: [],
        where: { category: "BPJS" },
      },
      attributes: [
        [
          sequelize.fn("MONTH", sequelize.col("Visitations.createdAt")),
          "month",
        ], //ambil nilai bulan dari created at dan tulis sebagai month
        [
          sequelize.fn("COUNT", sequelize.col("Visitations.id_visitation")),
          "totalVisitation",
        ], //hitung total data visitation
      ],
      group: [sequelize.fn("MONTH", sequelize.col("Visitations.createdAt"))], //group berdasarkan bulan
      order: sequelize.literal("month ASC"),
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.between]: [`${year}-01-01`, `${year}-12-31`],
            },
          },
          { status: "Selesai" },
        ],
      },
    });

    // Menyesuaikan jumlah data yang dikirim agar sesuai dengan jumlah bulan saat ini
    // Dan memberikan niali 0 jika diantara bulan awal hingga bulam saat ini ada kosong

    // loop data overview yg sudah di group
    let monthForBPJSPatient = [];
    let currentNumForBPJSPatient = 1;
    let dataForBPJSPatient = [];
    overviewVisitationForBPJS.forEach((element) => {
      monthForBPJSPatient.push(element.dataValues.month); //tampung nilai month untuk perbandingan
      //tampung data overview per month yang ada beseta totalnya
      dataForBPJSPatient.push({
        ["month"]: element.dataValues.month,
        ["totalVisitation"]: element.dataValues.totalVisitation,
      });
    });

    //lakukan loop sebanyak bulan saat ini
    for (let i = 0; i < currentMonth + 1; i++) {
      // jika nilai patoakn awal current num masih dibawah niali current month maka terus lakukan loop
      while (currentNumForBPJSPatient <= currentMonth + 1) {
        // jika data visitation di bulan itu ada jangan push, jika tidak ada maka push dengan niali total 0
        if (!monthForBPJSPatient.includes(currentNumForBPJSPatient)) {
          dataForBPJSPatient.push({
            ["month"]: currentNumForBPJSPatient,
            ["totalVisitation"]: 0,
          });
        }
        currentNumForBPJSPatient++;
      }
      currentNumForBPJSPatient++;
    }
    dataForBPJSPatient.sort((a, b) => parseInt(a.month) - parseInt(b.month)); //urutkan sesuai urutan bulan

    res.json({
      message: "Get all visitation overview success",
      data: {
        general: dataForGeneralPatient,
        bpjs: dataForBPJSPatient,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get comparasion old new visitation (for admin home page chart)
const getComparasionVisitation = async (req, res) => {
  const { year } = req.query;
  try {
    const oldPatientVisitation = await Visitations.findAndCountAll({
      include: {
        model: Patients,
        where: {
          createdAt: {
            [Op.lt]: `${year}-01-01`,
          },
        },
      },
      where: {
        [Op.and]: {
          createdAt: {
            [Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
          status: {
            [Op.eq]: "Selesai",
          },
        },
      },
    });

    const newPatientVisitation = await Visitations.findAndCountAll({
      include: {
        model: Patients,
        where: {
          createdAt: {
            [Op.gte]: `${year}-01-01`,
          },
        },
      },
      where: {
        [Op.and]: {
          createdAt: {
            [Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
          status: {
            [Op.eq]: "Selesai",
          },
        },
      },
    });
    res.json({
      message: "Get visitation comparasion success",
      data: {
        oldPatientVisitation: oldPatientVisitation.count,
        newPatientVisitation: newPatientVisitation.count,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get  Visitation Today Overview (for doctor home page card)
const getVisitationTodayOverview = async (req, res) => {
  const todayStart = moment().startOf("day").toDate();
  const now = moment().toDate();

  let waiting = 0;
  let onTreatment = 0;
  let finish = 0;

  try {
    const visitations = await Visitations.findAll({
      include: Patients,
      where: {
        createdAt: {
          [Op.gt]: todayStart,
          [Op.lt]: now,
        },
      },
      order: [["queue", "ASC"]],
    });
    visitations.forEach((element) => {
      if (element.dataValues.status === "Menunggu") {
        waiting += 1;
      } else if (element.dataValues.status === "Diperiksa") {
        onTreatment += 1;
      } else if (element.dataValues.status === "Selesai") {
        finish += 1;
      }
    });
    res.json({
      message: "Get visitations today overview success",
      data: {
        waiting: waiting,
        onTreatment: onTreatment,
        finish: finish,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// get total visitaiton for patient
const getTotalVisitationForPatient = async (req, res) => {
  const { id } = req.params;
  try {
    const visitations = await Visitations.findAndCountAll({
      where: {
        [Op.and]: [{ id_patient: id }, { status: "Selesai" }],
      },
    });

    res.json({
      message: "Get total visitation for patient success",
      data: visitations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Get all visitation yearly overview of the patient
const getVisitationYearlyOverviewForPatient = async (req, res) => {
  const { id } = req.params;
  let year = req.query.year;
  currentMonth = moment().month();

  let month = [];
  let currentNum = 1;
  let data = [];

  try {
    const overviewVisitation = await Visitations.findAll({
      attributes: [
        [sequelize.fn("MONTH", sequelize.col("createdAt")), "month"], //ambil nilai bulan dari created at dan tulis sebagai month
        [
          sequelize.fn("COUNT", sequelize.col("id_visitation")),
          "totalVisitation",
        ], //hitung total data visitation
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
          {
            id_patient: id,
          },
          { status: "Selesai" },
        ],
      },
    });

    // Menyesuaikan jumlah data yang dikirim agar sesuai dengan jumlah bulan saat ini
    // Dan memberikan niali 0 jika diantara bulan awal hingga bulam saat ini ada kosong

    // loop data overview yg sudah di group
    overviewVisitation.forEach((element) => {
      month.push(element.dataValues.month); //tampung nilai month untuk perbandingan
      //tampung data overview per month yang ada beseta totalnya
      data.push({
        ["month"]: element.dataValues.month,
        ["totalVisitation"]: element.dataValues.totalVisitation,
      });
    });

    //lakukan loop sebanyak bulan saat ini
    for (let i = 0; i < currentMonth + 1; i++) {
      // jika nilai patoakn awal current num masih dibawah niali current month maka terus lakukan loop
      while (currentNum <= currentMonth + 1) {
        // jika data visitation di bulan itu ada jangan push, jika tidak ada maka push dengan niali total 0
        if (!month.includes(currentNum)) {
          data.push({ ["month"]: currentNum, ["totalVisitation"]: 0 });
        }
        currentNum++;
      }
      currentNum++;
    }
    data.sort((a, b) => parseInt(a.month) - parseInt(b.month)); //urutkan sesuai urutan bulan
    // console.log(data);

    res.json({
      message: "Get all visitation overview for patient success",
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
  createNewVistation,
  getVisitationToday,
  getVisitationReport,
  getDetailVisitation,
  updateVisitation,
  getTotalVisitationsGroupByCategory,
  getVisitationYearlyOverview,
  getComparasionVisitation,
  getVisitationTodayOverview,
  getTotalVisitationForPatient,
  getVisitationYearlyOverviewForPatient,
};
