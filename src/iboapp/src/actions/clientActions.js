import { ADD_CLIENT_REQUEST, DELETE_CLIENT_REQUEST, FETCH_CLIENT_REQUEST, EDIT_CLIENT_REQUEST } from "../actionTypes";

export const fetchClientRequest = payload => ({
  type: FETCH_CLIENT_REQUEST
});

export const addClientRequest = payload => ({
  type: ADD_CLIENT_REQUEST,
  payload
});

export const editClientRequest = payload => ({
  type: EDIT_CLIENT_REQUEST,
  payload
});

export const deleteClientRequest = payload => ({
  type: DELETE_CLIENT_REQUEST,
  payload
});
