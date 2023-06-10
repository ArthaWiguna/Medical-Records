import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get visitation
export const getVisitation = createAsyncThunk(
  "visitation/getVisitation",
  async ({ params }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/visitations?params=${params}`
      );
      console.log(response, "get visitation slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// create visiatation
export const createVisitation = createAsyncThunk(
  "visitation/createVisitation",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/visitations`,
        data
      );
      console.log(response, "create visitation slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// update visitation
export const updateVisitation = createAsyncThunk(
  "visitation/updateVisitation",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/visitations/${id}`,
        data
      );
      console.log(response, "update visitation slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get visitation
export const getDetailVisitation = createAsyncThunk(
  "visitation/getDetailVisitation",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/visitations/${id}`
      );
      console.log(response, "get detail visitation slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get reports
export const getReport = createAsyncThunk(
  "visitation/getReport",
  async ({ start, end, category }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/reports?start=${start}&end=${end}&category=${category}`
      );
      console.log(response, "get report slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get total visitation group by category (for home page admin card)
export const getTotalVisitationGroupByCategory = createAsyncThunk(
  "patient/getTotalVisitationGroupByCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/visitations/total/group/category`
      );
      console.log(response, "get total visitation group by category slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get visitation yeraly overview (for chart home page admin)
export const getVisitationYearlyOverview = createAsyncThunk(
  "visitation/getVisitationYearlyOverview",
  async ({ year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/visitations/yearly/overview?year=${year}`
      );
      console.log(response, "get overview visitation slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get visitation old new patient comparasion  (for chart home page admin)
export const getVisitationComparasion = createAsyncThunk(
  "visitation/getVisitationComparasion",
  async ({ year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/visitations/patient/comparasion?year=${year}`
      );
      console.log(response, "get visitation comparasion slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get visitation today overview (for card home page doctor)
export const getVisitationTodayOverview = createAsyncThunk(
  "visitation/getVisitationTodayOverview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/visitations/today/overview`
      );
      console.log(response, "get visitation today overview slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get total visitation (for card home page patient)
export const getTotalVisitationPatient = createAsyncThunk(
  "visitation/getTotalVisitationPatient",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/visitations/total/patient/${id}`
      );
      console.log(response, "get total visitation patient slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get visitation yearly overview (for chart home page patient)
export const getVisitationYearlyOverviewPatient = createAsyncThunk(
  "visitation/getVisitationYearlyOverviewPatient",
  async ({ id, year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/visitations/yearly/overview/patient/${id}?year=${year}`
      );
      console.log(response, "get visitation yearly overview patient slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  // get visitation today
  visitations: [],
  getVisitationStatus: "",
  getVisitationSuccessMessage: "",
  getVisitationErrorMessage: "",
  // create visitation
  createVisitationStatus: "",
  createVisitationSuccessMessage: "",
  createVisitationErrorMessage: "",
  // upate visitation
  updateVisitationStatus: "",
  updateVisitationSuccessMessage: "",
  updateVisitationErrorMessage: "",
  // detail visitation
  visitation: [],
  getDetailVisitationStatus: "",
  getDetailVisitationSuccessMessage: "",
  getDetailVisitationErrorMessage: "",
  // report
  reports: [],
  getVisitationReportStatus: "",
  getVisitationReportSuccessMessage: "",
  getVisitationReportErrorMessage: "",

  // get total visitation group by category (for home page admin card)
  totalVisitationGroupByCategory: [],
  getVisitationGroupByCategoryStatus: "",
  getVisitationGroupByCategoryErrorMessage: "",
  getTotalVisitationGroupByCategorySuccessMessage: "",

  // get visitation yeraly overview (for chart home page admin)
  visitationYearlyOverview: [],
  getVisitationYearlyOverviewStatus: "",
  getVisitationYearlyOverviewSuccessMessage: "",
  getVisitationYearlyOverviewErrorMessage: "",

  // get visitation old new patient comparasion  (for chart home page admin)
  visitationComparasion: [],
  getVisitationComparasionStatus: "",
  getVisitationComparasionSuccessMessage: "",
  getVisitationComparasionErrorMessage: "",

  // get visitation today overview (for card home page doctor)
  visitationTodayOverview: [],
  getVisitationTodayOverviewStatus: "",
  getVisiationTodayOverviewSuccessMessage: "",
  getVisitationTodayOverviewErrorMessage: "",

  // get total visitation (for card home page patient)
  totalVisitationPatient: [],
  getTotalVisitationPatientStatus: "",
  getTotalVisitationPatientSuccessMessage: "",
  getTotalVisitationPatientErrorMessage: "",

  // get visitation yearly overview (for chart home page patient)
  visitationYearlyOverviewPatient: [],
  getVisitationYearlyOverviewPatientStatus: "",
  getVisitationYearlyOverviewPatientSuccessMessage: "",
  getVisitationYearlyOverviewPatientErrorMessage: "",
};

const visitationSlice = createSlice({
  name: "visitation",
  initialState,
  reducers: {},
  extraReducers: {
    // get visitation
    [getVisitation.pending]: (state, action) => {
      state.getVisitationStatus = "loading";
    },
    [getVisitation.fulfilled]: (state, action) => {
      state.getVisitationStatus = "success";
      state.visitations = action.payload.data;
      state.visitation = [];
      state.getVisitationSuccessMessage = action.payload.message;
    },
    [getVisitation.rejected]: (state, action) => {
      state.getVisitationStatus = "rejected";
      state.getVisitationErrorMessage = "Network Error";
    },
    // create visitation
    [createVisitation.pending]: (state, action) => {
      state.createVisitationStatus = "loading";
    },
    [createVisitation.fulfilled]: (state, action) => {
      state.createVisitationStatus = "success";
      state.createVisitationSuccessMessage = action.payload;
    },
    [createVisitation.rejected]: (state, action) => {
      state.createVisitationStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.createVisitationErrorMessage =
          action.payload.response.data.message;
      } else {
        state.createVisitationErrorMessage = "Network Error";
      }
    },
    // update visitation
    [updateVisitation.pending]: (state, action) => {
      state.updateVisitationStatus = "loading";
    },
    [updateVisitation.fulfilled]: (state, action) => {
      state.updateVisitationStatus = "success";
      state.updateVisitationSuccessMessage = action.payload.message;
    },
    [updateVisitation.rejected]: (state, action) => {
      state.updateVisitationStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.updateVisitationErrorMessage =
          action.payload.response.data.message;
      } else {
        state.updateVisitationErrorMessage = "Network Error";
      }
    },
    // get detail visitation
    [getDetailVisitation.pending]: (state, action) => {
      state.getDetailVisitationStatus = "loading";
    },
    [getDetailVisitation.fulfilled]: (state, action) => {
      state.getDetailVisitationStatus = "success";
      state.visitation = action.payload.data;
      state.getDetailVisitationSuccessMessage = action.payload.message;
    },
    [getDetailVisitation.rejected]: (state, action) => {
      state.getDetailVisitationStatus = "rejected";
      state.getDetailVisitationErrorMessage = "Network Error";
    },
    // get report
    [getReport.pending]: (state, action) => {
      state.getVisitationReportStatus = "loading";
    },
    [getReport.fulfilled]: (state, action) => {
      state.getVisitationReportStatus = "success";
      state.reports = action.payload.data;
      state.getVisitationReportSuccessMessage = action.payload.message;
    },
    [getReport.rejected]: (state, action) => {
      state.getVisitationReportStatus = "rejected";
      state.getVisitationReportErrorMessage = "Network Error";
    },

    // get total visitation group by category (for home page admin card)
    [getTotalVisitationGroupByCategory.pending]: (state, action) => {
      state.getTotalVisitationGroupByCategoryStatus = "loading";
    },
    [getTotalVisitationGroupByCategory.fulfilled]: (state, action) => {
      state.getTotalVisitationGroupByCategoryStatus = "success";
      state.totalVisitationGroupByCategory = action.payload.data;
      state.getTotalVisitationGroupByCategorySuccessMessage =
        action.payload.message;
    },
    [getTotalVisitationGroupByCategory.rejected]: (state, action) => {
      state.getTotalVisitationGroupByCategoryStatus = "rejected";
      state.getTotalVisitationGroupByCategoryErrorMessage = "Network Error";
    },
    // get visitation yeraly overview (for chart home page admin)
    [getVisitationYearlyOverview.pending]: (state, action) => {
      state.getVisitationYearlyOverviewStatus = "loading";
    },
    [getVisitationYearlyOverview.fulfilled]: (state, action) => {
      state.getVisitationYearlyOverviewStatus = "success";
      state.visitationYearlyOverview = action.payload.data;
      state.getVisitationYearlyOverviewSuccessMessage = action.payload.message;
    },
    [getVisitationYearlyOverview.rejected]: (state, action) => {
      state.getVisitationYearlyOverviewStatus = "rejected";
      state.getVisitationYearlyOverviewErrorMessage = "Network Error";
    },

    // get visitation old new patient comparasion  (for chart home page admin)
    [getVisitationComparasion.pending]: (state, action) => {
      state.getVisitationComparasionStatus = "loading";
    },
    [getVisitationComparasion.fulfilled]: (state, action) => {
      state.getVisitationComparasionStatus = "success";
      state.visitationComparasion = action.payload.data;
      state.getVisitationComparasionSuccessMessage = action.payload.message;
    },
    [getVisitationComparasion.rejected]: (state, action) => {
      state.getVisitationComparasionStatus = "rejected";
      state.getVisitationComparasionErrorMessage = "Network Error";
    },

    // get visitation today overview (for card home page doctor)
    [getVisitationTodayOverview.pending]: (state, action) => {
      state.getVisitationTodayOverviewStatus = "loading";
    },
    [getVisitationTodayOverview.fulfilled]: (state, action) => {
      state.getVisitationTodayOverviewStatus = "success";
      state.visitationTodayOverview = action.payload.data;
      state.getVisiationTodayOverviewSuccessMessage = action.payload.message;
    },
    [getVisitationTodayOverview.rejected]: (state, action) => {
      state.getVisitationTodayOverviewStatus = "rejected";
      state.getVisitationTodayOverviewErrorMessage = "Network Error";
    },
    // get total visitation (for card home page patient)
    [getTotalVisitationPatient.pending]: (state, action) => {
      state.getTotalVisitationPatientStatus = "loading";
    },
    [getTotalVisitationPatient.fulfilled]: (state, action) => {
      state.getTotalVisitationPatientStatus = "success";
      state.totalVisitationPatient = action.payload.data;
      state.getTotalVisitationPatientSuccessMessage = action.payload.message;
    },
    [getTotalVisitationPatient.rejected]: (state, action) => {
      state.getTotalVisitationPatientStatus = "rejected";
      state.getTotalVisitationPatientErrorMessage = "Network Error";
    },

    // get visitation yearly overview (for chart home page patient)
    [getVisitationYearlyOverviewPatient.pending]: (state, action) => {
      state.getVisitationYearlyOverviewPatientStatus = "loading";
    },
    [getVisitationYearlyOverviewPatient.fulfilled]: (state, action) => {
      state.getVisitationYearlyOverviewPatientStatus = "success";
      state.visitationYearlyOverviewPatient = action.payload.data;
      state.getVisitationYearlyOverviewPatientSuccessMessage =
        action.payload.message;
    },
    [getVisitationYearlyOverviewPatient.rejected]: (state, action) => {
      state.getVisitationYearlyOverviewPatientStatus = "rejected";
      state.getVisitationYearlyOverviewPatientErrorMessage = "Network Error";
    },
  },
});

// get visitattion
export const visitations = (state) => state.visitation.visitations;
export const getVisitationStatus = (state) =>
  state.visitation.getVisitationStatus;
export const getVisitationErrorMessage = (state) =>
  state.visitation.getVisitationErrorMessage;
export const getVisitationSuccessMessage = (state) =>
  state.visitation.getVisitationSuccessMessage;

// create visitation
export const createVisitationStatus = (state) =>
  state.visitation.createVisitationStatus;
export const createVisitationErrorMessage = (state) =>
  state.visitation.createVisitationErrorMessage;
export const createVisitationSuccessMessage = (state) =>
  state.visitation.createVisitationSuccessMessage;

// update visitation
export const updateVisitationStatus = (state) =>
  state.visitation.updateVisitationStatus;
export const updateVisitationErrorMessage = (state) =>
  state.visitation.updateVisitationErrorMessage;
export const updateVisitationSuccessMessage = (state) =>
  state.visitation.updateVisitationSuccessMessage;

// get detail visitation
export const visitation = (state) => state.visitation.visitation;
export const getDetailVisitationStatus = (state) =>
  state.visitation.getDetailVisitationStatus;
export const getDetailVisitationErrorMessage = (state) =>
  state.visitation.getDetailVisitationErrorMessage;
export const getDetailVisitationSuccessMessage = (state) =>
  state.visitation.getDetailVisitationSuccessMessage;

// get report
export const reports = (state) => state.visitation.reports;
export const getVisitationReportStatus = (state) =>
  state.visitation.getVisitationReportStatus;
export const getVisitationReportErrorMessage = (state) =>
  state.visitation.getVisitationReportErrorMessage;
export const getVisitationReportSuccessMessage = (state) =>
  state.visitation.getVisitationReportSuccessMessage;

// get total visitation group by category (for home page admin card)
export const totalVisitationGroupByCategory = (state) =>
  state.visitation.totalVisitationGroupByCategory;
export const getTotalVisitationGroupByCategoryStatus = (state) =>
  state.visitation.getTotalVisitationGroupByCategoryStatus;
export const getTotalVisitationGroupByCategoryErrorMessage = (state) =>
  state.visitation.getTotalVisitationGroupByCategoryErrorMessage;
export const getTotalVisitationGroupByCategorySuccessMessage = (state) =>
  state.visitation.getTotalVisitationGroupByCategorySuccessMessage;

// get visitation yeraly overview (for chart admin)
export const visitationYearlyOverview = (state) =>
  state.visitation.visitationYearlyOverview;
export const getVisitationYearlyOverviewStatus = (state) =>
  state.visitation.getVisitationYearlyOverviewStatus;
export const getVisitationYearlyOverviewErrorMessage = (state) =>
  state.visitation.getVisitationYearlyOverviewErrorMessage;
export const getVisitationYearlyOverviewSuccessMessage = (state) =>
  state.visitation.getVisitationYearlyOverviewSuccessMessage;

// get visitation old new patient comparasion  (for chart home page admin)
export const visitationComparasion = (state) =>
  state.visitation.visitationComparasion;
export const getVisitationComparasionStatus = (state) =>
  state.visitation.getVisitationComparasionStatus;
export const getVisitationComparasionErrorMessage = (state) =>
  state.visitation.getVisitationComparasionErrorMessage;
export const getVisitationComparasionSuccessMessage = (state) =>
  state.visitation.getVisitationComparasionSuccessMessage;

// get overview visitation today
export const visitationTodayOverview = (state) =>
  state.visitation.visitationTodayOverview;
export const getVisitationTodayOverviewStatus = (state) =>
  state.visitation.getVisitationTodayOverviewStatus;
export const getVisiationTodayOverviewSuccessMessage = (state) =>
  state.visitation.getVisiationTodayOverviewSuccessMessage;
export const getVisitationTodayOverviewErrorMessage = (state) =>
  state.visitation.getVisitationTodayOverviewErrorMessage;

// get total visitation (for card home page patient)
export const totalVisitationPatient = (state) =>
  state.visitation.totalVisitationPatient;
export const getTotalVisitationPatientStatus = (state) =>
  state.visitation.getTotalVisitationPatientStatus;
export const getTotalVisitationPatientSuccessMessage = (state) =>
  state.visitation.getTotalVisitationPatientSuccessMessage;
export const getTotalVisitationPatientErrorMessage = (state) =>
  state.visitation.getTotalVisitationPatientErrorMessage;

// get visitation yearly overview (for chart home page patient)
export const visitationYearlyOverviewPatient = (state) =>
  state.visitation.visitationYearlyOverviewPatient;
export const getVisitationYearlyOverviewPatientStatus = (state) =>
  state.visitation.getVisitationYearlyOverviewPatientStatus;
export const getVisitationYearlyOverviewPatientErrorMessage = (state) =>
  state.visitation.getVisitationYearlyOverviewPatientErrorMessage;
export const getVisitationYearlyOverviewPatientSuccessMessage = (state) =>
  state.visitation.getVisitationYearlyOverviewPatientSuccessMessage;

export default visitationSlice.reducer;
