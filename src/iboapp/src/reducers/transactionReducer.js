import {
  ADD_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_SUCCESS,
} from "../actionTypes";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRANSACTION_SUCCESS:
      return action.payload;
    case ADD_TRANSACTION_SUCCESS:
      state.push(action.payload);
      return state;
    default:
      return state;
  }
};
