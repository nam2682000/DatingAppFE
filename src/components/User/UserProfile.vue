<template>
  <el-form :model="profileData" label-width="120px" class="mt-16">
    <h2 class="title">User Profile</h2>
    <el-form-item label="Username" prop="username">
      <el-input v-model="profileData.username" />
    </el-form-item>

    <el-form-item label="Firstname" prop="firstname">
      <el-input v-model="profileData.firstname" />
    </el-form-item>

    <el-form-item label="Lastname" prop="lastname">
      <el-input v-model="profileData.lastname" />
    </el-form-item>

    <el-form-item label="Email" prop="email">
      <el-input type="email" v-model="profileData.email" />
    </el-form-item>

    <el-form-item label="Date of Birth" prop="dateOfBirth">
      <el-date-picker
        v-model="profileData.dateOfBirth"
        type="date"
        placeholder="Pick a day"
        format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item label="Gender" prop="gender">
      <el-select v-model="profileData.gender" placeholder="Select your gender">
        <el-option
          v-for="option in genderOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Profile Picture" prop="profilePicture">
      <el-input v-model="profileData.profilePicture" placeholder="URL to profile picture" />
    </el-form-item>

    <el-form-item label="Bio" prop="bio">
      <el-input type="textarea" v-model="profileData.bio" />
    </el-form-item>

    <el-form-item label="Interests" prop="interests">
      <el-input v-model="profileData.interests" placeholder="Enter interests (comma separated)" />
    </el-form-item>

    <el-form-item label="Latitude" prop="latitude">
      <el-input v-model.number="profileData.latitude" placeholder="Latitude" />
    </el-form-item>

    <el-form-item label="Longitude" prop="longitude">
      <el-input v-model.number="profileData.longitude" placeholder="Longitude" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="updateProfile">Update Profile</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getUserProfile, updateUserProfile } from '@/services/userService';
import type { UserProfileRequest } from '@/models/user';

// Định nghĩa kiểu dữ liệu TypeScript cho model UserProfileRequest

// Khởi tạo object cho form dữ liệu
const profileData = reactive<UserProfileRequest>({
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  location: undefined,
  profilePicture: '',
  bio: '',
  interests: [],
  latitude: undefined,
  longitude: undefined
})

// Hàm giả lập gọi API để lấy dữ liệu user (Bạn cần thay thế bằng API thực tế)
const fetchUserData = async () => {
  try {
    const response = await getUserProfile() // API trả về dữ liệu người dùng
    Object.assign(profileData, response.data);
  } catch (error) {
    ElMessage.error('Failed to load user data') // Thông báo lỗi nếu không tải được dữ liệu
  }
}

// Hàm gọi API để update dữ liệu người dùng
const updateProfile = async () => {
  try {
    const response = await updateUserProfile(profileData) // Gửi dữ liệu cập nhật
    if(response)ElMessage.success('Profile updated successfully') // Thông báo thành công
  } catch (error) {
    ElMessage.error('Failed to update profile') // Thông báo lỗi nếu có
  }
}

// Tự động gọi API khi component được mounted để tải dữ liệu người dùng
onMounted(() => {
  fetchUserData() // Gọi API khi component được tải
})

// Các tùy chọn giới tính
const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh cho form nếu cần */
</style>
