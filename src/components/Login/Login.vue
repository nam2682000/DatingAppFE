<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <h2 class="login-title">Login</h2>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginFormRef">
        <!-- Username Field -->
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            placeholder="Username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <!-- Password Field -->
        <el-form-item prop="passWord">
          <el-input
            v-model="loginForm.passWord"
            type="passWord"
            placeholder="Password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <!-- Submit Button -->
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-btn" round>Login</el-button>
        </el-form-item>

        <!-- Forgot Password Link -->
        <el-form-item>
          <el-link href="#" type="primary" class="forgot-passWord">Forgot Password?</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { login } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'

// Khai báo biến form
const loginForm = reactive({
  userName: '',
  passWord: ''
})

// Form validation rules
const rules = {
  userName: [
    { required: true, message: 'Please input userName', trigger: 'blur' },
    { min: 3, message: 'Username must be at least 3 characters', trigger: 'blur' }
  ],
  passWord: [
    { required: true, message: 'Please input passWord', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ]
}

// Tham chiếu đến form với kiểu FormInstance
const loginFormRef = ref<FormInstance | null>(null)

// Hàm xử lý đăng nhập
const handleLogin = () => {
  const authStore = useAuthStore()
  loginFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const userData = await login(loginForm.userName, loginForm.passWord, true)
      console.log('userData', userData)

      if (userData) authStore.login(userData)
      // Thực hiện đăng nhập (giả lập)
      ElMessage.success('Login successful!')
    } else {
      ElMessage.error('Invalid form, please check your input.')
    }
  })
}
</script>

<style scoped>
/* Container styling */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Card styling */
.login-card {
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
}

/* Title styling */
.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #409eff;
}

/* Button styling */
.login-btn {
  width: 100%;
  background-color: #409eff;
}

/* Forgot passWord link styling */
.forgot-passWord {
  text-align: center;
  display: block;
  color: #409eff;
}

.forgot-passWord:hover {
  text-decoration: underline;
}
</style>
