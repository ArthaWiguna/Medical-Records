import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// login
export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/users/login`,
        data
      );
      console.log(response, "login slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get user
export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async ({ params }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users?params=${params}`
      );
      console.log(response, "get all user slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// create user
export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3001/users`, data);
      console.log(response, "create user slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// update user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id);
    console.log(data);
    try {
      const response = await axios.patch(
        `http://localhost:3001/users/${id}`,
        data
      );
      console.log(response, "update user slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// get detail user
export const getDetailUser = createAsyncThunk(
  "user/getDetailUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      console.log(response, "get detail user slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// account setting
export const accountSetting = createAsyncThunk(
  "user/accountSetting",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id);
    console.log(data);
    try {
      const response = await axios.patch(
        `http://localhost:3001/users/account/setting/${id}`,
        data
      );
      console.log(response, "account setting user slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  // login
  userLogged: [],
  loginStatus: "",
  loginErrorMessage: "",
  loginSuccessMessage: "",
  // users
  user: [],
  getUserStatus: "",
  getUserErrorMessage: "",
  getUserSuccessMessage: "",
  //create user
  createUserStatus: "",
  createUserErrorMessage: "",
  createUserSuccessMessage: "",
  // update user
  updateUserStatus: "",
  updateUserErrorMessage: "",
  updateUserSuccessMessage: "",

  // get detail user
  detailUser: [],
  getDetailUserStatus: "",
  getDetailUserErrorMessage: "",
  getDetailUserSuccessMessage: "",

  // setting account
  account: [],
  accountSettingStatus: "",
  accountSettingSuccessMessage: "",
  accountSettingErrorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // login
    [login.pending]: (state, action) => {
      state.loginStatus = "loading";
      console.log(state.loginStatus);
    },
    [login.fulfilled]: (state, action) => {
      state.loginStatus = "success";
      state.userLogged = action.payload.data.user;
      state.loginSuccessMessage = action.payload.message;
      localStorage.setItem(
        "user",
        JSON.stringify({
          id_user: action.payload.data.user.id_user,
          name: action.payload.data.user.name,
          username: action.payload.data.user.username,
          level: action.payload.data.user.level,
          image: action.payload.data.user.image,
        })
      );
      console.log(state.loginStatus);
    },
    [login.rejected]: (state, action) => {
      state.loginStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.loginErrorMessage = action.payload.response.data.error;
      } else {
        state.loginErrorMessage = "Network Error";
      }
    },
    // get all users
    [getAllUser.pending]: (state, action) => {
      state.getUserStatus = "loading";
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.getUserStatus = "success";
      state.user = action.payload.data;
      state.detailUser = [];
    },
    [getAllUser.rejected]: (state, action) => {
      state.getUserStatus = "rejected";
      state.getUserErrorMessage = "Network Error";
    },
    // create user
    [createUser.pending]: (state, action) => {
      state.createUserStatus = "loading";
    },
    [createUser.fulfilled]: (state, action) => {
      state.createUserStatus = "success";
      state.createUserSuccessMessage = action.payload;
    },
    [createUser.rejected]: (state, action) => {
      state.createUserStatus = "rejected";
      if (action.payload.response && action.payload.response.status === 400) {
        state.createUserErrorMessage = action.payload.response.data.message;
      } else {
        state.createUserErrorMessage = "Network Error";
      }
      console.log("error create user", state.createUserErrorMessage);
    },

    // update user
    [updateUser.pending]: (state, action) => {
      state.updateUserStatus = "loading";
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateUserStatus = "success";
      state.updateUserSuccessMessage = action.payload.message;
    },
    [updateUser.rejected]: (state, action) => {
      state.updateUserStatus = "rejected";
      state.updateUserErrorMessage = "Network Error";
    },

    // get detail user
    [getDetailUser.pending]: (state, action) => {
      state.getDetailUserStatus = "loading";
    },
    [getDetailUser.fulfilled]: (state, action) => {
      state.getDetailUserStatus = "success";
      state.detailUser = action.payload.data;
      state.getDetailUserSuccessMessage = action.payload.message;
    },
    [getDetailUser.rejected]: (state, action) => {
      state.getDetailUserStatus = "rejected";
      state.getDetailUserErrorMessage = "Network Error";
    },

    // account setting
    [accountSetting.pending]: (state, action) => {
      state.accountSettingStatus = "loading";
    },
    [accountSetting.fulfilled]: (state, action) => {
      state.accountSettingStatus = "success";
      state.account = action.payload.data;
      state.accountSettingSuccessMessage = action.payload.message;
      console.log(state.account, "INI");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id_user: action.payload.data.id_user,
          name: action.payload.data.name,
          username: action.payload.data.username,
          level: action.payload.data.level,
          image: action.payload.data.image,
        })
      );
    },
    [accountSetting.rejected]: (state, action) => {
      state.accountSettingStatus = "rejected";
      console.log(action.payload);
      if (action.payload.response && action.payload.response.status === 400) {
        state.accountSettingErrorMessage = action.payload.response.data.message;
      } else {
        state.accountSettingErrorMessage = "Network Error";
      }
    },
  },
});

// login
export const getUserLogged = (state) => state.user.userLogged;
export const getLoginStatus = (state) => state.user.loginStatus;
export const getLoginErrorMessage = (state) => state.user.loginErrorMessage;
export const getLoginSuccessMessage = (state) => state.user.loginSuccessMessage;
// get all users
export const getUsers = (state) => state.user.user;
export const getUserStatus = (state) => state.user.getUserStatus;
export const getUserErrorMessage = (state) => state.user.getUserErrorMessage;
export const getUserSuccesMessage = (state) => state.user.getUserSuccessMessage;
// create user
export const getCreateUserStatus = (state) => state.user.createUserStatus;
export const getCreateUserErrorMessage = (state) =>
  state.user.createUserErrorMessage;
export const getCreateUserSuccessMessage = (state) =>
  state.user.createUserSuccessMessage;
// update user
export const getUpdateUserStatus = (state) => state.user.updateUserStatus;
export const getUpdateUserErrorMessage = (state) =>
  state.user.updateUserErrorMessage;
export const getUpdateUserSuccessMessage = (state) =>
  state.user.updateUserSuccessMessage;
// get detail user
export const detailUser = (state) => state.user.detailUser;
export const getDetailUserStatus = (state) => state.user.getDetailUserStatus;
export const getDetailUserErrorMessage = (state) =>
  state.user.getDetailUserErrorMessage;
export const getDetailUserSuccessMessage = (state) =>
  state.user.getDetailUserSuccessMessage;

// account setting
export const account = (state) => state.user.account;
export const getAccountSettingStatus = (state) =>
  state.user.accountSettingStatus;
export const getAccountSettingErrorMessage = (state) =>
  state.user.accountSettingErrorMessage;
export const getAccountSettingSuccessMessage = (state) =>
  state.user.accountSettingSuccessMessage;

export default userSlice.reducer;
