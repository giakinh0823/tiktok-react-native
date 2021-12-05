import { all } from 'redux-saga/effects';
import { authSaga } from '../screens/Auth/authSaga';
import { postSaga } from '../screens/SavePost/postSaga';
import { searchSaga } from '../screens/Search/searchSaga';

export default function* rootSaga() {
    yield all([authSaga(), postSaga(), searchSaga()]);
}