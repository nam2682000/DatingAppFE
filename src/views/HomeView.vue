<template>
  <main>
    <div class="d-flex">
      <div class="w-50">
        <ul>
          <TreeViewComponent
            v-for="data in treeData"
            class="item"
            :model="data"
            :parent="null"
            :tree-selected="treeSelected"
            :key="data.id"
            @add-item="addItem"
            @delete-item="deleteItem"
            @click-item="clickItem"
          ></TreeViewComponent>
        </ul>
      </div>
      <div class="w-50">
        <div v-for="item in [...treeSelected].reverse()" :key="item.id">{{ item.name }}</div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import TreeViewComponent, { type TreeNode } from '@/components/TreeView/TreeViewComponent.vue'
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

const treeData = ref<TreeView[]>([])
const treeSelected = ref<TreeSelected[]>([])
const prevTreeSelected = ref<TreeSelected[]>([])

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
    treeData.value.push(...data)
  }
})

const addItem = (parent: TreeNode) => {
  const newNode: TreeView = {
    id: Date.now(), // Giả lập id duy nhất
    name: `Node ${Date.now()}`,
    isOpen: false,
    children: []
  }
  parent.children?.push(newNode)
}

const deleteItem = (parent: TreeNode | null, id: number) => {
  if (parent) {
    const indexRemove = parent.children?.findIndex((m) => m.id === id) ?? -1
    parent.children?.splice(indexRemove, 1)
  } else {
    treeData.value = treeData.value.filter((m) => m.id !== id)
  }
}

const clickItem = (id: number) => {
  treeSelected.value = []
  togetherItem(treeData.value, id)
  prevTreeSelected.value = treeSelected.value
  console.log('props.treeSelected', treeSelected.value)
}

const togetherItem = (tree: TreeView[], idClick: number): boolean => {
  let hasFound = false
  const isClick = !!prevTreeSelected.value.find((m) => m.id === idClick)
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.id === idClick) {
      const treeCurrent: TreeSelected = {
        id: node.id,
        name: node.name
      }
      hasFound = true
      node.isOpen = isClick ? !node.isOpen : true
      if (node.isOpen) {
        treeSelected.value.push(treeCurrent)
      } else {
        closeAllChildren(node.children)
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
