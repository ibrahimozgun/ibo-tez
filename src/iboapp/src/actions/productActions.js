import { ADD_PRODUCT_REQUEST, DELETE_PRODUCT_REQUEST, FETCH_PRODUCT_REQUEST, EDIT_PRODUCT_REQUEST, SELL_PRODUCT_REQUEST } from "../actionTypes";

export const fetchProductRequest = payload => ({
  type: FETCH_PRODUCT_REQUEST
});

export const addProductRequest = payload => ({
  type: ADD_PRODUCT_REQUEST,
  payload
});

export const editProductRequest = payload => ({
  type: EDIT_PRODUCT_REQUEST,
  payload
});

export const deleteProductRequest = payload => ({
  type: DELETE_PRODUCT_REQUEST,
  payload
});

export const sellProductRequest = payload => ({
  type: SELL_PRODUCT_REQUEST,
  payload
});