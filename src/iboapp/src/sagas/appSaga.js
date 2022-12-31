import { call, put, takeEvery } from "redux-saga/effects";
import {
  INIT_APP_REQUEST,
  INIT_APP_SUCCESS,
  LOGIN_USER_SUCCESS,
} from "../actionTypes";
import api from "../api";
import { fetchCategories } from "./categorySaga";
import { fetchClients } from "./clientSaga";
import { fetchProducts } from "./productSaga";
import { fetchTransactions } from "./transactionSaga";

function* initApp() {
  try {
    // is any user login??
    let user = null;
    const pathName = window.location.pathname;
    const hasUser = sessionStorage.getItem("ia-user");
    if (hasUser && hasUser !== "shouldLogin") {
      user = JSON.parse(hasUser);
      yield put({ type: LOGIN_USER_SUCCESS, payload: { user } });
    } else if (
      (!hasUser || hasUser === "shouldLogin") &&
      pathName !== "/giris"
    ) {
      sessionStorage.setItem("ia-user", "shouldLogin");
      window.location.href = "/giris";
      return;
    }
    const response = yield call(api.getClients);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not fetch clients");
    }

    yield call(fetchClients);
    yield call(fetchCategories);
    yield call(fetchProducts);
    yield call(fetchTransactions);

    yield put({ type: INIT_APP_SUCCESS, payload: { isReady: true } });
  } catch (e) {
    console.error(e);
  }
}

const appSaga = [takeEvery(INIT_APP_REQUEST, initApp)];

export default appSaga;
