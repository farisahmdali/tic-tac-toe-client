import axios from 'axios'
import cookie from "js-cookie"

const instance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_BASE_URL+"/v4/api",
  });

  instance.interceptors.request.use(
    (config) => {
    if (cookie.get('token')) {
      config.headers['Authorization'] = cookie.get('token');
    }

    return config;
  },
  (error) => {
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL+"/v4/api");
    
    return Promise.reject(error);
  })

export default instance;