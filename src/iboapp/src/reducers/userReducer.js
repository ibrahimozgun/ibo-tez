import { ADD_USER_SUCCESS, LOGIN_USER_SUCCESS } from "../actionTypes";

const INITIAL_STATE = {
  fullName: "",
  email: "",
  password: "",
  status: "",
  activity: "",
  createdDate: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_USER_SUCCESS:
      return {
        ...state,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...action.payload.user,
      };
    default:
      return state;
  }
};
