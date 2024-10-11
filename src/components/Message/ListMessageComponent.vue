<template>
  <el-container>
    <el-aside width="300px">
      <!-- Danh sách người dùng -->
      <el-list class="divide-y-4 divide-slate-400/25">
        <el-list-item
          v-for="(user, index) in users"
          :key="index"
          @click="selectUser(user)"
          class="user-list-item flex shadow-inner p-3 border-current cursor-pointer"
        >
          <el-avatar :src="user.profilePicture || 'default-avatar.png'" />
          <div class="user-info pl-3">
            <p>{{ user.firstname }} {{ user.lastname }}</p>
            <small>{{ formatLastActive(user.lastActive ?? new Date()) }}</small>
          </div>
        </el-list-item>
      </el-list>
    </el-aside>

    <el-main v-if="selectedUser">
      <!-- Khu vực nhắn tin với người dùng được chọn -->
      <h2>Nhắn tin với {{ selectedUser.lastname }}</h2>
      <MessageComponent :userClick="selectedUser"></MessageComponent>
      <!-- Nội dung tin nhắn, form nhắn tin, v.v. -->
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import type { UserMessageResponse } from '@/models/user'
import { getUserMatch } from '@/services/userService'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import MessageComponent from './MessageComponent.vue';


const users = reactive<UserMessageResponse[]>([])

// Người dùng được chọn
const selectedUser = ref<UserMessageResponse | null>(null)

// Hàm chọn người dùng
const selectUser = (user: UserMessageResponse) => {
  selectedUser.value = user
}

const fetchUserMatchData = async () => {
  try {
    const response = await getUserMatch() // API trả về dữ liệu người dùng
    users.push(...response);
    console.log('response', response)
  } catch (error) {
    ElMessage.error('Failed to load interest data') // Thông báo lỗi nếu không tải được dữ liệu
  }
}

onMounted(()=>{
  fetchUserMatchData();
  
})
// Hàm định dạng thời gian hoạt động cuối cùng
const formatLastActive = (lastActive: Date | null) => {
  return lastActive
    ? `Hoạt động cuối: ${lastActive}`
    : 'Không rõ hoạt động cuối'
}
</script>

<style lang="scss" scoped></style>
