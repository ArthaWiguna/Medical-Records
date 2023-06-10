const express = require("express");
const usersController = require("../controller/Users");
const validation = require("../middleware/validationMiddleware");
const userSchema = require("../validation/Users");
const authSchema = require("../validation/Auth");
const updateUserSchema = require("../validation/UpdateUsers");

const router = express.Router();
//admin
router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getDetailUser);
router.post("/", validation(userSchema), usersController.createNewUser);
router.patch("/:id", usersController.updateUser);
router.delete("/:id");
//auth
router.post("/register", validation(userSchema), usersController.register);
router.post("/login", validation(authSchema), usersController.login);
router.patch("/account/setting/:id", usersController.accountSetting);

module.exports = router;
