import { defineStore } from 'pinia'

// Định nghĩa interface cho User
interface User {
  userName: string
  userId: string
  role: string
  token: string
}

// Sử dụng Pinia defineStore
export const useAuthStore = defineStore('auth', {
  // Khai báo state với kiểu rõ ràng
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null as User | null // Gán kiểu dữ liệu rõ ràng cho user
  }),

  // Các hành động (actions)
  actions: {
    login(userData: User) {
      // Dùng kiểu `User` cho dữ liệu người dùng
      this.token = userData.token // Giả lập đăng nhập, lưu token
      localStorage.setItem('token', userData.token)
      this.user = userData // Gán dữ liệu người dùng vào state
    },
    logout() {
      this.token = null
      this.user = null // Đặt lại trạng thái user
      localStorage.removeItem('token')
    }
  },

  // Các getter
  getters: {
    isLoggedIn: (state) => !!state.token // Trả về true nếu có token
  }
})
