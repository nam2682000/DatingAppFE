<template>
  <li>
    <div class="d-flex" @click="clickItem(model.id)" @dblclick="addChild(model)">
      <div v-if="isFolder" class="d-flex align-items-center">
        <el-icon v-if="model.isOpen" class="icon-custom"><ArrowDownBold /></el-icon>
        <el-icon v-else class="icon-custom"><ArrowRightBold /></el-icon>
      </div>
      <div v-else><el-icon class="icon-custom-emty"></el-icon></div>
      <div :class="{ bold: isBold(model.id) }">{{ model.name }}</div>
      <div @click.stop="deleteItem(props.parent, model.id)" class="d-flex align-items-center">
        <el-icon><Close /></el-icon>
      </div>
    </div>

    <!-- Transition wrapper -->
    <transition name="fade-slide">
      <ul
        v-show="model.isOpen"
        v-if="isFolder"
        style="border-left: #bfb8b8 1px solid; margin-left: 8px !important"
      >
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
        <li class="add" @click="addItem(model)">
          <el-icon><FolderAdd /></el-icon>
        </li>
      </ul>
    </transition>
  </li>
</template>

<script setup lang="ts">
import type { TreeSelected } from '@/models/tree'
import { computed, defineProps, defineEmits, onMounted } from 'vue'
import { ArrowRightBold, ArrowDownBold, Close, FolderAdd } from '@element-plus/icons-vue'

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
.icon-custom-emty,
.icon-custom {
  font-size: 1.1rem !important;
}

.d-flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to {
  max-height: 200px; /* Adjust based on content */
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  max-height: 200px;
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>
