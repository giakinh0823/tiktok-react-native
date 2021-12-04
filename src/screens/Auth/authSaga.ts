import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { loginFirebase, registerFirebase } from "../../api/authFireBase";
import { saveUserToFirebase } from "../../api/userFireBase";
import { authActions } from "./authSlice";

function* login(action: PayloadAction<{ email: string; password: string }>) {
  try {
    const data: any[] = yield call(loginFirebase, action.payload);
    yield put(authActions.loginSuccess(data));
  } catch (error) {
    yield put(authActions.loginFailure());
  }
}

function* register(action: PayloadAction<{ email: string; password: string }>) {
  try {
    const data: any[] = yield call(registerFirebase, action.payload);
    yield put(authActions.registerSuccess(data));
  } catch (error) {
    yield put(authActions.registerFailure());
  }
}

export async function getUserFromStorange(): Promise<any> {
  const user = await AsyncStorage.getItem("user");
  const result = JSON.parse(user ?? "");
  return result;
}

function* getUser() {
  try {
    const data: any[] = yield call(getUserFromStorange);
    // console.log(data)
    yield put(authActions.getUserSuccess(data));
  } catch (error) {
    yield put(authActions.getUserFailure());
  }
}
 
function* changeImage(action: PayloadAction<any>) {
  try {
    const data: any[] = yield call(saveUserToFirebase, action.payload);
    yield put(authActions.changeImageSuccess(data));
  } catch (error) {
    yield put(authActions.changeImageFailure());
  }
}

export function* authSaga() {
  yield takeLatest(authActions.login.type, login);
  yield takeLatest(authActions.register.type, register);
  yield takeLatest(authActions.getUser.type, getUser);
  yield takeLatest(authActions.changeImage.type, changeImage);
}
