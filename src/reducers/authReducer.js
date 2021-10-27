import { LOGIN, LOGOUT, STATUS } from "actions/auth";

// auth reducer
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return {};
    case STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export default authReducer;
