import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


const instance = axios.create( {

    baseURL: 'http://localhost:4000'
});

// instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN_PREV';
// instance.defaults.headers.post['Content_Type'] = 'application/json';

//Request interceptor
instance.interceptors.request.use( (request: AxiosRequestConfig) => {
    
    //console.log("Axios Request Interceptor:",request);
    return request;
}, error => {

    console.log(error);
    return error;
});

//Response interceptor
instance.interceptors.response.use( (response: AxiosResponse) => {

    //console.log("Axios Response Interceptor:",response);
    return response;
}, error => {

    console.log(error);
    return error;
});

export default instance;