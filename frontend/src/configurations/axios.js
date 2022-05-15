import axios from "axios";
import config from './configuration';

const instance = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Authorization': localStorage.getItem("JWT")
    }
});



export default instance;
export const excelInstance = axios.create({
    baseURL: config.baseURL,
    method: 'GET',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Authorization': localStorage.getItem("JWT")
    },
    responseType: 'blob', // Important
  });