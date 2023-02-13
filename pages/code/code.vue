<template>
  <view class="stat-bar">
    <view class="q-pa-md relative-position">
      <view
        v-if="second >= 5"
        class="msg shadow-1 rounded-borders absolute-top flex justify-between q-pa-md bg-white items-center"
      >
        <view>
          <text class="u-content-color">验证码：</text>
          <text>{{ right_code }}</text>
        </view>
        <u-button size="mini" type="success" :customStyle="{ margin: 0 }" @click="code = right_code">
          复制验证码
        </u-button>
      </view>
      <u-icon class="text-grey" name="arrow-left" size="30px" @click="back"></u-icon>
      <view class="text-h6 q-mt-lg">请输入验证码</view>
      <view class="q-mt-md q-mb-xl">验证码已通过短信发送至 +86 {{ phone }}</view>
      <u-field
        class="q-mb-xl"
        label-width="0"
        :error-message="error_message"
        type="number"
        maxlength="6"
        clearable
        v-model="code"
        placeholder="输入验证码"
      >
        <template #right>
          <text v-if="second !== 0">{{ second }} 秒后可重新获取</text>
          <text v-else class="text-blue q-ml-md" @click="get_code">重新获取</text>
        </template>
      </u-field>
      <a-btn :disabled="code.length !== 6" @click="login" text="登录"></a-btn>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { get_user_info_api, login_api } from '@/request/user'
import { useUserStore } from '../../store/user'

const phone = ref('')
const right_code = ref('')
const code = ref('')
const second = ref(0)
const error_message = ref('')

onLoad(option => {
  phone.value = option.phone
})
onReady(() => {
  get_code()
})

const login = async () => {
  // 如果验证码输错了，则中断函数
  if (code.value !== right_code.value) {
    error_message.value = '验证码错误'
    return
  }

  const { data } = await login_api(phone.value)
  if (data) {
    const userStore = useUserStore()
    userStore.token = data
    uni.setStorageSync('token', data)

    // 如果有token，则接下来获取用户信息
    await userStore.getUserInfo()

    uni.navigateBack({
      delta: 2
    })
  } else {
    uni.$u.route('/pages/basic/basic', {
      phone: phone.value
    })
  }
}
const back = () => {
  uni.navigateBack()
}
const get_code = () => {
  second.value = 10
  right_code.value = uni.$u.guid(6, false, 10)
  const interval = setInterval(() => {
    second.value--
    if (second.value === 0) {
      clearInterval(interval)
    }
  }, 1000)
}
</script>

<style lang="scss">
page {
  background-color: #fff;
}

.msg {
  z-index: 100;
}
</style>
