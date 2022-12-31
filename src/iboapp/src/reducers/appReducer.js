import { INIT_APP_SUCCESS } from "../actionTypes";

const INITIAL_STATE = {
  isReady: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_APP_SUCCESS:
      return {
        ...state,
        isReady: action.payload.isReady,
      };
    default:
      return state;
  }
};
