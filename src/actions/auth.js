// action types and creators for authentication
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const loginAction = (user) => {
  return {
    type: LOGIN,
    user,
  };
};
