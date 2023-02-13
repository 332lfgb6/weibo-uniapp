<template>
  <view class="bottom fixed-bottom row bg-white">
    <view class="col u-tips-color flex flex-center" @click="$u.route('/pages/chat/chat', { id })">
      <extra-icon name="chat-o"></extra-icon>
      <text class="q-ml-sm">聊天</text>
    </view>
    <view class="col flex flex-center" :class="isFollow ? 'u-tips-color' : 'text-orange-10'" @click="followUser">
      <extra-icon :name="isFollow ? 'success' : 'plus'"></extra-icon>
      <text class="q-ml-sm">{{ isFollow ? '已' : '' }}关注</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { follow_user_api } from '@/request/follow'

const props = defineProps({
  id: Number,
  isFollow: Number
})

const emits = defineEmits(['followUser'])

const followUser = async () => {
  await follow_user_api(props.id)
  emits('followUser')
}
</script>

<style lang="scss" scoped>
.bottom {
  height: 50px;
  z-index: 2;
}
</style>
