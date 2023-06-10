const yup = require("yup");

const patientSchema = yup.object({
  name: yup.string().strict().required(),
  birth_place: yup.string().strict(),
  gender: yup.string().strict().required(),
  address: yup.string().strict().required(),
  identity_number: yup.string(),
  category: yup.string().strict().required(),
  insurance_number: yup.string(),
  phone: yup.string(),
  status: yup.string().strict(),
  allergy: yup.string().strict(),
  blood: yup.string().strict(),
  height: yup.number().min(1),
  weight: yup.number().min(1),
  medical_history: yup.string().strict(),
});

module.exports = patientSchema;
