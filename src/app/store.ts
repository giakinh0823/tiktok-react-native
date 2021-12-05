import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../screens/Auth/authSlice';
import feedReducer from '../screens/Feed/feedSlice';
import postReducer from '../screens/SavePost/postSlice';
import searchReducer from '../screens/Search/searchSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const rootReducer =  combineReducers({
  auth: authReducer,
  post: postReducer,
  search: searchReducer,
  feed: feedReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga) //saga middleware chạy rootSaga 

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;