import { ADD_CATEGORY_REQUEST, DELETE_CATEGORY_REQUEST, FETCH_CATEGORY_REQUEST, EDIT_CATEGORY_REQUEST } from "../actionTypes";

export const fetchCategoryRequest = payload => ({
  type: FETCH_CATEGORY_REQUEST
});

export const addCategoryRequest = payload => ({
  type: ADD_CATEGORY_REQUEST,
  payload
});

export const editCategoryRequest = payload => ({
  type: EDIT_CATEGORY_REQUEST,
  payload
});

export const deleteCategoryRequest = payload => ({
  type: DELETE_CATEGORY_REQUEST,
  payload
});
