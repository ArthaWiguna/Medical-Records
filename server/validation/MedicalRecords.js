const yup = require("yup");

const MedicalRecordSchema = yup.object({
  allergy: yup.string().strict(),
  blood: yup.string().strict(),
  height: yup.number().positive(),
  weight: yup.number().positive(),
  medical_history: yup.string().strict(),
  status: yup.string().strict(),
  id_patient: yup.string().strict().required(),
});

module.exports = MedicalRecordSchema;
