<template>
  <view class="user-panel text-white q-pt-xl q-mb-md text-center" :style="{ backgroundImage: `url('${wallpaper}')` }">
    <avatar :size="140" :src="avatar" :auth="auth"></avatar>
    <view class="xxx q-py-md">
      <view>
        <text>{{ nickname }}</text>
        <extra-icon
          class="text-body1 q-mx-md"
          :class="gender ? 'text-blue' : 'text-pink'"
          :name="gender ? 'icmale' : 'icfemale'"
        ></extra-icon>
        <image v-if="vip" style="width:16px;height:16px;" :src="`/static/vip/${vip}.png`"></image>
      </view>
      <view class="q-my-md">关注 {{ follow_num }} | 粉丝 {{ fans_num }}</view>
      <view class="ellipsis">{{ brief }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  wallpaper: String,
  avatar: String,
  nickname: String,
  auth: Number,
  vip: Number,
  brief: String,
  follow_num: Number,
  fans_num: Number,
  gender: Number
})
</script>

<style lang="scss" scoped>
.user-panel {
  background-size: cover;
  .xxx {
    background-image: linear-gradient(#00000000, #333333ee);
  }
}
</style>
