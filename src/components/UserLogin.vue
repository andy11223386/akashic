<template>
  <div class="login-background">
    <el-card class="login-card">
      <div class="login-logo">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </div>
      <el-tabs v-model="activeTab" class="tab-container">
        <el-tab-pane label="SIGN IN" name="signin">
          <!-- 登入表單 -->
          <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" @submit.prevent="handleLogin" class="login-form">
            <el-form-item prop="username">
              <el-input placeholder="Username" v-model="loginForm.username" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="Password" type="password" v-model="loginForm.password" show-password/>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe">Stay signed in</el-checkbox>
            <el-button type="primary" class="login-button" @click="submitLoginForm">SIGN IN</el-button>
          </el-form>
          <div class="forgot-password">Forgot Password?</div>
        </el-tab-pane>
        <el-tab-pane label="SIGN UP" name="signup">
          <!-- 註冊表單 -->
          <el-form :model="signupForm" :rules="signupRules" ref="signupFormRef" @submit.prevent="handleSignup" class="signup-form">
            <el-form-item prop="email">
              <el-input placeholder="Email" v-model="signupForm.email" />
            </el-form-item>
            <el-form-item prop="username">
              <el-input placeholder="Username" v-model="signupForm.username" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="Password" type="password" v-model="signupForm.password" show-password/>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input placeholder="Confirm Password" type="password" v-model="signupForm.confirmPassword"  show-password/>
            </el-form-item>
            <el-button type="success" class="signup-button" @click="submitSignupForm">SIGN UP</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { ElCard, ElTabs, ElTabPane, ElForm, ElFormItem, ElInput, ElCheckbox, ElButton } from 'element-plus';


// Form refs
const activeTab = ref('signin');
const loginFormRef = ref(null);
const signupFormRef = ref(null);
const userStore = useUserStore(); // 使用 user store

// Form models
const loginForm = ref({ username: '', password: '', rememberMe: false });
const signupForm = ref({ email: '', username: '', password: '', confirmPassword: '' });

// Form validation rules
const loginRules = {
  username: [
    { required: true, message: 'Please input your username', trigger: 'blur' },
    { min: 3, max: 15, message: 'Username must be between 3 and 15 characters', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters long', trigger: 'blur' }
  ]
};

const signupRules = {
  email: [
    { required: true, message: 'Please input your email', trigger: 'blur' },
    { type: 'email', message: 'Please input a valid email address', trigger: 'blur' }
  ],
  username: [
    { required: true, message: 'Please input your username', trigger: 'blur' },
    { min: 3, max: 15, message: 'Username must be between 3 and 15 characters', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters long', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password', trigger: 'blur' },
    { validator: (rule, value, callback) => {
      if (value !== signupForm.value.password) {
        callback(new Error('The two passwords do not match.'));
      } else {
        callback();
      }
    }, trigger: 'blur' }
  ]
};

// Handlers for form submission
const handleLogin = async () => {
  const valid = await loginFormRef.value.validate();
  if (valid) {
    try {
      await userStore.login({ username: loginForm.value.username, password: loginForm.value.password });
      // 登入成功的邏輯，比如路由跳轉
    } catch (error) {
      // 處理登入錯誤
      console.error('Login error:', error);
    }
  }
};

const handleSignup = async () => {
  const valid = await signupFormRef.value.validate();
  if (valid) {
    try {
      //console.log("signupFormRef.value.username", signupFormRef.value.username);
      await userStore.signUp({ 
        username: signupForm.value.username, 
        email: signupForm.value.email,
        password: signupForm.value.password,  
        confirmPassword: signupForm.value.confirmPassword,
      });
      console.log("SignIn success");
      // 登入成功的邏輯，比如路由跳轉
    } catch (error) {
      // 處理註冊錯誤
      console.error('SignIn error:', error);
    }
  }

};

// Submit handlers
const submitLoginForm = () => {
  handleLogin();
};

const submitSignupForm = () => {
  handleSignup();
};
</script>

<style scoped>
.logo {
  display: block;
  margin: 0 auto;
  height: 60px; /* 根據您的 logo 大小進行調整 */
}

.login-background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0a0a0a;
}

.login-card {
  width: 300px;
  padding: 20px;
  border-radius: 4px;
  background-color: #121212;
}



.tab-container ::v-deep .el-tabs__header {
  display: flex;
  justify-content: center;
}

.tab-container ::v-deep .el-tabs__item {
  height: 40px;
  line-height: 40px;
  background-color: #121212;
  color: #fff;
}

.tab-container ::v-deep .el-tabs__item.is-active {
  color: #1db954;
}

.tab-container ::v-deep .el-tabs__active-bar {
  background-color: #1db954;
}


.el-form-item {
  margin-bottom: 24px;
}

.el-input {
  background-color: #181818;
  border: none;
}

.el-input__inner {
  background-color: #181818;
  color: #fff;
}

.login-button,
.signup-button {
  margin-top: 12px; /* 增加上邊距來給按鈕添加空間 */
  width: 100%;
  background-color: #1db954;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.forgot-password {
  text-align: center;
  color: #818181;
  margin-top: 12px;
  cursor: pointer;
}

.el-input__inner,
.el-input ,
.el-button {
  border-radius: 22px; /* 或者更大的值以使圓角更加明顯 */
}

.login-button,
.signup-button {
  width: 100%;
  background-color: #1db954;
  border: none;
  cursor: pointer; /* 加上手指形狀的指標 */
  transition: background-color 0.3s ease; /* 添加平滑過渡效果 */
}

.login-button:hover,
.signup-button:hover {
  background-color: #17a849; /* 懸停時改變按鈕背景色 */
}

.login-button:active,
.signup-button:active {
  background-color: #14863c; /* 點擊時改變按鈕背景色 */
}

/* 如果你需要添加不可用（disabled）狀態的樣式 */
.login-button:disabled,
.signup-button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}
</style>
