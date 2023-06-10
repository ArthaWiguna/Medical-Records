module.exports = (sequelize, DataTypes) => {
  const References = sequelize.define("References", {
    id_reference: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    reference_place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poly: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reference_date: {
      type: DataTypes.STRING,
      allowNull: false,
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

  // //Untuk alter table otomatis dari model
  // References.sync({ alter: true })
  //   .then(() => {
  //     console.log("Alter table reference created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to alter reference table : ", error);
  //   });

  return References;
};
