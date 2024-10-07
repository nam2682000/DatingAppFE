// services/userService.ts
import axiosInstance from './axiosConfig'

// Hàm lấy thông tin người dùng
export const getUserProfile = async () => {
  const response = await axiosInstance.get('/api/user/profile')
  return response.data
}

// Hàm cập nhật thông tin người dùng
export const updateUserProfile = async (profileData: any) => {
  const response = await axiosInstance.put('/api/user/profile', profileData)
  return response.data
}
