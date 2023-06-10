module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id_user: {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.ENUM("Admin", "Dokter", "Pasien"),
      allowNull: false,
      defaultValue: "Pasien",
    },
    image: {
      type: DataTypes.STRING,
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
  });

  //Untuk alter table otomatis dari model
  // Users.sync({ alter: true })
  //   .then(() => {
  //     console.log("Alter table users created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to alter users table : ", error);
  //   });

  return Users;
};
