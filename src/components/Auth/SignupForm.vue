<template>
  <div class="signup-container">
    <el-card class="signup-card" shadow="hover">
      <h2 class="title">Signup</h2>
      <el-form :model="form" :rules="rules" ref="signupFormRef" label-width="120px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>

        <el-form-item label="First Name" prop="firstname">
          <el-input v-model="form.firstname" />
        </el-form-item>

        <el-form-item label="Last Name" prop="lastname">
          <el-input v-model="form.lastname" />
        </el-form-item>

        <el-form-item label="Date of Birth" prop="dateOfBirth">
          <el-date-picker
            v-model="form.dateOfBirth"
            type="date"
            placeholder="Select date of birth"
          />
        </el-form-item>

        <el-form-item label="Gender" prop="gender">
          <el-select v-model="form.gender" placeholder="Select Gender">
            <el-option label="Male" value="Male"></el-option>
            <el-option label="Female" value="Female"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>

        <el-form-item label="Re-enter Password" prop="rePassword">
          <el-input v-model="form.rePassword" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">Register</el-button>
          <el-button @click="onReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { UserRegisterRequest } from '@/models/auth';
import { register } from '@/services/authService';
import { useRouter } from 'vue-router';

// Reactive state for the form
const form = reactive<UserRegisterRequest>({
  username: '',
  firstname: '',
  lastname: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  password: '',
  rePassword: '' // Initialize the rePassword field
})

// Validation rules
const rules = reactive({
  username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  firstname: [{ required: true, message: 'Please input first name', trigger: 'blur' }],
  lastname: [{ required: true, message: 'Please input last name', trigger: 'blur' }],
  dateOfBirth: [{ required: true, message: 'Please select date of birth', trigger: 'change' }],
  gender: [{ required: true, message: 'Please select gender', trigger: 'change' }],
  email: [
    { required: true, type: 'email', message: 'Please input a valid email', trigger: 'blur' }
  ],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
  rePassword: [
    {
      required: true,
      message: 'Please re-enter your password',
      trigger: 'blur'
    },
    {
      validator: (rule: any, value: string) => {
        if (value !== form.password) {
          return new Error('The passwords do not match')
        }
        return true
      },
      trigger: 'blur'
    }
  ]
})

const router = useRouter();
const signupFormRef = ref() // Reference to the form

// Handle form submission
const onSubmit = () => {
  signupFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const check = await register(form);
      if(check){
        ElMessage.success('Registration successful!');
        router.push('/login')
      }
    } else {
      ElMessage.error('Please fill out the form correctly.')
    }
  })
}

// Handle form reset
const onReset = () => {
  signupFormRef.value?.resetFields()
}


</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Card styling */
.signup-card {
  width: 600px;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
}
</style>