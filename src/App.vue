<template>
  <div id="app">
    <!-- Thanh Nav Menu -->
    <el-menu
      v-if="authStore.isLoggedIn"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">
        <router-link to="/">Home</router-link>
      </el-menu-item>

      <el-menu-item index="/about">
        <router-link to="/about">About</router-link>
      </el-menu-item>

      <el-menu-item index="/list-message">
        <router-link to="/list-message">Message</router-link>
      </el-menu-item>

      <el-menu-item index="/checker">
        <router-link to="/checker">Checker</router-link>
      </el-menu-item>

      <el-menu-item index="/login" v-if="!authStore.isLoggedIn">
        <router-link to="/login">Login</router-link>
      </el-menu-item>

      <div>
        <el-sub-menu>
          <template #title>
            <div class="flex items-center">
              <el-avatar class="" :size="32" :src="userProfile?.profilePicture" />
            </div>
          </template>
          <el-menu-item>
            <router-link to="/profile">Profile</router-link>
          </el-menu-item>
          <el-menu-item index="/logout" @click="logout"> Logout </el-menu-item>
        </el-sub-menu>
      </div>
    </el-menu>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from './stores/authStore'
import { useRoute } from 'vue-router'
import { getUserProfile } from './services/userService'
import { ElMessage } from 'element-plus'
import type { UserProfileResponse } from './models/user'

const route = useRoute()
// Khởi tạo auth store
const authStore = useAuthStore()
const activeIndex = ref(route.path)
const userProfile = ref<UserProfileResponse>()
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const fetchUserData = async () => {
  try {
    const response = await getUserProfile() // API trả về dữ liệu người dùng
    userProfile.value = response
    console.log('profileData', userProfile)
  } catch (error) {
    ElMessage.error('Failed to load user data') // Thông báo lỗi nếu không tải được dữ liệu
  }
}

onMounted(() => {
  const authStore = useAuthStore() // Lấy store quản lý trạng thái xác thực

  authStore.initializeAuth() // Khôi phục trạng thái đăng nhập từ localStorage

  if (authStore.isTokenExpired && authStore.isLoggedIn) {
    // Nếu token đã hết hạn và người dùng vẫn đăng nhập, thực hiện đăng xuất
    authStore.logout()
    window.location.href = '/login' // Chuyển hướng tới trang đăng nhập
  }
})

// Theo dõi sự thay đổi của route và cập nhật activeIndex
watch(
  () => route.path,
  (newPath) => {
    console.log('newPath', newPath)
    if (newPath === '/' || newPath === '/home' || newPath === '') {
      // Nếu đường dẫn là '/', '/home' hoặc chuỗi rỗng '', đặt activeIndex thành '/'
      activeIndex.value = '/'
    } else {
      // Với các đường dẫn khác, đặt activeIndex thành đường dẫn hiện tại
      activeIndex.value = newPath
    }
  }
)

watch(
  () => authStore.isLoggedIn,
  (newAuthStore) => {
    if (newAuthStore) {
      fetchUserData()
    }
  }
)

// Hàm logout
const logout = () => {
  authStore.logout()
  // Chuyển hướng về trang login sau khi đăng xuất
  window.location.href = '/login'
}
</script>

<style scoped>
.el-menu-demo {
  background-color: #545c64;
  color: white;
}
.el-menu-item {
  text-decoration: none;
  color: white;
}
</style>
