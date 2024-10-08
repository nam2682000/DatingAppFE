// services/userService.ts
import axiosInstance from './axiosConfig'
import type { UserProfileRequest } from '@/models/user'

// Hàm lấy thông tin người dùng
export const getUserProfile = async () => {
  const response = await axiosInstance.get('/user/my-profile')
  return response
}

export const updateUserProfile = async (
  model: UserProfileRequest
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post<boolean>('/api/user-register', model);
    return response.data; // Trả về dữ liệu nếu đăng nhập thành công
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed. Please check your credentials.');
  }
};

