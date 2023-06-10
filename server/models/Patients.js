module.exports = (sequelize, DataTypes) => {
  const Patients = sequelize.define("Patients", {
    id_patient: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_place: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    gender: {
      type: DataTypes.ENUM("Laki-laki", "Perempuan"),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identity_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM("Umum", "BPJS"),
      allowNull: false,
    },
    insurance_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
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

  Patients.associate = (models) => {
    Patients.hasMany(models.Visitations, {
      foreignKey: {
        name: "id_patient",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    models.Visitations.belongsTo(Patients, {
      foreignKey: {
        name: "id_patient",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Patients.hasOne(models.MedicalRecords, {
      foreignKey: {
        name: "id_patient",
        allowNull: false,
        unique: true,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    models.MedicalRecords.belongsTo(Patients, {
      foreignKey: {
        name: "id_patient",
        allowNull: false,
        unique: true,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  // //Untuk alter table otomatis dari model
  // Patients.sync({ alter: true })
  //   .then(() => {
  //     console.log("Alter table patients created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to alter patients table : ", error);
  //   });

  return Patients;
};
