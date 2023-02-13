<template>
  <view class="stat-bar">
    <view class="q-pa-md">
      <u-icon class="text-grey" name="close" size="30px" @click="back"></u-icon>
      <view class="text-h6 q-mt-lg">登录注册更精彩</view>
      <view class="q-mt-md q-mb-xl">登录注册表示同意微博用户协议</view>
      <u-field
      class="q-mb-xl"
        label-width="0"
        type="number"
        :error-message="error_message"
        maxlength="11"
        clearable
        v-model="phone"
        placeholder="随便输入11个数字"
      ></u-field>
      <a-btn :disabled="phone.length !== 11" @click="get_code" text="获取验证码"></a-btn>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const phone = ref('')

const error_message = ref('')

const back = () => {
  uni.navigateBack()
}
const get_code = () => {
  uni.$u.route('/pages/code/code', {
    phone: phone.value
  })
}
</script>

<style>
page {
  background-color: #fff;
}
</style>

<style lang="scss" scoped></style>
