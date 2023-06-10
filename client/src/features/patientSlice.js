import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all patient
export const getAllPatient = createAsyncThunk(
  "patient/getAllPatient",
  async ({ params, status }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/patients?params=${params}&status=${status}`
      );
      console.log(response, "get all patient slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// create patient
export const createPatient = createAsyncThunk(
  "patient/createPatient",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3001/patients`, data);
      console.log(response, "create patient slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get detail patient
export const getDetailPatient = createAsyncThunk(
  "patient/getDetailPatient",
  async ({ id, username }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/patients/detail/?id=${id}&username=${username}`
      );
      console.log(response, "get detail patient slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

//  Update patient
export const updatePatient = createAsyncThunk(
  "patient/updatePatient",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id);
    console.log(data);
    try {
      const response = await axios.patch(
        `http://localhost:3001/patients/${id}`,
        data
      );
      console.log(response, "update patient slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get total patient group by category for home page admin card
export const getTotalPatientGroupByCategory = createAsyncThunk(
  "patient/getTotalPatientGroupByCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/patients/total/group/category`
      );
      console.log(response, "get total patient group by category slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  // getPatient
  patients: [],
  getPatientStatus: "",
  getPatientSuccessMessage: "",
  getPatientErrorMessage: "",
  // create patient
  newPatient: [],
  createPatientStatus: "",
  createPatientSuccessMessage: "",
  createPatientErrorMessage: "",
  // detail patient
  detailPatient: [],
  getDetailPatientStatus: "",
  getDetailPatientErrorMessage: "",
  getDetailPatientSuccessMessage: "",
  // update patient
  updatePatientStatus: "",
  updatePatientErrorMessage: "",
  updatePatientSuccessMessage: "",
  // get total patient group by category for home page admin card
  totalPatientGroupByCategory: [],
  getTotalPatientGroupByCategoryStatus: "",
  getTotalPatientGroupByCategoryErrorMessage: "",
  getTotalPatientGroupByCategorySuccessMessage: "",
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: {
    // get all patient
    [getAllPatient.pending]: (state, action) => {
      state.getPatientStatus = "loading";
    },
    [getAllPatient.fulfilled]: (state, action) => {
      state.getPatientStatus = "success";
      state.patients = action.payload.data;
      console.log(state.patients, "di fulfilled");
      state.getPatientSuccessMessage = action.payload.data.message;
      state.patient = [];
      state.getDetailPatientStatus = "";
    },
    [getAllPatient.rejected]: (state, action) => {
      state.getPatientStatus = "rejected";
      state.getPatientErrorMessage = "Network Error";
    },
    // create patient
    [createPatient.pending]: (state, action) => {
      state.createPatientStatus = "loading";
    },
    [createPatient.fulfilled]: (state, action) => {
      state.createPatientStatus = "success";
      state.newPatient = action.payload.data;
      state.createPatientSuccessMessage = action.payload.message;
      console.log(state.createPatientStatus, "di fulfilled");
    },
    [createPatient.rejected]: (state, action) => {
      state.createPatientStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.createPatientErrorMessage = action.payload.response.data.message;
      } else {
        state.createPatientErrorMessage = "Network Error";
      }
    },
    // get detail patient
    [getDetailPatient.pending]: (state, action) => {
      state.getDetailPatientStatus = "loading";
    },
    [getDetailPatient.fulfilled]: (state, action) => {
      state.getDetailPatientStatus = "success";
      state.detailPatient = action.payload.data;
      state.getDetailPatientSuccessMessage = action.payload.message;
    },
    [getDetailPatient.rejected]: (state, action) => {
      state.getDetailPatientStatus = "rejected";
      state.getDetailPatientErrorMessage = "Network Error";
    },
    // upate paatient
    [updatePatient.pending]: (state, action) => {
      state.updatePatientStatus = "loading";
    },
    [updatePatient.fulfilled]: (state, action) => {
      state.updatePatientStatus = "success";
      state.detailPatient = action.payload.data;
      state.updatePatientSuccessMessage = action.payload.message;
    },
    [updatePatient.rejected]: (state, action) => {
      state.updatePatientStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.updatePatientErrorMessage = action.payload.response.data.message;
      } else {
        state.updatePatientErrorMessage = "Network Error";
      }
    },
    // get total patient group by category for home page admin card
    [getTotalPatientGroupByCategory.pending]: (state, action) => {
      state.getTotalPatientGroupByCategoryStatus = "loading";
    },
    [getTotalPatientGroupByCategory.fulfilled]: (state, action) => {
      state.getTotalPatientGroupByCategoryStatus = "success";
      state.totalPatientGroupByCategory = action.payload.data;
      state.getTotalPatientGroupByCategorySuccessMessage =
        action.payload.message;
    },
    [getTotalPatientGroupByCategory.rejected]: (state, action) => {
      state.getTotalPatientGroupByCategoryStatus = "rejected";
      state.getTotalPatientGroupByCategoryErrorMessage = "Network Error";
    },
  },
});

// get all patient
export const getpatients = (state) => state.patient.patients;
export const getPatientStatus = (state) => state.patient.getPatientStatus;
export const getPatientErrorMessage = (state) =>
  state.patient.getPatientErrorMessage;
export const getPatientSuccessMessage = (state) =>
  state.patient.getPatientSuccessMessage;

// create patient
export const getNewPatient = (state) => state.patient.newPatient;
export const getCreatePatientStatus = (state) =>
  state.patient.createPatientStatus;
export const getCreatePatientErrorMessage = (state) =>
  state.patient.createPatientErrorMessage;
export const getCreatePatientSuccessMessage = (state) =>
  state.patient.createPatientSuccessMessage;

// get detil patient
export const getPatient = (state) => state.patient.detailPatient;
export const getDetailPatientStatus = (state) =>
  state.patient.getDetailPatientStatus;
export const getDetailPatientErrorMessage = (state) =>
  state.patient.getDetailPatientErrorMessage;
export const getDetailPatientSuccessMessage = (state) =>
  state.patient.getDetailPatientSuccessMessage;

// update patient
export const getUpdatePatientStatus = (state) =>
  state.patient.updatePatientStatus;
export const getUpdatePatientErrorMessage = (state) =>
  state.patient.updatePatientErrorMessage;
export const getUpdatePatientSuccessMessage = (state) =>
  state.patient.updatePatientSuccessMessage;

// get total patient group by category for home page admin card
export const totalPatientGroupByCategory = (state) =>
  state.patient.totalPatientGroupByCategory;
export const getTotalPatientGroupByCategoryStatus = (state) =>
  state.patient.getTotalPatientGroupByCategoryStatus;
export const getTotalPatientGroupByCategoryErrorMessage = (state) =>
  state.patient.getTotalPatientGroupByCategoryErrorMessage;
export const getTotalPatientGroupByCategorySuccessMessage = (state) =>
  state.patient.getTotalPatientGroupByCategorySuccessMessage;

export default patientSlice.reducer;
