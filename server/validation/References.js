const yup = require("yup");

const referenceSchema = yup.object({
  reference_place: yup.string().strict().required(),
  poly: yup.string().strict().required(),
  reference_date: yup.date().required(),
  description: yup.string().strict().required(),
  id_visitation: yup.string().strict().required(),
});

module.exports = referenceSchema;
