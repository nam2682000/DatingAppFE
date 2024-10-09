// services/userService.ts
import axiosInstance from './axiosConfig'

export const userUploadAvatar = async (file: File): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('file', file) // 'avatar' is the key expected by the server
    const response = await axiosInstance.post<string>('/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Set the content type for file upload
      }
    })
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Avatar upload failed.') // Changed to reflect the operation
  }
}
