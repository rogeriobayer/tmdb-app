import axios from 'axios';

// Insira aqui sua api_key
const apiKey = '98b46d333847aa11229387bd898266e1';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params:{
    api_key: apiKey,
    include_adult: false
  }
});
