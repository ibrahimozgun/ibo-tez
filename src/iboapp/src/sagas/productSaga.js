import { call, put, takeEvery } from "redux-saga/effects";
import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  EDIT_PRODUCT_REQUEST,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  SELL_PRODUCT_REQUEST,
} from "../actionTypes";
import api from "../api";
import { fetchClients } from "./clientSaga";
import { fetchTransactions } from "./transactionSaga";
export function* fetchProducts() {
  try {
    const response = yield call(api.getProducts);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not fetch products");
    }
    const products = api.getData(response);
    yield put({ type: FETCH_PRODUCT_SUCCESS, payload: products });
  } catch (e) {
    console.error(e);
  }
}

function* addProduct(action) {
  try {
    const response = yield call(api.addProduct, action.payload);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not add product");
    }
    const product = api.getData(response);
    yield put({
      type: ADD_PRODUCT_SUCCESS,
      payload: product,
    });
    yield call(fetchProducts);
  } catch (e) {
    console.error(e);
  }
}

function* editProduct(action) {
  try {
    const response = yield call(api.editProduct, action.payload);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not edit product");
    }
    yield call(fetchProducts);
  } catch (error) {
    console.error(error);
  }
}

function* deleteProduct(action) {
  try {
    const response = yield call(api.deleteProduct, { id: action.payload });
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not delete product");
    }
    yield call(fetchProducts);
  } catch (error) {
    console.error(error);
  }
}

function* sellProduct(action) {
  try {
    const response = yield call(api.sellProduct, action.payload);
    console.log("response: ", response);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not sell product");
    }
    yield call(fetchProducts);
    yield call(fetchTransactions);
    yield call(fetchClients);
  } catch (error) {}
}

const productSaga = [
  takeEvery(FETCH_PRODUCT_REQUEST, fetchProducts),
  takeEvery(ADD_PRODUCT_REQUEST, addProduct),
  takeEvery(DELETE_PRODUCT_REQUEST, deleteProduct),
  takeEvery(EDIT_PRODUCT_REQUEST, editProduct),
  takeEvery(SELL_PRODUCT_REQUEST, sellProduct),
];

export default productSaga;
