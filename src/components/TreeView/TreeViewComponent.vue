<template>
  <li>
    <div :class="{ bold: isFolder }" @click="toggle" @dblclick="changeType">
      {{ model.name }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
      <span @click="deleleteItem(model.id)">[X]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <TreeViewComponent class="item" v-for="model in model.children" :model="model">
      </TreeViewComponent>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  model: Object
})

const isOpen = ref(false)
const isFolder = computed(() => {
  return props.model.children && props.model.children.length
})

const deleleteItem = (id) => {
  alert(id)
  removeNodeById(props.model, id)
}
function toggle() {
  isOpen.value = !isOpen.value
}

function changeType() {
  if (!isFolder.value) {
    props.model.children = []
    addChild()
    isOpen.value = true
  }
}

function addChild() {
  props.model.children.push({ name: 'new stuff' })
  console.log('props', props.model)
}

function removeNodeById(tree, idToRemove) {
  // Tìm phần tử có idToRemove
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]

    // Nếu tìm thấy node với idToRemove, xóa nó và dừng lại
    if (node.id === idToRemove) {
      tree.splice(i, 1) // Xóa node này khỏi mảng
      break // Dừng việc lặp qua cây
    }

    // Nếu node có children, xử lý tiếp trong children
    if (node.children) {
      removeNodeById(node.children, idToRemove)
    }
  }

  return tree
}
</script>

<style>
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>
