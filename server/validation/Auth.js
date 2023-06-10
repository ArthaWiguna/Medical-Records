const yup = require("yup");

const AuthSchema = yup.object({
  username: yup.string().strict().required(),
  password: yup.string().strict().required(),
});

module.exports = AuthSchema;
