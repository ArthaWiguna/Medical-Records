const yup = require("yup");

const medicineSchema = yup.object({
  name: yup.string().strict().required(),
  unit: yup.string().strict().required(),
  classMedicine: yup.string().strict().required(),
  age_category: yup.string().strict().required(),
  composition: yup.string().strict().required(),
  general_indication: yup.string().strict().required(),
  contra_indication: yup.string().strict().required(),
  side_effect: yup.string().strict(),
  usage: yup.string().strict().required(),
  expired: yup.string().strict().required(),
  stock: yup.number().min(0).required(),
  image: yup.string().strict(),
  status: yup.string().strict(),
  description: yup.string().strict(),
});

module.exports = medicineSchema;
