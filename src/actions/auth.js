// action types and creators for authentication
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const STATUS = "STATUS";

export const loginAction = (user) => {
  return {
    type: LOGIN,
    user,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export const statustAction = (status) => {
  return {
    type: STATUS,
    status,
  };
};
