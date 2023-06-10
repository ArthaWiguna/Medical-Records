module.exports = (sequelize, DataTypes) => {
  const MedicalRecords = sequelize.define("MedicalRecords", {
    id_medical_record: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    allergy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blood: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    medical_history: {
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

  MedicalRecords.associate = (models) => {
    MedicalRecords.hasMany(models.Histories, {
      foreignKey: {
        name: "id_medical_record",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    models.Histories.belongsTo(MedicalRecords, {
      foreignKey: {
        name: "id_medical_record",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  // //Untuk alter table otomatis dari model
  // MedicalRecords.sync({ alter: true })
  //   .then(() => {
  //     console.log("Alter table medical record created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to alter medical record table : ", error);
  //   });

  return MedicalRecords;
};
