import { PayloadAction } from "@reduxjs/toolkit";
import "firebase/auth";
import { call, put, takeEvery } from "redux-saga/effects";
import { createPost, getPostsFromFirebase } from '../../api/postFireBase';
import { postActions } from "./postSlice";


function* savePost(
  action: PayloadAction<{
    source: any;
    sourceThumb: any;
    description: String;
    userId: String;
  }>
) {
  const { source, sourceThumb, description, userId } = action.payload;
  try {
    const post: any[] = yield call(createPost, {
      source,
      sourceThumb,
      description,
      userId,
    });
    console.log(post);
    yield put(postActions.savePostSuccess(post));
  } catch (e) {
    yield put(postActions.savePostFailure());
    console.error("Error adding document: ", e);
  }
}

function* getPosts() {
  try {
    const posts: any[] = yield call(getPostsFromFirebase);
    yield put(postActions.getPostsSuccess(posts));
  } catch (e) {
    yield put(postActions.getPostsFailure());
    console.error("Error getting documents: ", e);
  }
}

export function* postSaga() {
  yield takeEvery(postActions.savePost.type, savePost);
  yield takeEvery(postActions.getPosts.type, getPosts);
}
