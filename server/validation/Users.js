const yup = require("yup");

const userSchema = yup.object({
  name: yup.string().strict().required(),
  username: yup.string().strict().required(),
  password: yup.string().strict().min(8).max(12).required(),
  level: yup.string().strict().required(),
  image: yup.string().strict(),
  status: yup.string().strict(),
});

module.exports = userSchema;
