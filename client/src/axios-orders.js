import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://more-recipe-7be1e.firebaseio.com/'
})

export default instance;
