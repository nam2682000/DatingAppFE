<template>
  <main>
    <h1>{{ text }}</h1>
    <ul>
      <TreeViewComponent v-for="data in treeData" class="item" :model="data"></TreeViewComponent>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TreeViewComponent from '@/components/TreeView/TreeViewComponent.vue'
const treeData = ref([
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
])
const text = ref('This is home page')
</script>
<style>
ol,
ul,
menu {
  list-style: circle;
  margin: auto !important;
  padding: revert-layer !important;
}
</style>
