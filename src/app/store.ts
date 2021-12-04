import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../screens/Auth/authSlice';
import postReducer from '../screens/SavePost/postSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const rootReducer =  combineReducers({
  auth: authReducer,
  post: postReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga) //saga middleware chạy rootSaga 

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;