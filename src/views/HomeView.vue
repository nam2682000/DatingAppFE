<template>
  <main>
    <div class="d-flex">
      <div class="w-50">
        <ul>
          <TreeViewComponent
            v-for="data in treeData"
            class="item"
            :model="data"
            :tree-selected="treeSelected"
            :key="data.id"
            @add-item="addItem"
            @delete-item="deleteItem"
            @click-item="clickItem"
          ></TreeViewComponent>
        </ul>
      </div>
      <div class="w-50">asdas</div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref, watch } from 'vue'
import TreeViewComponent from '@/components/TreeView/TreeViewComponent.vue'
import type { TreeSelected, TreeView } from '@/models/tree'

const dataFromApi = [
  {
    id: 1,
    name: 'Node 1',
    children: [
      {
        id: 2,
        name: 'Node 2',
        children: [
          {
            id: 3,
            name: 'Node 3',
            children: [
              {
                id: 4,
                name: 'Node 4',
                children: [
                  {
                    id: 11,
                    name: 'Node 11'
                  },
                  {
                    id: 12,
                    name: 'Node 12'
                  }
                ]
              },
              {
                id: 5,
                name: 'Node 5'
              }
            ]
          },
          {
            id: 6,
            name: 'Node 6'
          }
        ]
      },
      {
        id: 7,
        name: 'Node 7',
        children: [
          {
            id: 8,
            name: 'Node 8'
          }
        ]
      }
    ]
  }
]

const treeData = reactive<TreeView[]>([])
const treeSelected = ref<TreeSelected[]>([])

watch(treeData, (newValue, oldValue) => {
  console.log(`newValue changed`, newValue)
  console.log(`treeData changed`, oldValue)
})
onBeforeMount(() => {
  if (Array.isArray(dataFromApi)) {
    const addIsOpen = (node: any): TreeView => {
      const newNode: TreeView = {
        ...node,
        isOpen: false, // Thêm thuộc tính isOpen
        children: node.children ? node.children.map(addIsOpen) : [] // Đệ quy thêm isOpen cho children
      }
      return newNode
    }
    const data: TreeView[] = dataFromApi.map(addIsOpen) // Thêm isOpen cho tất cả các node
    treeData.push(...data)
  }
})

const addItem = (idParent: number) => {
  addNodeByIdParent(treeData, idParent)
}

const deleteItem = (id: number) => {
  let result = removeNodeById(treeData, id)
  alert(result)
}

const clickItem = (id: number) => {
  treeSelected.value = []
  togetherItem(treeData, id)
}

const togetherItem = (tree: TreeView[], idClick: number): boolean => {
  let hasFound = false
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.id === idClick) {
      node.isOpen = !node.isOpen // Đảo trạng thái
      const treeCurrent: TreeSelected = {
        id: node.id,
        name: node.name
      }
      hasFound = true // Đã tìm thấy node
      if (!node.isOpen) {
        // Đóng toàn bộ node con nếu trạng thái là đóng
        closeAllChildren(node.children)
      }
      if ((!node.isOpen && !node.children) || node.isOpen) {
        treeSelected.value.push(treeCurrent) // Thêm chính nó
      }
      return true // Dừng ngay khi đã xử lý node
    }
    // Đệ quy vào các node con
    if (node.children) {
      const childFound = togetherItem(node.children, idClick)
      if (childFound) {
        hasFound = true // Xác nhận tìm thấy trong nhánh con
        const treeCurrent: TreeSelected = {
          id: node.id,
          name: node.name
        }
        treeSelected.value.push(treeCurrent) // Lưu lại cha
        break
      }
    }
  }
  return hasFound
}

const closeAllChildren = (children: TreeView[] | undefined): void => {
  if (!children) return
  for (const child of children) {
    child.isOpen = false // Đóng node hiện tại
    closeAllChildren(child.children) // Đệ quy đóng các node con
  }
}
const removeNodeById = (tree: TreeView[], idToRemove: number): boolean => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.id === idToRemove) {
      tree.splice(i, 1) // Xóa node
      return true // Kết thúc sau khi xóa
    }

    // Đệ quy kiểm tra trong children
    if (node.children && removeNodeById(node.children, idToRemove)) {
      return true
    }
  }
  return false // Không tìm thấy idToRemove
}

const addNodeByIdParent = (tree: TreeView[], idParent: number): boolean => {
  const newNode: TreeView = {
    id: Date.now(), // Giả lập id duy nhất
    name: `Node ${Date.now()}`,
    isOpen: false,
    children: []
  }
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.id === idParent) {
      if (node.children && node.children.length > 0) {
        node.children.push(newNode)
      } else {
        node.children = [newNode]
      }
      break
    }
    // Đệ quy kiểm tra trong children
    if (node.children) {
      addNodeByIdParent(node.children, idParent)
    }
  }
  return false // Không tìm thấy idToRemove
}
</script>

<style>
ol,
ul,
menu {
  list-style: circle;
  margin: auto !important;
  padding: revert-layer !important;
}
.w-50 {
  width: 50%;
}
.d-flex {
  display: flex;
}
</style>
