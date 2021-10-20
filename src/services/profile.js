import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;

export const getUserProfile = ({ userId, sessionId }) => {
    return axios.post(`/users/${userId}/profile`,
        {
            session_id: sessionId
        }).then(response => response)
};



