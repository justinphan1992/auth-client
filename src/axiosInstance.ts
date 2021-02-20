import axios from 'axios'; 

const axiosInstance = axios.create({
  baseURL: 'http://localhost/api',
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token');  
    config.headers = {       
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (token) {      
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response && response.data,  
  error => {
    if (error.response && error.response) {
        return Promise.reject(error.response);
    }
    return Promise.reject(error.message);
  }
);

export default axiosInstance;
