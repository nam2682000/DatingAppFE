<template>
  <div id="app">
    <!-- Thanh Nav Menu -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/about">About</router-link>
      </el-menu-item>
      <el-menu-item index="3" v-if="authStore.isLoggedIn">
        <router-link to="/profile">Profile</router-link>
      </el-menu-item>
      <el-menu-item index="4" v-if="authStore.isLoggedIn">
        <router-link to="/dashboard">Dashboard</router-link>
      </el-menu-item>
      <!-- Chỉ hiển thị nút Logout nếu đã đăng nhập -->
      <el-menu-item index="5" v-if="authStore.isLoggedIn" @click="logout"> Logout </el-menu-item>

      <!-- Nếu chưa đăng nhập thì hiển thị nút Login -->
      <el-menu-item index="6" v-if="!authStore.isLoggedIn">
        <router-link to="/login">Login</router-link>
      </el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from './stores/authStore'

// Khởi tạo auth store
const authStore = useAuthStore()

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

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
