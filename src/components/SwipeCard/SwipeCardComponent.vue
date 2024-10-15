<template>
  <div class="swipe-card-container">
    <div
      class="swipe-card"
      :style="{ transform: `translateX(${offsetX}px)`, opacity: opacityValue }"
      @mousedown="startDragging"
      @mousemove="onDragging"
      @mouseup="endDragging"
      @mouseleave="endDragging"
    >
      <img :src="currentUser?.profilePicture ?? ''" alt="User profile" class="profile-picture" />
      <h2>{{ currentUser?.username }}</h2>
      <p>{{ currentUser?.bio }}</p>
    </div>
    <div class="action-buttons">
      <el-button type="danger" @click="dislike">Next</el-button>
      <el-button type="primary" @click="like">Like</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { UserProfileResponse } from '../../models/user'
import { getNewUser, userLikeUser, userNextUser } from '../../services/userService'

onMounted(async () => {
  const newUser = await getNewUser()
  currentUser.value = newUser
})

const currentUser = ref<UserProfileResponse>()

const like = async () => {
  // Xử lý sự kiện "Thích" (Vuốt phải)
  console.log(`Liked:`)
  await userLikeUser(currentUser.value?.id ?? '')
  nextUser()
}

const dislike = () => {
  // Xử lý sự kiện "Bỏ qua" (Vuốt trái)
  console.log(`Disliked:`)
  userNextUser(currentUser.value?.id ?? '')
  nextUser()
}

const nextUser = async () => {
  const newUser = await getNewUser()
  currentUser.value = newUser
  console.log('next user')
}

// Các giá trị trạng thái
const startX = ref(0)
const offsetX = ref(0)
const isDragging = ref(false)
const opacityValue = ref(1)

// Bắt đầu kéo
const startDragging = (event: any) => {
  isDragging.value = true
  startX.value = event.clientX // Lấy vị trí bắt đầu khi nhấn chuột
}

// Theo dõi quá trình kéo
const onDragging = (event: any) => {
  if (isDragging.value) {
    offsetX.value = event.clientX - startX.value // Tính khoảng cách kéo
    // Thay đổi opacity khi kéo xa hơn
    opacityValue.value = 1 - Math.abs(offsetX.value) / 300
  }
}

// Kết thúc kéo
const endDragging = () => {
  if (!isDragging.value) return

  if (offsetX.value > 100) {
    // Vuốt phải (like)
    like()
  } else if (offsetX.value < -100) {
    // Vuốt trái (dislike)
    dislike()
  }

  // Reset lại giá trị sau khi kéo
  isDragging.value = false
  offsetX.value = 0
  opacityValue.value = 1
}
</script>

<style scoped>
.swipe-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swipe-card {
  width: 500px;
  height: 600px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  cursor: grab;
  user-select: none;
}

.profile-picture {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.action-buttons {
  margin-top: 20px;
}
</style>
