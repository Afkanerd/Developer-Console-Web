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



