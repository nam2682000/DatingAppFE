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

      <el-menu-item index="/dashboard">
        <router-link to="/dashboard">Dashboard</router-link>
      </el-menu-item>
      
      <el-menu-item index="/login" v-if="!authStore.isLoggedIn">
        <router-link to="/login">Login</router-link>
      </el-menu-item>

      <div>
        <el-sub-menu>
          <template #title>
            <div class="flex items-center">
              <el-avatar
                class=""
                :size="32"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
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
import { ref, watch } from 'vue'
import { useAuthStore } from './stores/authStore'
import { useRoute } from 'vue-router'


const route = useRoute()
// Khởi tạo auth store
const authStore = useAuthStore()

const activeIndex = ref(route.path)
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// Theo dõi sự thay đổi của route và cập nhật activeIndex
watch(() => route.path, (newPath) => {
  console.log('newPath',newPath);
  if (newPath === '/' || newPath === '/home' || newPath === '') {
    // Nếu đường dẫn là '/', '/home' hoặc chuỗi rỗng '', đặt activeIndex thành '/'
    activeIndex.value = '/';
  } else {
    // Với các đường dẫn khác, đặt activeIndex thành đường dẫn hiện tại
    activeIndex.value = newPath;
  }
})

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
