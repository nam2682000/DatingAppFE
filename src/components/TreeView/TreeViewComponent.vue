<template>
  <li>
    <div
      :class="{ bold: isBold(model.id) }"
      @click="clickItem(model.id)"
      @dblclick="changeType(model.id)"
    >
      {{ model.name }}
      <span v-if="isFolder">[{{ model.isOpen ? '-' : '+' }}]</span>
      <span @click.stop="deleteItem(model.id)">[X]</span>
    </div>
    <ul v-show="model.isOpen" v-if="isFolder">
      <TreeViewComponent
        v-for="child in model.children"
        :key="child.id"
        :model="child"
        :tree-selected="treeSelected"
        @add-item="addItem"
        @delete-item="deleteItem"
        @click-item="clickItem"
      />
      <li class="add" @click="addItem(model.id)">+</li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import type { TreeSelected } from '@/models/tree'
import { computed, defineProps, defineEmits, onMounted } from 'vue'

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
  isOpen: boolean
}
const props = defineProps<{
  model: TreeNode
  treeSelected: TreeSelected[]
}>()

onMounted(() => {})
const emit = defineEmits(['deleteItem', 'addItem', 'clickItem'])
const isFolder = computed(() => !!props.model.children?.length)
const isBold = (id: number) => computed(() => !!props.treeSelected.find((m) => m.id === id))

const clickItem = (id: number) => {
  emit('clickItem', id)
  console.log('props.treeSelected', props.treeSelected)
}
const changeType = (id: number) => {
  addItem(id)
  clickItem(id)
}
const deleteItem = (id: number) => emit('deleteItem', id)
const addItem = (idParent: number) => emit('addItem', idParent)
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
