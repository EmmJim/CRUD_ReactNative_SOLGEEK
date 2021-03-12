import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://evening-scrubland-79852.herokuapp.com/'
});


export default clienteAxios;
