const yup = require("yup");

const HistorySchema = yup.object({
  complaint: yup.string().strict().required(),
  tension: yup.string(),
  body_temperature: yup.number().min(0.0).max(100.0),
  diagnosis: yup.string().strict().required(),
  treatment: yup.string().strict().required(),
  description: yup.string().strict(),
  status: yup.string().strict(),
  id_medical_record: yup.string().strict().required(),
  id_history: yup.string().strict(),
  medicineIntake: yup.array(
    yup.object().shape({
      quantity: yup.number().positive().required(),
      dose: yup.string().strict(),
      id_medicine: yup.string().strict().required(),
    })
  ),
});

module.exports = HistorySchema;
