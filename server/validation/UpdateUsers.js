const yup = require("yup");

const updateUserSchema = yup.object({
  status: yup.string().strict().required(),
});

module.exports = updateUserSchema;
