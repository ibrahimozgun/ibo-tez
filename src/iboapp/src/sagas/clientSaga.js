import { call, put, takeEvery } from "redux-saga/effects";
import {
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  DELETE_CLIENT_REQUEST,
  EDIT_CLIENT_REQUEST,
  FETCH_CLIENT_REQUEST,
  FETCH_CLIENT_SUCCESS,
} from "../actionTypes";
import api from "../api";

export function* fetchClients() {
  try {
    const response = yield call(api.getClients);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not fetch clients");
    }
    const clients = api.getData(response);
    yield put({ type: FETCH_CLIENT_SUCCESS, payload: clients });
  } catch (e) {
    console.error(e);
  }
}

function* addClient(action) {
  try {
    const response = yield call(api.addClient, action.payload);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not add clients");
    }
    const client = api.getData(response);
    yield put({ type: ADD_CLIENT_SUCCESS, payload: client });
    yield call(fetchClients);
  } catch (e) {
    console.error(e);
  }
}

function* editClient(action) {
  try {
    const response = yield call(api.editClient, action.payload);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not edit client");
    }
    yield call(fetchClients);
  } catch (error) {
    console.error(error);
  }
}

function* deleteClient(action) {
  try {
    const response = yield call(api.deleteClient, { id: action.payload });
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not delete client");
    }
    yield call(fetchClients);
  } catch (error) {
    console.error(error);
  }
}

const clientSaga = [
  takeEvery(FETCH_CLIENT_REQUEST, fetchClients),
  takeEvery(ADD_CLIENT_REQUEST, addClient),
  takeEvery(DELETE_CLIENT_REQUEST, deleteClient),
  takeEvery(EDIT_CLIENT_REQUEST, editClient),
];

export default clientSaga;
