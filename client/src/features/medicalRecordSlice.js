import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all medical record
export const getAllMedicalRecord = createAsyncThunk(
  "medicalRecord/getAllMedicalRecord",
  async ({ params }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/medical-records?params=${params}`
      );
      console.log(response, "get all medicalRecord slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// create medical record
export const createMedicalRecord = createAsyncThunk(
  "medicalRecord/createMedicalRecord",
  async ({ data }, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.post(
        `http://localhost:3001/medical-records`,
        data
      );
      console.log(response, "create medicalRecord slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get detail medical record
export const getDetailMedicalRecord = createAsyncThunk(
  "medicalRecord/getDetailMedicalRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/medical-records/${id}`
      );
      console.log(response, "get detail medical record slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

//  Update medicalRecord
export const updateMedicalRecord = createAsyncThunk(
  "medicalRecord/updateMedicalRecord",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/medical-records/${id}`,
        data
      );
      console.log(response, "update medicalRecord slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  // get all medical record
  medicalRecords: [],
  getMedicalRecordStatus: "",
  getMedicalRecordSuccessMessage: "",
  getMedicalRecordErrorMessage: "",

  // create medical record
  createMedicalRecordStatus: "",
  createMedicalRecordSuccessMessage: "",
  createMedicalRecordErrorMessage: "",

  // get detail medical record
  medicalRecord: [],
  getDetailMedicalRecordStatus: "",
  getDetailMedicalRecordSuccessMessage: "",
  getDetailMedicalRecordErrorMessage: "",

  // update medical record
  upadteMedicalRecordStatus: "",
  updateMedicalRecordSuccessMessage: "",
  updateMedicalRecordErrorMessage: "",
};

const medicalRecordSlice = createSlice({
  name: "medicalRecord",
  initialState,
  reducers: {},
  extraReducers: {
    // get all patient
    [getAllMedicalRecord.pending]: (state, action) => {
      state.getMedicalRecordStatus = "loading";
    },
    [getAllMedicalRecord.fulfilled]: (state, action) => {
      state.getMedicalRecordStatus = "success";
      state.medicalRecords = action.payload.data;
      state.getMedicalRecordSuccessMessage = action.payload.message;
      state.medicalRecord = [];
      state.getDetailMedicalRecordStatus = "";
    },
    [getAllMedicalRecord.rejected]: (state, action) => {
      state.getMedicalRecordStatus = "rejected";
      state.getMedicalRecordErrorMessage = "Network Error";
    },
    // create medical record
    [createMedicalRecord.pending]: (state, action) => {
      state.createMedicalRecordStatus = "loading";
    },
    [createMedicalRecord.fulfilled]: (state, action) => {
      state.createMedicalRecordStatus = "success";
      state.createMedicalRecordSuccessMessage = action.payload;
    },
    [createMedicalRecord.rejected]: (state, action) => {
      state.createMedicalRecordStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.createMedicalRecordErrorMessage =
          action.payload.response.data.message;
      } else {
        state.createMedicalRecordErrorMessage = "Network Error";
      }
    },
    // get detail medical record
    [getDetailMedicalRecord.pending]: (state, action) => {
      state.getDetailMedicalRecordStatus = "loading";
    },
    [getDetailMedicalRecord.fulfilled]: (state, action) => {
      state.getDetailMedicalRecordStatus = "success";
      state.medicalRecord = action.payload.data;
      state.getDetailMedicalRecordSuccessMessage = action.payload.message;
    },
    [getDetailMedicalRecord.rejected]: (state, action) => {
      state.getDetailMedicalRecordStatus = "rejected";
      state.getDetailMedicalRecordErrorMessage = "Network Error";
    },
    // upate medical record
    [updateMedicalRecord.pending]: (state, action) => {
      state.updateMedicalRecordStatus = "loading";
    },
    [updateMedicalRecord.fulfilled]: (state, action) => {
      state.updateMedicalRecordStatus = "success";
      state.updateMedicalRecordSuccessMessage = action.payload.message;
    },
    [updateMedicalRecord.rejected]: (state, action) => {
      state.updateMedicalRecordStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.updateMedicalRecordErrorMessage =
          action.payload.response.data.message;
      } else {
        state.updateMedicalRecordErrorMessage = "Network Error";
      }
    },
  },
});

// get all medical record
export const medicalRecords = (state) => state.medicalRecord.medicalRecords;
export const getMedicalRecordStatus = (state) =>
  state.medicalRecord.getMedicalRecordStatus;
export const getMedicalRecordErrorMessage = (state) =>
  state.medicalRecord.getMedicalRecordErrorMessage;
export const getMedicalRecordSuccessMessage = (state) =>
  state.medicalRecord.getMedicalRecordSuccessMessage;

// create medical record
export const createMedicalRecordStatus = (state) =>
  state.medicalRecord.createMedicalRecordStatus;
export const createMedicalRecordErrorMessage = (state) =>
  state.medicalRecord.createMedicalRecordErrorMessage;
export const createMedicalRecordSuccessMessage = (state) =>
  state.medicalRecord.createMedicalRecordSuccessMessage;

// get detail medical record
export const medicalRecord = (state) => state.medicalRecord.medicalRecord;
export const getDetailMedicalRecordStatus = (state) =>
  state.medicalRecord.getDetailMedicalRecordStatus;
export const getDetailMedicalRecordErrorMessage = (state) =>
  state.medicalRecord.getDetailMedicalRecordErrorMessage;
export const getDetailMedicalRecordSuccessMessage = (state) =>
  state.medicalRecord.getDetailMedicalRecordSuccessMessage;

// update medical record
export const updateMedicalRecordStatus = (state) =>
  state.medicalRecord.updateMedicalRecordStatus;
export const updateMedicalRecordErrorMessage = (state) =>
  state.medicalRecord.updateMedicalRecordErrorMessage;
export const updateMedicalRecordSuccessMessage = (state) =>
  state.medicalRecord.updateMedicalRecordSuccessMessage;

export default medicalRecordSlice.reducer;
