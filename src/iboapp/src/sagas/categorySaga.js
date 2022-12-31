import { call, put, takeEvery } from "redux-saga/effects";
import {} from "../actionTypes";
import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_REQUEST,
  EDIT_CATEGORY_REQUEST,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
} from "../actionTypes/categoryActions";
import api from "../api";

export function* fetchCategories() {
  try {
    const response = yield call(api.getCategories);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not fetch clients");
    }
    const categories = api.getData(response);
    yield put({ type: FETCH_CATEGORY_SUCCESS, payload: categories });
  } catch (e) {
    console.error(e);
  }
}

function* addCategory(action) {
  try {
    const response = yield call(api.addCategory, action.payload);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not add clients");
    }
    const category = api.getData(response);
    yield put({
      type: ADD_CATEGORY_SUCCESS,
      payload: category,
    });
    yield call(fetchCategories);
  } catch (e) {
    console.error(e);
  }
}

function* editCategory(action) {
  try {
    const response = yield call(api.editCategory, action.payload);
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not edit client");
    }
    yield call(fetchCategories);
  } catch (error) {
    console.error(error);
  }
}

function* deleteCategory(action) {
  try {
    const response = yield call(api.deleteCategory, { id: action.payload });
    if (api.getResponseCode(response) >= 400) {
      throw new Error("Could not delete client");
    }
    yield call(fetchCategories);
  } catch (error) {
    console.error(error);
  }
}

const categorySaga = [
  takeEvery(FETCH_CATEGORY_REQUEST, fetchCategories),
  takeEvery(ADD_CATEGORY_REQUEST, addCategory),
  takeEvery(DELETE_CATEGORY_REQUEST, deleteCategory),
  takeEvery(EDIT_CATEGORY_REQUEST, editCategory),
];

export default categorySaga;
