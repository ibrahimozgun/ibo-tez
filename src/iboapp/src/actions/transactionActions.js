import { ADD_TRANSACTION_REQUEST, DELETE_TRANSACTION_REQUEST, FETCH_TRANSACTION_REQUEST, EDIT_TRANSACTION_REQUEST } from "../actionTypes";

export const fetchTransactionRequest = payload => ({
  type: FETCH_TRANSACTION_REQUEST
});

export const addTransactionRequest = payload => ({
  type: ADD_TRANSACTION_REQUEST,
  payload
});

export const editTransactionRequest = payload => ({
  type: EDIT_TRANSACTION_REQUEST,
  payload
});

export const deleteTransactionRequest = payload => ({
  type: DELETE_TRANSACTION_REQUEST,
  payload
});
