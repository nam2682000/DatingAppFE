// services/authService.ts
import axiosInstance from './axiosConfig'

// Hàm xử lý đăng nhập
export const login = async (userName: string, passWord: string, rememberMe: boolean) => {
  const response = await axiosInstance.post('/Auth/login', {
    userName,
    passWord,
    rememberMe
  })
  return response.data // Trả về dữ liệu nếu đăng nhập thành công
}

// Hàm xử lý đăng xuất
export const logout = async () => {
  const response = await axiosInstance.post('/api/logout')
  return response.data // Trả về kết quả của yêu cầu logout
}

// Hàm xử lý đăng ký
export const register = async (userData: any) => {
  const response = await axiosInstance.post('/api/register', userData)
  return response.data // Trả về dữ liệu nếu đăng ký thành công
}
