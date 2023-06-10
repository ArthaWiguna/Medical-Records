module.exports = (sequelize, DataTypes) => {
  const MedicineIntakes = sequelize.define("MedicineIntakes", {
    id_medicine_intake: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dose: {
      type: DataTypes.STRING,
      allowNull: false,
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

  // bahan: https://www.topcoder.com/thrive/articles/many-to-many-relationships-in-mysql-database-using-sequelize-orm
  //https://stackoverflow.com/questions/59734810/node-js-mysql-many-to-many-relationship
  //https://github.com/anjana-wijesooriya/E-Commerce-Application-Nodejs-Angular-8-MYSQL/blob/master/backend/dataAccessLayer/order-controller.js
  //https://github.com/AhmadHaleeem/ecommerceNodeJs/blob/master/controllers/shop.js
  //https://sebhastian.com/sequelize-belongstomany/

  // MedicineIntakes.associate = (models) => {
  //   MedicineIntakes.belongsTo(models.Histories, {
  //     foreignKey: {
  //       name: "id_history",
  //       allowNull: false,
  //     },
  //     onUpdate: "RESTRICT",
  //     onDelete: "RESTRICT",
  //   });
  //   MedicineIntakes.belongsTo(models.Medicines, {
  //     foreignKey: {
  //       name: "id_medicine",
  //       allowNull: false,
  //     },
  //     onUpdate: "RESTRICT",
  //     onDelete: "RESTRICT",
  //   });
  // };

  MedicineIntakes.associate = (models) => {
    models.Histories.belongsToMany(models.Medicines, {
      through: MedicineIntakes,
      foreignKey: {
        name: "id_history",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    models.Medicines.belongsToMany(models.Histories, {
      through: MedicineIntakes,
      foreignKey: {
        name: "id_medicine",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    models.Histories.hasMany(MedicineIntakes, {
      foreignKey: {
        name: "id_history",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    MedicineIntakes.belongsTo(models.Histories, {
      foreignKey: {
        name: "id_history",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    models.Medicines.hasMany(MedicineIntakes, {
      foreignKey: {
        name: "id_medicine",
        allowNull: true,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    MedicineIntakes.belongsTo(models.Medicines, {
      foreignKey: {
        name: "id_medicine",
        allowNull: true,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return MedicineIntakes;
};
