import { ADD_CLIENT_SUCCESS, FETCH_CLIENT_SUCCESS } from "../actionTypes";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CLIENT_SUCCESS:
      return action.payload;
    case ADD_CLIENT_SUCCESS:
      state.push(action.payload);
      return state;
    default:
      return state;
  }
};
