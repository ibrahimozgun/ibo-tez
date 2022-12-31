import { call, put, takeEvery } from "redux-saga/effects";
import {} from "../actionTypes";
import {
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_REQUEST,
  EDIT_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
} from "../actionTypes/transactionActions";
import api from "../api";

export function* fetchTransactions() {
  try {
    const response = yield call(api.getTransactions);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not fetch clients");
    }
    const transactions = api.getData(response);
    yield put({ type: FETCH_TRANSACTION_SUCCESS, payload: transactions });
  } catch (e) {
    console.error(e);
  }
}

function* addTransaction(action) {
  try {
    const response = yield call(api.addTransaction, action.payload);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not add clients");
    }
    const transaction = api.getData(response);
    yield put({
      type: ADD_TRANSACTION_SUCCESS,
      payload: transaction,
    });
    yield call(fetchTransactions);
  } catch (e) {
    console.error(e);
  }
}

function* editTransaction(action) {
  try {
    const response = yield call(api.editTransaction, action.payload);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not edit client");
    }
    yield call(fetchTransactions);
  } catch (error) {
    console.error(error);
  }
}

function* deleteTransaction(action) {
  try {
    const response = yield call(api.deleteTransaction, { id: action.payload });
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not delete client");
    }
    yield call(fetchTransactions);
  } catch (error) {
    console.error(error);
  }
}

const transactionSaga = [
  takeEvery(FETCH_TRANSACTION_REQUEST, fetchTransactions),
  takeEvery(ADD_TRANSACTION_REQUEST, addTransaction),
  takeEvery(DELETE_TRANSACTION_REQUEST, deleteTransaction),
  takeEvery(EDIT_TRANSACTION_REQUEST, editTransaction),
];

export default transactionSaga;
