import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all patient histories
export const getAllMedicalHistory = createAsyncThunk(
  "medicalHistory/getAllMedicalHistory",
  async ({ id, params, date }, { rejectWithValue }) => {
    console.log(id, "id di history");
    try {
      const response = await axios.get(
        `http://localhost:3001/histories/${id}?params=${params}&date=${date}`
      );
      console.log(response, "get all medicalHistory slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// create medical history
export const createMedicalHistory = createAsyncThunk(
  "medicalHistory/createMedicalHistory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/histories`,
        data
      );
      console.log(response, "create medicalHistory slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get detail medical history
export const getDetailMedicalHistory = createAsyncThunk(
  "medicalHistory/getDetailMedicalHistory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/histories/detail/${id}`
      );
      console.log(response, "get detail medical history slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// update medical history
export const updateMedicalHistory = createAsyncThunk(
  "medicalHistory/updateMedicalHistory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/histories/${id}`,
        data
      );
      console.log(response, "update medicalHistory slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get medical history yeraly overview (for chart home page doctor)
export const getMedicalHistoryYearlyOverview = createAsyncThunk(
  "medicalHistory/getMedicalHistoryYearlyOverview",
  async ({ year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/histories/yearly/overview?year=${year}`
      );
      console.log(response, "get medical history yearly overview slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  // get all patient histories
  medicalHistories: [],
  getAllMedicalHistoryStatus: "",
  getAllMedicalHistorySuccessMessage: "",
  getAllMedicalHistoryErrorMessage: "",
  // create medical history
  createMedicalHistoryStatus: "",
  createMedicalHistorySuccessMessage: "",
  createMedicalHistoryErrorMessage: "",
  // detail medical history
  detailMedicalHistory: [],
  getDetailMedicalHistoryStatus: "",
  getDetailMedicalHistoryErrorMessage: "",
  getDetailMedicalHistorySuccessMessage: "",
  // update medical history
  updateMedicalHistoryStatus: "",
  updateMedicalHistorySuccessMessage: "",
  updateMedicalHistoryErrorMessage: "",

  // get medical history yeraly overview (for chart home page doctor)
  medicalHistoryYearlyOverview: [],
  getMedicalHistoryYearlyOverviewStatus: "",
  getMedicalHistoryYearlyOverviewSuccessMessage: "",
  getMedicalHistoryYearlyOverviewErrorMessage: "",
};

const medicalHistorySlice = createSlice({
  name: "medicalHistory",
  initialState,
  reducers: {},
  extraReducers: {
    // get all patient history
    [getAllMedicalHistory.pending]: (state, action) => {
      state.getAllMedicalHistoryStatus = "loading";
    },
    [getAllMedicalHistory.fulfilled]: (state, action) => {
      state.getAllMedicalHistoryStatus = "success";
      state.medicalHistories = action.payload.data;
      state.detailMedicalHistory = [];
      state.getAllMedicalHistorySuccessMessage = action.payload.message;
    },
    [getAllMedicalHistory.rejected]: (state, action) => {
      state.getAllMedicalHistoryStatus = "rejected";
      state.getAllMedicalHistoryErrorMessage = "Network Error";
    },
    // create patient
    [createMedicalHistory.pending]: (state, action) => {
      state.createMedicalHistoryStatus = "loading";
    },
    [createMedicalHistory.fulfilled]: (state, action) => {
      state.createMedicalHistoryStatus = "success";
      state.createMedicalHistorySuccessMessage = action.payload;
    },
    [createMedicalHistory.rejected]: (state, action) => {
      state.createMedicalHistoryStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.createMedicalHistoryErrorMessage =
          action.payload.response.data.message;
      } else {
        state.createMedicalHistoryErrorMessage = "Network Error";
      }
    },
    // get detail medical history
    [getDetailMedicalHistory.pending]: (state, action) => {
      state.getDetailMedicalHistoryStatus = "loading";
    },
    [getDetailMedicalHistory.fulfilled]: (state, action) => {
      state.getDetailMedicalHistoryStatus = "success";
      state.detailMedicalHistory = action.payload.data;
      state.getDetailMedicalHistorySuccessMessage = action.payload.message;
    },
    [getDetailMedicalHistory.rejected]: (state, action) => {
      state.getDetailMedicalHistoryStatus = "rejected";
      state.getDetailMedicalHistoryErrorMessage = "Network Error";
    },
    // upate medical history
    [updateMedicalHistory.pending]: (state, action) => {
      state.updateMedicalHistoryStatus = "loading";
    },
    [updateMedicalHistory.fulfilled]: (state, action) => {
      state.updateMedicalHistoryStatus = "success";
      state.updateMedicalHistorySuccessMessage = action.payload;
    },
    [updateMedicalHistory.rejected]: (state, action) => {
      state.updateMedicalHistoryStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.updateMedicalHistoryErrorMessage =
          action.payload.response.data.message;
      } else {
        state.updateMedicalHistoryErrorMessage = "Network Error";
      }
    },
    // get medical history yeraly overview (for chart home page doctor)
    [getMedicalHistoryYearlyOverview.pending]: (state, action) => {
      state.getMedicalHistoryYearlyOverviewStatus = "loading";
    },
    [getMedicalHistoryYearlyOverview.fulfilled]: (state, action) => {
      state.getMedicalHistoryYearlyOverviewStatus = "success";
      state.medicalHistoryYearlyOverview = action.payload.data;
      state.getMedicalHistoryYearlyOverviewSuccessMessage =
        action.payload.message;
    },
    [getMedicalHistoryYearlyOverview.rejected]: (state, action) => {
      state.getMedicalHistoryYearlyOverviewStatus = "rejected";
      state.getMedicalHistoryYearlyOverviewErrorMessage = "Network Error";
    },
  },
});

// get all patient histories
export const medicalHistories = (state) =>
  state.medicalHistory.medicalHistories;
export const getAllMedicalHistoryStatus = (state) =>
  state.medicalHistory.getAllMedicalHistoryStatus;
export const getAllMedicalHistoryErrorMessage = (state) =>
  state.medicalHistory.getAllMedicalHistoryErrorMessage;
export const getAllMedicalHistorySuccessMessage = (state) =>
  state.medicalHistory.getAllMedicalHistorySuccessMessage;

// create medical history
export const createMedicalHistoryStatus = (state) =>
  state.medicalHistory.createMedicalHistoryStatus;
export const createMedicalHistoryErrorMessage = (state) =>
  state.medicalHistory.createMedicalHistoryErrorMessage;
export const createMedicalHistorySuccessMessage = (state) =>
  state.medicalHistory.createMedicalHistorySuccessMessage;

// get detail medical history
export const medicalHistory = (state) =>
  state.medicalHistory.detailMedicalHistory;
export const getDetailMedicalHistoryStatus = (state) =>
  state.medicalHistory.getDetailMedicalHistoryStatus;
export const getDetailMedicalHistoryErrorMessage = (state) =>
  state.medicalHistory.getDetailMedicalHistoryErrorMessage;
export const getDetailMedicalHistorySuccessMessage = (state) =>
  state.medicalHistory.getDetailMedicalHistorySuccessMessage;

// update medical history
export const updateMedicalHistoryStatus = (state) =>
  state.medicalHistory.updateMedicalHistoryStatus;
export const updateMedicalHistoryErrorMessage = (state) =>
  state.medicalHistory.updateMedicalHistoryErrorMessage;
export const updateMedicalHistorySuccessMessage = (state) =>
  state.medicalHistory.updateMedicalHistorySuccessMessage;

// get medical history yeraly overview (for chart home page doctor)
export const medicalHistoryYearlyOverview = (state) =>
  state.medicalHistory.medicalHistoryYearlyOverview;
export const getMedicalHistoryYearlyOverviewStatus = (state) =>
  state.medicalHistory.getMedicalHistoryYearlyOverviewStatus;
export const getMedicalHistoryYearlyOverviewErrorMessage = (state) =>
  state.medicalHistory.getMedicalHistoryYearlyOverviewErrorMessage;
export const getMedicalHistoryYearlyOverviewSuccessMessage = (state) =>
  state.medicalHistory.getMedicalHistoryYearlyOverviewSuccessMessage;

export default medicalHistorySlice.reducer;
