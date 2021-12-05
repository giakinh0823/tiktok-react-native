import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface FeedState {
  list: any[] | null;
  loading: boolean;
}

const initialState: FeedState = {
  list: [],
  loading: false,
};

const feedSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    getPostsFeed: (state) => {
        state.loading = true;
    },
    getPostsFeedSuccess: (state, action: PayloadAction<any[]>) => {
        state.list = action.payload;
        state.loading = false;
    },
    getPostsFeedFailure: (state) => {
        state.loading = false;
    },
  },
});

//Actions
export const feedActions = feedSlice.actions;
// selectors
export const selectFeedList = (state: RootState) => state.feed.list;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
// reducer
const feedReducer = feedSlice.reducer;
export default feedReducer;
