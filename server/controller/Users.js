const { Users, Patients } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

// Admin
const createNewUser = async (req, res) => {
  const { name, username, password, level } = req.body;

  try {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        name: name,
        username: username,
        password: hash,
        level: level,
        image: "",
      });
    });
    res.json("Create user success");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  let filterSearch = req.query.params
    ? { name: { [Op.like]: `%${req.query.params}%` } }
    : null;

  try {
    const users = await Users.findAll({
      where: {
        [Op.and]: [filterSearch, { level: { [Op.ne]: "Pasien" } }],
      },
      order: [
        ["status", "ASC"],
        ["updatedAt", "DESC"],
      ],
    });
    res.json({
      message: "Get all user success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await Users.findByPk(id);
    res.json({
      message: "Get detail user success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { name, level, status } = req.body;
  const { id } = req.params;

  try {
    await Users.update(
      { name: name, level: level, status: status },
      {
        where: {
          id_user: {
            [Op.eq]: id,
          },
        },
      }
    );

    res.json({
      message: "Update user success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// All
const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        name: name,
        username: username,
        password: hash,
      });
    });
    res.json("Register success");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

//login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ username: username }, { status: "active" }],
      },
    });
    if (!user) {
      res.status(400).json({ error: "User Doesn't Exist" });
    } else {
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          res.status(400).json({ error: "Wrong username or password" });
        } else {
          res.json({
            message: "Login success",
            data: {
              user: user,
            },
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const accountSetting = async (req, res) => {
  const accountSettingData = req.body;
  const image = req.file ? req.file.path : "";
  const { id } = req.params;

  try {
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ id_user: id }, { status: "Active" }],
      },
    });

    //cek is this update password or profile
    if (accountSettingData.old_password && accountSettingData.new_password) {
      // Check if the old password is correct
      const isPasswordCorrect = await bcrypt.compare(
        accountSettingData.old_password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
      // Hash the new password
      const hashedPassword = await bcrypt.hash(
        accountSettingData.new_password,
        10
      );
      // Update the user's password in the database
      await Users.update(
        { password: hashedPassword },
        {
          where: {
            id_user: {
              [Op.eq]: id,
            },
          },
        }
      );
      return res.status(200).json({
        message: "Update password success",
        data: {
          id_user: id,
          name: accountSettingData.name,
          username: accountSettingData.username,
          level: accountSettingData.level,
          image: user.dataValues.image,
        },
      });
    } else {
      if (image) {
        Users.update(
          {
            name: accountSettingData.name,
            username: accountSettingData.username,
            level: accountSettingData.level,
            image: image,
            status: accountSettingData.status,
          },
          {
            where: {
              id_user: {
                [Op.eq]: id,
              },
            },
          }
        );
      } else {
        Users.update(
          {
            name: accountSettingData.name,
            username: accountSettingData.username,
            level: accountSettingData.level,
            status: accountSettingData.status,
          },
          {
            where: {
              id_user: {
                [Op.eq]: id,
              },
            },
          }
        );
      }
    }
    // if user role patient, update data patient
    if (accountSettingData.level === "Pasien") {
      if (image) {
        await Patients.update(
          {
            name: accountSettingData.name,
            birth_place: accountSettingData.birth_place,
            birth_date: accountSettingData.birth_date,
            gender: accountSettingData.gender,
            address: accountSettingData.address,
            identity_number: accountSettingData.identity_number,
            category: accountSettingData.category,
            insurance_number: accountSettingData.insurance_number,
            phone: accountSettingData.phone,
            image: image,
            status: accountSettingData.status,
          },
          {
            where: {
              username: {
                [Op.eq]: accountSettingData.username,
              },
            },
          }
        );
      } else {
        await Patients.update(
          {
            name: accountSettingData.name,
            birth_place: accountSettingData.birth_place,
            birth_date: accountSettingData.birth_date,
            gender: accountSettingData.gender,
            address: accountSettingData.address,
            identity_number: accountSettingData.identity_number,
            category: accountSettingData.category,
            insurance_number: accountSettingData.insurance_number,
            phone: accountSettingData.phone,
            status: accountSettingData.status,
          },
          {
            where: {
              username: {
                [Op.eq]: accountSettingData.username,
              },
            },
          }
        );
      }
    }
    res.json({
      message: "Update profile success",
      data: {
        id_user: id,
        name: accountSettingData.name,
        username: accountSettingData.username,
        level: accountSettingData.level,
        image: image ? image : user.dataValues.image,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getDetailUser,
  updateUser,
  register,
  login,
  accountSetting,
};
