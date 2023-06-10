module.exports = (sequelize, DataTypes) => {
  const Medicines = sequelize.define("Medicines", {
    id_medicine: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM(
        "Kapsul",
        "Tablet",
        "Kaplet",
        "Botol",
        "Serbuk",
        "Salep"
      ),
      allowNull: false,
    },
    general_indication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    composition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age_category: {
      type: DataTypes.ENUM("Anak-anak", "Dewasa", "Semua usia"),
      allowNull: false,
    },
    usage: {
      type: DataTypes.ENUM("Sebelum makan", "Sesudah makan"),
      allowNull: false,
    },
    contra_indication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    side_effect: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    class: {
      type: DataTypes.ENUM("Obat bebas", "Obat bebas terbatas", "Obat keras"),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expired: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Available", "Not Available"),
      allowNull: false,
      defaultValue: "Available",
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

  // tambahan di table
  // -indikasi umum
  // -komposisi
  // -kategori usia
  // -aturan pakai
  // -kontra indikasi
  // efek samping
  // golongan obat(bebas, resep)
  // tgl kadaluwarsa
  // Description

  // https://www.halodoc.com/obat-dan-vitamin/paracetamol-500-mg-10-kaplet

  //Untuk alter table otomatis dari model
  // Medicines.sync({ alter: true })
  //   .then(() => {
  //     console.log("Alter table medicine created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to alter medicine table : ", error);
  //   });

  return Medicines;
};
