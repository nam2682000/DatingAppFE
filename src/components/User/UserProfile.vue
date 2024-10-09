<template>
  <el-form :model="profileData" label-width="120px" class="mt-16">
    <h2 class="title">Profile {{ authStore.user?.sub }}</h2>
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

    <MapComponent v-if="!!profileData.username" :locationDefault="locationDefault" @update:locationName="handleLocationNameUpdate" />

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

    <el-form-item label="Bio" prop="bio">
      <el-input type="textarea" v-model="profileData.bio" />
    </el-form-item>

    <el-form-item label="Interests" prop="interests">
      <el-select
        v-model="valueInterestSelect"
        multiple
        placeholder="Select options"
        style="width: 300px"
      >
        <el-option
          v-for="item in optionsInterest"
          :key="item.interestName"
          :label="item.interestName"
          :value="item.interestName"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="updateProfile">Update Profile</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getUserProfile, updateUserProfile } from '@/services/userService'
import type { UserProfileModel, UserProfileRequest, UserProfileResponse } from '@/models/user'
import { useAuthStore } from '@/stores/authStore'
import MapComponent from '../Map/MapComponent.vue'
import { getAllInterest } from '@/services/interestService'
import type { InterestResponse } from '@/models/interest'

// Định nghĩa kiểu dữ liệu TypeScript cho model UserProfileRequest

const authStore = useAuthStore()
// Khởi tạo object cho form dữ liệu
const profileData = reactive<UserProfileRequest>({
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  dateOfBirth: new Date(),
  gender: '',
  profilePicture: '',
  bio: '',
  interests: [],
  latitude: undefined,
  longitude: undefined
})
const optionsInterest = reactive<InterestResponse[]>([])
const valueInterestSelect = ref([])
const location = ref('') // Biến để lưu tên địa điểm
const locationDefault = ref({ x: 0, y: 0 });

const handleLocationNameUpdate = (newLocationName: any) => {
  location.value = newLocationName // Cập nhật giá trị
  console.log('newLocationName', location)
}

watch(valueInterestSelect, async (newQuestion, oldQuestion) => {
  console.log('newQuestion',newQuestion);
  console.log('oldQuestion',oldQuestion);
})
// Hàm giả lập gọi API để lấy dữ liệu user (Bạn cần thay thế bằng API thực tế)
const fetchUserData = async () => {
  try {
    const response = await getUserProfile() // API trả về dữ liệu người dùng
    Object.assign(profileData, mapUserProfileResponseToRequest(response));
    console.log('profileData',profileData);
    locationDefault.value = {
      x: profileData.longitude??0,
      y: profileData.latitude??0
    };
    console.log('locationDefault',locationDefault);
  } catch (error) {
    ElMessage.error('Failed to load user data') // Thông báo lỗi nếu không tải được dữ liệu
  }
}

const fetchInterestData = async () => {
  try {
    const response = await getAllInterest() // API trả về dữ liệu người dùng
    optionsInterest.push(...response)
    console.log('response', response)
  } catch (error) {
    ElMessage.error('Failed to load interest data') // Thông báo lỗi nếu không tải được dữ liệu
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
  fetchInterestData()
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

function mapUserProfileResponseToRequest(
  response: UserProfileResponse
): UserProfileRequest {
  return {
    username: response.username,
    firstname: response.firstname,
    lastname: response.lastname,
    email: response.email,
    dateOfBirth: response.dateOfBirth ? new Date(response.dateOfBirth) : new Date(), // Default to current date if null
    gender: response.gender,
    profilePicture: response.profilePicture ?? null, // Null-coalescing for optional fields
    bio: response.bio ?? null,
    interests: response.interests ? response.interests.map(i => i.interestName) : null, // Assuming Interest has a 'name' property
    longitude: response.location?.coordinates.x ?? null,
    latitude: response.location?.coordinates.y ?? null, // Assuming coordinates in GeoJson2DCoordinates
  };
}
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh cho form nếu cần */
</style>
