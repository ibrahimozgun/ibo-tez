import { all } from 'redux-saga/effects';
import appSaga from './appSaga';
import userSaga from './userSaga';
import clientSaga from './clientSaga';
import categorySaga from './categorySaga';
import productSaga from './productSaga';
import transactionSaga from './transactionSaga';

export default function* rootSaga() {
  yield all([
    ...userSaga,
    ...appSaga,
    ...clientSaga,
    ...categorySaga,
    ...productSaga,
    ...transactionSaga,
  ]);
}