import axios from 'axios'

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: '/api', // Đặt baseURL là /api để sử dụng reverse proxy
  timeout: 10000 // Thời gian chờ tối đa cho mỗi yêu cầu
})

// Thêm interceptor để thêm token vào mỗi yêu cầu
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(axiosInstance)
    const token = localStorage.getItem('token') // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // Thêm token vào header
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Thêm interceptor để xử lý lỗi (nếu cần)
axiosInstance.interceptors.response.use(
  (response) => {
    return response // Trả về response nếu không có lỗi
  },
  (error) => {
    console.error('API call error:', error)
    return Promise.reject(error)
  }
)

// Xuất instance axios đã cấu hình
export default axiosInstance
