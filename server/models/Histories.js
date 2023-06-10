module.exports = (sequelize, DataTypes) => {
  const Histories = sequelize.define("Histories", {
    id_history: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    complaint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tension: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    body_temperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    treatment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
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

  Histories.associate = (models) => {
    Histories.hasOne(models.Prescriptions, {
      foreignKey: {
        name: "id_history",
        allowNull: false,
        unique: true,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    models.Prescriptions.belongsTo(Histories, {
      foreignKey: {
        name: "id_history",
        allowNull: false,
        unique: true,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  //Untuk alter table otomatis dari model
  // Histories.sync({ alter: true })
  //   .then(() => {
  //     console.log("Alter table history created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to alter history table : ", error);
  //   });

  return Histories;
};
