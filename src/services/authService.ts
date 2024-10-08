// services/authService.ts
import type { LoginRequest, UserRegisterRequest } from '@/models/auth';
import axiosInstance from './axiosConfig';


export const login = async (
  model: LoginRequest
): Promise<string> => {
  try {
    const response = await axiosInstance.post<string>('/Auth/login', model);
    return response.data; // Trả về dữ liệu nếu đăng nhập thành công
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed. Please check your credentials.');
  }
};


export const logout = async (
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post<boolean>('/api/logout');
    return response.data; // Trả về dữ liệu nếu đăng nhập thành công
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Logout failed. Please check your credentials.');
  }
};


export const register = async (
  model: UserRegisterRequest
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post<boolean>('/Auth/register', model);
    return response.data; // Trả về dữ liệu nếu đăng nhập thành công
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed. Please check your credentials.');
  }
};









