// services/userService.ts
import type { ChatResponse } from '@/models/message'
import axiosInstance from './axiosConfig'

export const getMessageByUser = async (receiverId: string): Promise<ChatResponse> => {
  try {
    const response = await axiosInstance.get<ChatResponse>(`/message?receiverId=${receiverId}`)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Login failed.')
  }
}
