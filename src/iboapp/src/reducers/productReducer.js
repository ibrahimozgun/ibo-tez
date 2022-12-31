import { ADD_PRODUCT_SUCCESS, FETCH_PRODUCT_SUCCESS } from "../actionTypes";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return action.payload;
    case ADD_PRODUCT_SUCCESS:
      state.push(action.payload);
      return state;
    default:
      return state;
  }
};
