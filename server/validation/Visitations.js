const yup = require("yup");

const visitationSchema = yup.object({
  description: yup.string().strict().required(),
  status: yup.string().strict(),
  id_patient: yup.string().strict().required(),
});

module.exports = visitationSchema;
