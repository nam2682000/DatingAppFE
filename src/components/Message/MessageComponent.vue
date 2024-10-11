<template>
  <div class="chat-container">
    <div class="messages" ref="messageBox">
      <div
        v-for="(msg, index) in messageData.messages"
        :key="index"
        :class="['message', msg.senderId == userCurrent ? 'sent' : 'received']"
      >
        <div class="message-content">{{ msg.content }}</div>
      </div>
    </div>

    <div class="message-input">
      <el-input
        v-model="messageContent"
        placeholder="Aa"
        @keyup.enter="sendMessage"
        class="input-box"
        clearable
      />
      <el-button type="primary" @click="sendMessage">Send</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted, watch, reactive } from 'vue'
import type { UserMessageResponse } from '@/models/user';
import * as signalR from '@microsoft/signalr'
import { useAuthStore } from '@/stores/authStore'
import { defineProps } from 'vue';
import { getMessageByUser } from '@/services/messageService';
import type { ChatResponse, Message } from '@/models/message';

// Define the props with the expected type

const props = defineProps<{
  userClick: UserMessageResponse;
}>();

watch(() => props.userClick, async (newValue) => {
  targetUser.value = newValue.id
  messageData.value = await getMessageByUser(targetUser.value)
  console.log(messageData)
});
// State để lưu trữ nội dung tin nhắn và danh sách tin nhắn
const messageContent = ref('')
const messageData = ref<ChatResponse>({
  messages: [],
  user: {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    gender: '',
    lastActive: '',
    profilePicture: '',
  },
});
// Lấy tham chiếu đến hộp tin nhắn để cuộn xuống cuối khi có tin nhắn mới
const messageBox = ref()
const authStore = useAuthStore()
const userCurrent = authStore.user?.userId
const targetUser = ref(props.userClick.id) // ID của user nhận

let connection: any = null
// Kết nối tới SignalR Hub
const connectSignalR = async () => {
    connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5176/chatHub', {
      accessTokenFactory: () => localStorage.getItem('token') ?? ''
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();
  try {
    await connection.start()
    console.log('SignalR Connected.')
  } catch (err) {
    console.error('Error while starting SignalR connection: ', err)
  }

  // Lắng nghe sự kiện nhận tin nhắn từ server
  connection.on('ReceiveMessage', (messages:Message) => {
    messageData.value.messages.push(messages)
  })
}

// Gửi tin nhắn tới user khác
const sendMessage = async () => {
  console.log('messageContent', messageContent)
  console.log('targetUser', targetUser)
  if (messageContent.value.trim() && targetUser.value) {
    try {
      await connection.invoke(
        'SendMessageToUser',
        targetUser.value,
        messageContent.value
      )
      messageData.value.messages.push({
        id:'',
        senderId: userCurrent ?? '',
        content: messageContent.value,
        receiverId: targetUser.value,
        messageAt:''
      })
      messageContent.value = ''
    } catch (err) {
      console.error('Error sending message: ', err)
    }
  }
}
// Kết nối SignalR khi component được mount
onMounted(async () => {
  connectSignalR();
  messageData.value = await getMessageByUser(props.userClick.id)
})

// Ngắt kết nối SignalR khi component bị hủy
onUnmounted(() => {
  if (connection) {
    connection.stop()
  }
})

// Cuộn xuống cuối khi component được mount lần đầu
onMounted(() => {
  const box = messageBox.value
  box.scrollTop = box.scrollHeight
})
</script>

<style lang="css" scoped>
.chat-container {
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f5f5f5;
}

.message {
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
}

.message-content {
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
}

.sent .message-content {
  background-color: #0084ff;
  color: white;
  align-self: flex-end;
}
.message.sent {
  justify-content: end;
}
.received .message-content {
  background-color: #e5e5ea;
  color: black;
}

.message-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;
}

.input-box {
  flex: 1;
  margin-right: 10px;
}
</style>
