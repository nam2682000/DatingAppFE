<template>
  <el-form :model="profileData" label-width="120px" class="mt-16">
    <h2 class="title">User Profile</h2>
    <div class="avatar-upload text-center">
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-change="handleAvatarChange"
        :auto-upload="false"
      >
        <!-- Hiển thị avatar nếu có -->
        <el-avatar
          class=""
          :size="200"
          :src="avatarUrl || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
        />
        <!-- Hiển thị icon Plus nếu chưa có ảnh -->
      </el-upload>
      <!-- Nút upload nếu đã chọn ảnh -->
      <el-button v-if="avatarUrl" type="primary" @click="uploadAvatar">Upload</el-button>
    </div>

    <el-form-item label="Username" class="mt-5" prop="username">
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
import { getUserProfile, updateUserProfile } from '@/services/userService'
import type { UserProfileRequest } from '@/models/user'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

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
    Object.assign(profileData, response.data)
  } catch (error) {
    ElMessage.error('Failed to load user data') // Thông báo lỗi nếu không tải được dữ liệu
  }
}

// Hàm gọi API để update dữ liệu người dùng
const updateProfile = async () => {
  try {
    const response = await updateUserProfile(profileData) // Gửi dữ liệu cập nhật
    if (response) ElMessage.success('Profile updated successfully') // Thông báo thành công
  } catch (error) {
    ElMessage.error('Failed to update profile') // Thông báo lỗi nếu có
  }
}

// Tự động gọi API khi component được mounted để tải dữ liệu người dùng
onMounted(() => {
  fetchUserData() // Gọi API khi component được tải
})

const avatarUrl = ref<string>('') // URL hiển thị avatar
const selectedFile = ref<File | null>(null) // File đã chọn

// Kiểm tra ảnh trước khi upload
const beforeAvatarUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('File tải lên phải là ảnh!')
  }
  if (!isLt2M) {
    ElMessage.error('Kích thước ảnh không được vượt quá 2MB!')
  }
  return isImage && isLt2M
}

// Hiển thị ảnh xem trước sau khi người dùng chọn file
const handleAvatarChange = (file: any) => {
  const reader = new FileReader()

  reader.onload = (e: ProgressEvent<FileReader>) => {
    avatarUrl.value = e.target?.result as string
    selectedFile.value = file.raw // Lưu file đã chọn
  }
  reader.readAsDataURL(file.raw) // Đọc file để lấy URL hiển thị
}

// Hàm upload ảnh (giả lập)
const uploadAvatar = () => {
  if (selectedFile.value) {
    // Thực hiện việc upload file lên server ở đây (giả lập API)
    console.log('Uploading file:', selectedFile.value)

    // Giả lập quá trình upload và thông báo thành công
    setTimeout(() => {
      ElMessage.success('Avatar đã được upload thành công!')
    }, 1000)
  } else {
    ElMessage.error('Vui lòng chọn ảnh trước khi upload!')
  }
}

// Các tùy chọn giới tính
const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' }
]
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh cho form nếu cần */
</style>
