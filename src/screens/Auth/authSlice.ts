import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthState {
  user: any;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: String; password: String }>
    ) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state) => {
      console.log("loginFailure");
      state.loading = false;
    },
    register: (
      state,
      action: PayloadAction<{ email: String; password: String }>
    ) => {
      state.loading = true;
    },
    registerSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loading = false;
    },
    registerFailure: (state) => {
      console.log("registerFailure");
      state.loading = false;
    },
    getUser: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loading = false;
    },
    getUserFailure: (state) => {
      state.loading = false;
    },
    changeImage: (state, action: PayloadAction<any>) => {
      state.loading = false;
    },
    changeImageSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loading = false;
    },
    changeImageFailure: (state) => {
      state.loading = false;
    },
    saveUser: (state, action: PayloadAction<{field: string, value: any}>) => {
      state.loading = true;
    },
    saveUserSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loading = false;
    },
    saveUserFailure: (state) => {
      state.loading = false;
    },
  },
});

//Actions
export const authActions = authSlice.actions;
// selectors
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
// reducer
const authReducer = authSlice.reducer;
export default authReducer;
