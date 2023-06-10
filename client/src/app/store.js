import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import patientReducer from "../features/patientSlice";
import visitationReducer from "../features/visitationSlice";
import medicineReducer from "../features/medicineSlice";
import medicalRecordReducer from "../features/medicalRecordSlice";
import medicalHistoryReducer from "../features/medicalHistorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    patient: patientReducer,
    visitation: visitationReducer,
    medicine: medicineReducer,
    medicalRecord: medicalRecordReducer,
    medicalHistory: medicalHistoryReducer,
  },
});
