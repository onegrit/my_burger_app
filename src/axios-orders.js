import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-app-6aa64.firebaseio.com'
});

export default instance;