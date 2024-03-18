// src/stores/user.ts
import { defineStore } from 'pinia';
import axios from 'axios'; // 確保已安裝 axios

export const useUserStore = defineStore({
  id: 'user', // 每個 store 都需要一個唯一的 id
  state: () => ({
    isLoggedIn: false,
    userToken: null,
    userData: null
  }),
  actions: {
    async login(params: { username: string; password: string }) {
      try {
        // 替換為實際的登入 API 端點
        console.log("params.userId", params.username);
        const response = await axios.post('http://localhost:3000/api/auth/login', { username: params.username, password: params.password });

        // 假設 API 響應中包含了 token 和用戶資料
        if (response.data && response.data.token) {
          this.isLoggedIn = true;
          this.userToken = response.data.token;
          this.userData = response.data.user;

          // 可以選擇將 token 存儲到 localStorage
          localStorage.setItem('userToken', response.data.token);
        } else {
          // 處理登入失敗
          throw new Error('Login failed');
        }
      } catch (error) {
        // 登入過程中出錯，可以在這裡處理錯誤
        this.isLoggedIn = false;
        this.userToken = null;
        this.userData = null;
        throw error;
      }
    },
    async signUp(params: { username: string; email: string; password: string , confirmPassword: string}) {
      try {
        console.log("params", params);
        const response = await axios.post('http://localhost:3000/api/auth/signup', { username: params.username, email: params.email, password: params.password, confirmPassword: params.confirmPassword });

        // 假設註冊成功 API 會回傳 token 和用戶資料
        if (response.data && response.data.token) {
          this.isLoggedIn = true;
          this.userToken = response.data.token;
          this.userData = response.data.user;
          
          // 可選操作：將 token 存儲到 localStorage
          localStorage.setItem('userToken', response.data.token);
        } else {
          // 處理註冊失敗
          throw new Error('Sign up failed');
        }
      } catch (error) {
        // 註冊過程中出錯，可以在這裡處理錯誤
        throw error;
      }
    },
    logout() {
      // 清空用戶狀態
      this.isLoggedIn = false;
      this.userToken = null;
      this.userData = null;

      // 移除儲存的 token
      localStorage.removeItem('userToken');
    }
  }
});
