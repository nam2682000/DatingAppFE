import axios from 'axios'
import { ElLoading } from 'element-plus';

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: '/api', // Đặt baseURL là /api để sử dụng reverse proxy
  timeout: 10000 // Thời gian chờ tối đa cho mỗi yêu cầu
})
let loadingInstance: any;

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Start the loading spinner
    loadingInstance = ElLoading.service({
      lock: true,
      text: 'Loading...',
      background: 'rgba(255, 255, 255, 0.7)',
    });
    
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // If there was an error during request setup, close the loading spinner
    if (loadingInstance) {
      loadingInstance.close();
    }
    return Promise.reject(error); // Forward the error to be handled elsewhere
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Always close the loading spinner when the response is received
    if (loadingInstance) {
      loadingInstance.close();
    }
    return response; // Pass the response along
  },
  (error) => {
    // Close the loading spinner even if there's an error response
    if (loadingInstance) {
      loadingInstance.close();
    }

    // Handle error status or message here (e.g., show notification, redirect, etc.)
    // Optionally, you can customize the error handling here

    return Promise.reject(error); // Forward the error to be handled elsewhere
  }
);

// Xuất instance axios đã cấu hình
export default axiosInstance
