import { ADD_USER_REQUEST, LOGIN_USER_REQUEST } from "../actionTypes";

export const loginUser = payload => ({
  type: LOGIN_USER_REQUEST,
  payload
});

export const addUser = payload => ({
  type: ADD_USER_REQUEST,
  payload
});
