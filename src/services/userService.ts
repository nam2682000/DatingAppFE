// services/userService.ts
import axiosInstance from './axiosConfig'
import type { UserMessageResponse, UserProfileRequest, UserProfileResponse } from '@/models/user'

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  try {
    const response = await axiosInstance.get<UserProfileResponse>('/user/my-profile')
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Login failed.')
  }
}

export const getUserMatch = async (): Promise<UserMessageResponse[]> => {
  try {
    const response = await axiosInstance.get<UserMessageResponse[]>('/user/user-match')
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Login failed.')
  }
}

export const getNewUser = async (): Promise<UserProfileResponse> => {
  try {
    const response = await axiosInstance.get<UserProfileResponse>('/user/get-new-user')
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Login failed.')
  }
}

export const userLikeUser = async (userLikeeId: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post<boolean>('user/user-like', { userLikeeId })
    return response.data // Trả về dữ liệu nếu đăng nhập thành công
  } catch (error) {
    console.error('Login error:', error)
    throw new Error('Login failed. Please check your credentials.')
  }
}

export const userNextUser = async (userNextId: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post<boolean>('user/user-next', { userNextId })
    return response.data // Trả về dữ liệu nếu đăng nhập thành công
  } catch (error) {
    console.error('Login error:', error)
    throw new Error('Login failed. Please check your credentials.')
  }
}

export const updateUserProfile = async (model: UserProfileRequest): Promise<boolean> => {
  try {
    const response = await axiosInstance.put<boolean>('user/user-profile', model)
    return response.data // Trả về dữ liệu nếu đăng nhập thành công
  } catch (error) {
    console.error('Login error:', error)
    throw new Error('Login failed. Please check your credentials.')
  }
}
