<template>
  <view v-if="user_store.token" class="navbar bg-white q-px-md row items-center">
    <u-icon name="account" @click="$u.route('/pages/user-center/user-center')"></u-icon>
    <u-field
      class="input bg-grey-4 col q-ml-md"
      icon="search"
      label-width="0"
      confirm-type="搜索"
      placeholder="搜一搜"
      clearable
      @click="$u.route('/pages/search/search')"
    ></u-field>
    <view class="q-ml-md relative-position">
      <u-badge v-if="unreadNum" :count="unreadNum" type="error" is-center></u-badge>
      <u-icon name="email" @click="$u.route('/pages/msg/msg')"></u-icon>
    </view>
    <u-icon class="q-ml-md" name="edit-pen" @click="$u.route('/pages/write/write')"></u-icon>
  </view>
  <view v-else class="navbar bg-white q-px-md row items-center">
    <u-image width="20px" height="20px" mode="aspectFit" src="@/static/logo.png" />
    <u-field
      class="input bg-grey-4 col q-ml-md"
      icon="search"
      label-width="0"
      confirm-type="搜索"
      placeholder="搜一搜"
      clearable
      @click="$u.route('/pages/search/search')"
    ></u-field>
    <u-icon class="q-ml-md" name="edit-pen" @click="$u.route('/pages/write/write')"></u-icon>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '../../../store/user'

const user_store = useUserStore()

defineProps({
  unreadNum: Number
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 44px;
  font-size: 20px;
  .input {
    padding: 4px 8px;
    border-radius: 15px;
  }
}
</style>
