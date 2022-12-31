import { call, put, takeEvery } from "redux-saga/effects";
import {
  ADD_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
} from "../actionTypes";
import api from "../api";
import { getData } from "../api/utils";

function* loginUser({ payload }) {
  try {
    const isCredentialsCorrect = yield call(api.loginUser, payload);
    const user = getData(isCredentialsCorrect);
    if (Array.isArray(user) && user.length === 1) {
      yield put({ type: LOGIN_USER_SUCCESS, payload: { user: user[0] } });
      sessionStorage.setItem("ia-user", JSON.stringify(user[0]));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addUser({ payload }) {
  try {
    const user = yield call(api.addUser, payload);
    if (getData(user)?.email) {
      yield put({ type: LOGIN_USER_SUCCESS, payload: { user: getData(user) } });
      sessionStorage.setItem("ia-user", JSON.stringify(getData(user)));
    }
  } catch (error) {
    console.error(error);
  }
}

const userSaga = [
  takeEvery(ADD_USER_REQUEST, addUser),
  takeEvery(LOGIN_USER_REQUEST, loginUser),
];

export default userSaga;
