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
    async login(params: { userId: string; pwd: string }) {
      try {
        // 替換為實際的登入 API 端點
        console.log("params.userId", params.userId);
        const response = await axios.post('/api/login', { userId: params.userId, pwd: params.pwd });

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
