module.exports = (sequelize, DataTypes) => {
  const Prescriptions = sequelize.define("Prescriptions", {
    id_prescription: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    prescription_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    prescription_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
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
  });

  Prescriptions.associate = (models) => {
    Prescriptions.hasMany(models.PrescriptionMedicineIntakes, {
      foreignKey: {
        name: "id_prescription",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    models.PrescriptionMedicineIntakes.belongsTo(Prescriptions, {
      foreignKey: {
        name: "id_prescription",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  //Untuk alter table otomatis dari model
  //   Prescriptions.sync({ alter: true })
  //     .then(() => {
  //       console.log("Alter table prescriptions successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Unable to alter prescriptions table : ", error);
  //     });

  return Prescriptions;
};
