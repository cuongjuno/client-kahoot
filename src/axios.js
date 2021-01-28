import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://kahoott.herokuapp.com/api/v1",
    // baseURL: 'http://localhost:5000/api/v1',
});

export default axiosInstance;
