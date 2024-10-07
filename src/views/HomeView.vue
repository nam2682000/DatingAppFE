<script setup lang="ts">
import { ref } from 'vue'
const text = ref('This is home page')
</script>
<template>
  <main>
    <h1>{{ text }}</h1>
  </main>
</template>
