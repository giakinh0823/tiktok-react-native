import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface searchState {
  list: any[];
  loading: boolean;
}

const initialState: searchState = {
  list: [],
  loading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    getListUser: (state, action: PayloadAction<{field: string, value: any}>) => {
      state.loading = true;
    },
    getListUserSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.list = action.payload;
    },
    getListUserFailed: (state) => {
      state.loading = false;
    },
  },
});

//Actions
export const searchActions = searchSlice.actions;
// selectors
export const selectSearchListUser = (state: RootState) => state.search.list;
export const selectSearchLoading = (state: RootState) => state.search.loading;
// reducer
const searchReducer = searchSlice.reducer;
export default searchReducer;
