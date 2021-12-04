import { all } from 'redux-saga/effects';
import { authSaga } from '../screens/Auth/authSaga';
import { postSaga } from '../screens/SavePost/postSaga';

export default function* rootSaga() {
    yield all([authSaga(), postSaga()]);
}