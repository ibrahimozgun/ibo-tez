import { ADD_CATEGORY_SUCCESS, FETCH_CATEGORY_SUCCESS } from "../actionTypes";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_SUCCESS:
      return action.payload;
    case ADD_CATEGORY_SUCCESS:
      state.push(action.payload);
      return state;
    default:
      return state;
  }
};
