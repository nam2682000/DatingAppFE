// services/userService.ts
import type { InterestResponse } from '@/models/interest'
import axiosInstance from './axiosConfig'

export const getAllInterest = async (): Promise<InterestResponse[]> => {
  try {
    const response = await axiosInstance.get<InterestResponse[]>('/interest')
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Login failed.')
  }
}
