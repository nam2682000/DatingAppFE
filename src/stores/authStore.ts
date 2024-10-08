// stores/authStore.ts
import { defineStore } from 'pinia';
import {jwtDecode} from 'jwt-decode';

// Định nghĩa interface cho User
interface UserToken {
  sub: string;
  userId: string;
  role: string;
  exp: number;
  aud: string;
  iss: string;
  jti: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null as UserToken | null,
  }),

  actions: {
    login(tokenString: string) {
      try {
        const token = tokenString;
        const userDecoded = jwtDecode<UserToken>(token);

        localStorage.setItem('token', token);
        this.token = token;
        this.user = userDecoded;
      } catch (error) {
        console.error('Lỗi khi decode token:', error);
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
    isTokenExpired: (state) => {
      if (state.user && state.user.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return state.user.exp < currentTime;
      }
      return true;
    },
  },
});
