import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../API";
import axios from "axios";
import { showErrorModal } from "./error";

const initialState = {
  loading: false,
  loggedInUser: {
    AllchatID: [],
  },
};

export const loginUser = createAsyncThunk("api/login", async (data, thunkAPI) => {
  try{
    const res = await axios.post("http://localhost:5000" + api.loginApi, {
    email: data.email,
    password: data.password,
  });
  data.setShowLogin(false);
  return { res };
  }catch(error){
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    thunkAPI.dispatch(showErrorModal({message}))
    return thunkAPI.rejectWithValue({error, dispatch: data.dispatch, showErrorModal: data.showErrorModal})
  }
});

export const updateUser = createAsyncThunk("/api/updateUser", async (data, {rejectWithValue}) => {
  try {
    const res = axios.post("http://localhost:5000/api/updateUser", { data });
    console.log(res);
    return res;
  } catch(error) {
        console.log(error);
        return rejectWithValue(error.response)
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("userData");
      state.loggedInUser = initialState.loggedInUser;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload.res.data;
      localStorage.setItem("userData", JSON.stringify(action.payload.res.data));
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loggedInUser = action.payload.data.user;
      state.loading = false;
    },
  },
});

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
