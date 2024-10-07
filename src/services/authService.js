import axios from 'axios';

const register = async (apiUrl, userData) => {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response.data;
};

const login = async (apiUrl, credentials) => {
    const response = await axios.post(`${apiUrl}/login`, credentials);
    return response.data;
};

export default { register, login };
