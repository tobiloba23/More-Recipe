import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v2/'
});

export default instance;
