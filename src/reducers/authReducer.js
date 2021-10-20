import { LOGIN, LOGOUT } from "actions/auth";

// auth reducer
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        auth: action.user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        auth: action.user,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default authReducer;
