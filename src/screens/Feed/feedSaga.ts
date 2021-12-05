import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllPostsFromFirebase } from "../../api/postFireBase";
import { feedActions } from "./feedSlice";




function* getPostsFeed() {
    try {
        const response: any[] = yield call(getAllPostsFromFirebase);
        yield put(feedActions.getPostsFeedSuccess(response));
    } catch (error) {
        yield put(feedActions.getPostsFeedFailure());
    }
}


export function* feedSaga() {
  yield takeLatest(feedActions.getPostsFeed, getPostsFeed);
}
