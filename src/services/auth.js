import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;

export const userLogin = (user) => {
    return axios.post("/users/login",
        {
            email: user.email,
            password: user.password
        }).then(response => response)
};

export const changePassword = (auth, data) => {
    return axios.put(`/users/${auth.userId}/password`,
        {
            session_id: auth.sessionId,
            password: data.password,
            new_password: data.newPassword
        }).then(response => response)
};

export const userLogOut = (auth, data) => {
    return axios.post(`/users/${auth.userId}/logout`,
        {
            session_id: auth.sessionId,
        }).then(response => response)
};


