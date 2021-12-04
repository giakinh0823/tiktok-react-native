import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface PostState {
  list: any[] | null;
  loading: boolean;
}

const initialState: PostState = {
  list: [],
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    getPosts: (state) => {
        state.loading = true;
    },
    getPostsSuccess: (state, action: PayloadAction<any[]>) => {
        state.list = action.payload;
        state.loading = false;
    },
    getPostsFailure: (state) => {
        state.loading = false;
    },
    savePost: (state, action: PayloadAction<{ source: any, sourceThumb: any,description: String, userId: String }>) => {
      state.loading = true;
    },
    savePostSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
    },
    savePostFailure: (state) => {
      state.loading = false;
    },
  },
});

//Actions
export const postActions = postSlice.actions;
// selectors
export const selectPostList = (state: RootState) => state.post.list;
export const selectPostLoading = (state: RootState) => state.post.loading;
// reducer
const postReducer = postSlice.reducer;
export default postReducer;
