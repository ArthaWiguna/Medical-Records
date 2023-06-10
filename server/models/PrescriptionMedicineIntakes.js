module.exports = (sequelize, DataTypes) => {
  const PrescriptionMedicineIntakes = sequelize.define(
    "PrescriptionMedicineIntakes",
    {
      id_prescription_medicine_intakes: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usage: {
        type: DataTypes.ENUM("Sebelum makan", "Sesudah makan"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Active", "Nonactive"),
        allowNull: false,
        defaultValue: "Active",
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    }
  );

  // //Untuk alter table otomatis dari model
  // PrescriptionMedicineIntakes.sync({ alter: true })
  //   .then(() => {
  //     console.log(
  //       "Alter table prescriptionMedicineIntakes created successfully!"
  //     );
  //   })
  //   .catch((error) => {
  //     console.error(
  //       "Unable to alter prescriptionMedicineIntakes table : ",
  //       error
  //     );
  //   });

  return PrescriptionMedicineIntakes;
};
