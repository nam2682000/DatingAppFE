<template>
  <li>
    <div
      :class="{ bold: isBold(model.id) }"
      @click="clickItem(model.id)"
      @dblclick="addChild(model)"
    >
      {{ model.name }}
      <span v-if="isFolder">[{{ model.isOpen ? '-' : '+' }}]</span>
      <span @click.stop="deleteItem(props.parent, model.id)">[X]</span>
    </div>
    <ul v-show="model.isOpen" v-if="isFolder">
      <TreeViewComponent
        v-for="child in model.children"
        :key="child.id"
        :model="child"
        :parent="model"
        :tree-selected="treeSelected"
        @add-item="addItem"
        @delete-item="deleteItem"
        @click-item="clickItem"
      />
      <li class="add" @click="addItem(model)">+</li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import type { TreeSelected } from '@/models/tree'
import { computed, defineProps, defineEmits, onMounted } from 'vue'

export interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
  isOpen: boolean
}
const props = defineProps<{
  model: TreeNode
  treeSelected: TreeSelected[]
  parent: TreeNode | null
}>()

onMounted(() => {})
const emit = defineEmits(['deleteItem', 'addItem', 'clickItem'])
const isFolder = computed(() => !!props.model.children?.length)
const isBold = (id: number) => !!props.treeSelected.find((m) => m.id === id)

const clickItem = (id: number) => {
  emit('clickItem', id)
}
const addChild = (tree: TreeNode) => {
  addItem(tree)
  clickItem(tree.id)
}
const deleteItem = (parent: TreeNode | null, idDelete: number) =>
  emit('deleteItem', parent, idDelete)
const addItem = (parent: TreeNode) => emit('addItem', parent)
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
