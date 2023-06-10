import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all medicine
export const getAllMedicine = createAsyncThunk(
  "medicine/getAllMedicine",
  async ({ params, status }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/medicines?params=${params}&status=${status}`
      );
      console.log(response, "get all medicines slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// create medicine
export const createMedicine = createAsyncThunk(
  "medicine/createMedicine",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/medicines`,
        data
      );
      console.log(response, "create medicine slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// // get detail medicine
export const getDetailMedicine = createAsyncThunk(
  "medicine/getDetailMedicine",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/medicines/${id}`);
      console.log(response, "get detail medicine slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// update medicine
export const updateMedicine = createAsyncThunk(
  "medicine/updateMedicine",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id);
    console.log(data);
    try {
      const response = await axios.patch(
        `http://localhost:3001/medicines/${id}`,
        data
      );
      console.log(response, "update medicine slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get all medicine history
export const getAllMedicineHistory = createAsyncThunk(
  "medicine/getAllMedicineHistory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/medicines/histories/${id}`
      );
      console.log(response, "get all medicine history slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get most given medicine overview (for home page dokter chart)
export const getMostGivenMedicineOverview = createAsyncThunk(
  "patient/getMostGivenMedicineOverview",
  async ({ year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/medicines/given/overview?year=${year}`
      );
      console.log(response, "get most given medicine overview slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get most received medicine overview (for home page patient chart)
export const getMostReceivedMedicineOverview = createAsyncThunk(
  "patient/getMostReceivedMedicineOverview",
  async ({ id, year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/medicines/received/overview/${id}?year=${year}`
      );
      console.log(response, "get most received medicine overview slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get most low stock medicine (for home page admin and doctor )
export const getLowStockMedicine = createAsyncThunk(
  "patient/getLowStockMedicine",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/medicines/low/stock`
      );
      console.log(response, "get low stock medicine slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  // get all medicines
  medicines: [],
  getMedicineStatus: "",
  getMedicineSuccessMessage: "",
  getMedicineErrorMessage: "",

  // create medicine
  createMedicineStatus: "",
  createMedicineSuccessMessage: "",
  createMedicineErrorMessage: "",

  // detail medicine
  medicine: [],
  getDetailMedicineStatus: "",
  getDetailMedicineErrorMessage: "",
  getDetailMedicineSuccessMessage: "",

  //  update medicine
  updateMedicineStatus: "",
  updateMedicineSuccessMessage: "",
  updateMedicineErrorMessage: "",

  // get all medicine history
  medicineHistories: [],
  geAlltMedicineHistoryStatus: "",
  getAllMedicineHistorySuccessMessage: "",
  getAllMedicineHistoryErrorMessage: "",

  // get most given medicine overview (for home page dokter chart)
  mostGivenMedicineOverview: [],
  getMostGivenMedicineOverviewStatus: "",
  getMostGivenMedicineOverviewSuccessMessage: "",
  getMostGivenMedicineOverviewErrorMessage: "",
  // get most received medicine overview (for home page patient chart)
  mostReceivedMedicineOverview: [],
  getMostReceivedMedicineOverviewStatus: "",
  getMostReceivedMedicineOverviewSuccessMessage: "",
  getMostReceivedMedicineOverviewErrorMessage: "",
  // get most low stock medicine (for home page admin and doctor )
  lowStockMedicine: [],
  getLowStockMedicineStatus: "",
  getLowStockMedicineSuccessMessage: "",
  getLowStockMedicineErrorMessage: "",
};

const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {},
  extraReducers: {
    // get all medicine
    [getAllMedicine.pending]: (state, action) => {
      state.getMedicineStatus = "loading";
    },
    [getAllMedicine.fulfilled]: (state, action) => {
      state.getMedicineStatus = "success";
      state.medicines = action.payload.data;
      console.log(state.medicines);
      state.getMedicineSuccessMessage = action.payload.data.message;
    },
    [getAllMedicine.rejected]: (state, action) => {
      state.getMedicineStatus = "rejected";
      state.getMedicineErrorMessage = "Network Error";
    },
    // create medicine
    [createMedicine.pending]: (state, action) => {
      state.createMedicineStatus = "loading";
    },
    [createMedicine.fulfilled]: (state, action) => {
      state.createMedicineStatus = "success";
      state.createMedicineSuccessMessage = action.payload;
    },
    [createMedicine.rejected]: (state, action) => {
      state.createMedicineStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.createMedicineErrorMessage = action.payload.response.data.message;
      } else {
        state.createMedicineErrorMessage = "Network Error";
      }
    },
    // get detail medicine
    [getDetailMedicine.pending]: (state, action) => {
      state.getDetailMedicineStatus = "loading";
    },
    [getDetailMedicine.fulfilled]: (state, action) => {
      state.getDetailMedicineStatus = "success";
      state.medicine = action.payload.data;
      console.log(state.medicine, "ini di fulfiled");
      state.getDetailMedicineSuccessMessage = action.payload.message;
    },
    [getDetailMedicine.rejected]: (state, action) => {
      state.getDetailMedicineStatus = "rejected";
      state.getDetailMedicineErrorMessage = "Network Error";
    },
    // upate medicine
    [updateMedicine.pending]: (state, action) => {
      state.updateMedicineStatus = "loading";
    },
    [updateMedicine.fulfilled]: (state, action) => {
      state.updateMedicineStatus = "success";
      state.updateMedicineSuccessMessage = action.payload.message;
    },
    [updateMedicine.rejected]: (state, action) => {
      state.updateMedicineStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.updateMedicineErrorMessage = action.payload.response.data.message;
      } else {
        state.updateMedicineErrorMessage = "Network Error";
      }
    },
    [getAllMedicineHistory.pending]: (state, action) => {
      state.geAlltMedicineHistoryStatus = "loading";
    },
    [getAllMedicineHistory.fulfilled]: (state, action) => {
      state.geAlltMedicineHistoryStatus = "success";
      state.medicineHistories = action.payload.data.medicines;
      state.getAllMedicineHistorySuccessMessage = action.payload.message;
    },
    [getAllMedicineHistory.rejected]: (state, action) => {
      state.geAlltMedicineHistoryStatus = "rejected";
      state.getAllMedicineHistoryErrorMessage = "Network Error";
    },

    // get most given medicine overview (for home page dokter chart)
    [getMostGivenMedicineOverview.pending]: (state, action) => {
      state.getMostGivenMedicineOverviewStatus = "loading";
    },
    [getMostGivenMedicineOverview.fulfilled]: (state, action) => {
      state.getMostGivenMedicineOverviewStatus = "success";
      state.mostGivenMedicineOverview = action.payload.data;
      state.getMostGivenMedicineOverviewSuccessMessage = action.payload.message;
    },
    [getMostGivenMedicineOverview.rejected]: (state, action) => {
      state.getMostGivenMedicineOverviewStatus = "rejected";
      state.getMostGivenMedicineOverviewErrorMessage = "Network Error";
    },

    // get most received medicine overview (for home page patient chart)
    [getMostReceivedMedicineOverview.pending]: (state, action) => {
      state.getMostReceivedMedicineOverviewStatus = "loading";
    },
    [getMostReceivedMedicineOverview.fulfilled]: (state, action) => {
      state.getMostReceivedMedicineOverviewStatus = "success";
      state.mostReceivedMedicineOverview = action.payload.data;
      state.getMostReceivedMedicineOverviewSuccessMessage =
        action.payload.message;
    },
    [getMostReceivedMedicineOverview.rejected]: (state, action) => {
      state.getMostReceivedMedicineOverviewStatus = "rejected";
      state.getMostReceivedMedicineOverviewErrorMessage = "Network Error";
    },
    // get most low stock medicine (for home page admin and doctor )
    [getLowStockMedicine.pending]: (state, action) => {
      state.getLowStockMedicineStatus = "loading";
    },
    [getLowStockMedicine.fulfilled]: (state, action) => {
      state.getLowStockMedicineStatus = "success";
      state.lowStockMedicine = action.payload.data;
      console.log(state.lowStockMedicine, "di success");
      state.getLowStockMedicineSuccessMessage = action.payload.message;
    },
    [getLowStockMedicine.rejected]: (state, action) => {
      state.getLowStockMedicineStatus = "rejected";
      state.getLowStockMedicineErrorMessage = "Network Error";
    },
  },
});

// get all medicine
export const medicines = (state) => state.medicine.medicines;
export const getMedicineStatus = (state) => state.medicine.getMedicineStatus;
export const getMedicineErrorMessage = (state) =>
  state.medicine.getMedicineErrorMessage;
export const getMedicineSuccessMessage = (state) =>
  state.medicine.getMedicineSuccessMessage;

// create medicine
export const createMedicineStatus = (state) =>
  state.medicine.createMedicineStatus;
export const createMedicineErrorMessage = (state) =>
  state.medicine.createMedicineErrorMessage;
export const createMedicineSuccessMessage = (state) =>
  state.medicine.createMedicineSuccessMessage;

// get detail patient
export const medicine = (state) => state.medicine.medicine;
export const getDetailMedicineStatus = (state) =>
  state.medicine.getDetailMedicineStatus;
export const getDetailMedicineErrorMessage = (state) =>
  state.medicine.getDetailMedicineErrorMessage;
export const getDetailMedicineSuccessMessage = (state) =>
  state.medicine.getDetailMedicineSuccessMessage;

// update medicine
export const updateMedicineStatus = (state) =>
  state.medicine.updateMedicineStatus;
export const updateMedicineErrorMessage = (state) =>
  state.medicine.updateMedicineErrorMessage;
export const updateMedicineSuccessMessage = (state) =>
  state.medicine.updateMedicineSuccessMessage;

// get all medicine history
export const medicineHistories = (state) => state.medicine.medicineHistories;
export const geAlltMedicineHistoryStatus = (state) =>
  state.medicine.geAlltMedicineHistoryStatus;
export const getAllMedicineHistoryErrorMessage = (state) =>
  state.medicine.getAllMedicineHistoryErrorMessage;
export const getAllMedicineHistorySuccessMessage = (state) =>
  state.medicine.getAllMedicineHistorySuccessMessage;

// get most given medicine overview (for home page dokter chart)
export const mostGivenMedicineOverview = (state) =>
  state.medicine.mostGivenMedicineOverview;
export const getMostGivenMedicineOverviewStatus = (state) =>
  state.medicine.getMostGivenMedicineOverviewStatus;
export const getMostGivenMedicineOverviewErrorMessage = (state) =>
  state.medicine.getMostGivenMedicineOverviewErrorMessage;
export const getMostGivenMedicineOverviewSuccessMessage = (state) =>
  state.medicine.getMostGivenMedicineOverviewSuccessMessage;

// get most received medicine overview (for home page patient chart)
export const mostReceivedMedicineOverview = (state) =>
  state.medicine.mostReceivedMedicineOverview;
export const getMostReceivedMedicineOverviewStatus = (state) =>
  state.medicine.getMostReceivedMedicineOverviewStatus;
export const getMostReceivedMedicineOverviewErrorMessage = (state) =>
  state.medicine.getMostReceivedMedicineOverviewErrorMessage;
export const getMostReceivedMedicineOverviewSuccessMessage = (state) =>
  state.medicine.getMostReceivedMedicineOverviewSuccessMessage;

// get most low stock medicine (for home page admin and doctor )
export const lowStockMedicine = (state) => state.medicine.lowStockMedicine;
export const getLowStockMedicineStatus = (state) =>
  state.medicine.getLowStockMedicineStatus;
export const getLowStockMedicineErrorMessage = (state) =>
  state.medicine.getLowStockMedicineErrorMessage;
export const getLowStockMedicineSuccessMessage = (state) =>
  state.medicine.getLowStockMedicineSuccessMessage;

export default medicineSlice.reducer;
