module.exports = (sequelize, DataTypes) => {
  const Visitations = sequelize.define("Visitations", {
    id_visitation: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    queue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Menunggu", "Diperiksa", "Selesai", "Lewat"),
      allowNull: false,
      defaultValue: "Menunggu",
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

  Visitations.associate = (models) => {
    Visitations.hasMany(models.References, {
      foreignKey: {
        name: "id_visitation",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    models.References.belongsTo(Visitations, {
      foreignKey: {
        name: "id_visitation",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  // //Untuk alter table otomatis dari model
  // Visitations.sync({ alter: true })
  //   .then(() => {
  //     console.log("Alter table visitation created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to alter visitation table : ", error);
  //   });

  return Visitations;
};
