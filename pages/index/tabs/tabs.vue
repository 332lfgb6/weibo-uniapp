<template>
  <u-tabs
    class="tabs"
    height="100"
    :list="list"
    v-model="current"
    inactiveColor="#a5adb5"
    activeColor="#000"
    @change="$emit('change_tab', $event)"
  ></u-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineEmits(['change_tab'])

const list = [
  { name: '热门' },
  { name: '榜单' },
  { name: '同城' },
  { name: '社会' },
  { name: '科技' },
  { name: '明星' },
  { name: '电影' },
  { name: '音乐' },
  { name: '数码' },
  { name: '汽车' },
  { name: '游戏' }
]
const current = ref(0)
</script>

<style lang="scss" scoped>
.tabs {
  top: 44px;
  border-bottom: 1px solid $u-border-color;
  border-top: 1px solid $u-border-color;
}
</style>
