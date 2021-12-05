import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put } from 'redux-saga/effects';
import { getListUserFromFirebase } from '../../api/userFireBase';
import { searchActions } from "./searchSlice";


function* searchUser(action: PayloadAction<any>) {
    try {
        const data: any[] = yield call(getListUserFromFirebase, action.payload);
        yield put(searchActions.getListUserSuccess(data));
    } catch (error) {
        yield put(searchActions.getListUserFailed());
    }
}


export function* searchSaga() {
  yield debounce(500,searchActions.getListUser.type, searchUser);
}