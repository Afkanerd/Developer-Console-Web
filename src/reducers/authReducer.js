import { LOGIN, LOGOUT } from "actions/auth";

// auth reducer
const authReducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        auth: action.payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        auth: action.payload,
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
