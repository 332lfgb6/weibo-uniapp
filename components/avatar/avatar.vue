<template>
  <view class="inline-block" @click.stop="user_id ? $u.route('/pages/profile/profile', { id: user_id }) : ''">
    <u-avatar
      class="q-mr-md"
      :src="src"
      :size="size"
      :level-bg-color="level_bg_color"
      :show-level="auth ? true : false"
    ></u-avatar>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  src: String,
  auth: Number,
  size: {
    type: Number,
    default: 64
  },
  user_id: Number
})

const level_bg_color = computed(() => {
  let filename: string
  switch (props.auth) {
    // 黄v
    case 1:
      filename = '#e21d02'

      break
    // 蓝v
    case 2:
      filename = '#ffb502'
      break
    // 红v
    case 3:
      filename = '#00a4ff'
      break
  }
  return filename
})
</script>

<style lang="scss" scoped></style>
