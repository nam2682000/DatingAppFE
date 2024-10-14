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
      <img
        :src="'http://localhost:5176/uploads/50360ee9-d3b5-4666-9e8e-59934736c151/images2.jpeg'"
        alt="User profile"
        class="profile-picture"
      />
      <h2>Name</h2>
      <p>Bio</p>
    </div>
    <div class="action-buttons">
      <el-button type="danger" @click="dislike">Next</el-button>
      <el-button type="primary" @click="like">Like</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getNewUser } from '@/services/userService'
import { onMounted, ref } from 'vue'



onMounted(async () => {
  await getNewUser();
})
// Nhận props từ cha
const props = defineProps({
  currentUser: {
    type: Object,
    required: true
  }
})

const like = () => {
  // Xử lý sự kiện "Thích" (Vuốt phải)
  console.log(`Liked:`)
  nextUser()
}

const dislike = () => {
  // Xử lý sự kiện "Bỏ qua" (Vuốt trái)
  console.log(`Disliked: `)
  nextUser()
}

const nextUser = () => {
  console.log('next user');
}

// Các giá trị trạng thái
const startX = ref(0)
const offsetX = ref(0)
const isDragging = ref(false)
const opacityValue = ref(1)

// Bắt đầu kéo
const startDragging = (event:any) => {
  isDragging.value = true
  startX.value = event.clientX // Lấy vị trí bắt đầu khi nhấn chuột
}

// Theo dõi quá trình kéo
const onDragging = (event:any) => {
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
    like();
  } else if (offsetX.value < -100) {
    // Vuốt trái (dislike)
    dislike();
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
