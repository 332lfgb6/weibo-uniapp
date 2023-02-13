<template>
  <view>
    <u-navbar :title="`${phone ? '完善' : '编辑'}个人资料`"></u-navbar>
    <view class="q-pa-md">
      <u-tag text="昵称和头像必填, 其它随意" type="success" />

      <u-form labelWidth="150" labelAlign="left">
        <u-form-item label="昵称："><u-input v-model="userStore.nickname" placeholder="输入昵称" /></u-form-item>
        <u-form-item label="头像：">
          <u-upload
            v-if="showFormItem"
            :action="action"
            maxCount="1"
            :fileList="userStore.avatar ? [{ url: userStore.avatar }] : []"
            @on-success="on_sucess($event, 'avatar')"
            :formData="{ folder: 'avatars' }"
          ></u-upload>
        </u-form-item>
        <u-form-item label="性别：">
          <u-radio-group v-model="userStore.gender">
            <u-radio v-for="(item, index) in genders" :key="index" :name="item.v">{{ item.name }}</u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item label="vip：">
          <u-number-box v-model="userStore.vip" disabled-input :max="7"></u-number-box>
        </u-form-item>
        <u-form-item label="认证：">
          <u-radio-group v-model="userStore.auth">
            <u-radio v-for="(item, index) in auths" :key="index" :name="item.v">{{ item.name }}</u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item label="简介：">
          <u-input type="textarea" v-model="userStore.brief" placeholder="填写简介"></u-input>
        </u-form-item>
        <u-form-item label="壁纸：">
          <u-upload
            v-if="showFormItem"
            :action="action"
            maxCount="1"
            :fileList="userStore.wallpaper ? [{ url: userStore.wallpaper }] : []"
            @on-success="on_sucess($event, 'wallpaper')"
            :formData="{ folder: 'wallpapers' }"
          ></u-upload>
        </u-form-item>
        <a-btn :disabled="!userStore.nickname || !userStore.avatar" text="保存" @click="finish_basic_info"></a-btn>
      </u-form>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { finish_basic_info_api } from '../../request/user'
import { useUserStore } from '../../store/user'
import { nextTick, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const userStore = useUserStore()

const action = `${import.meta.env.VITE_BASE_URL}/api/common/upload`
const genders = [{ name: '男', v: 1 }, { name: '女', v: 0 }]
const auths = [{ name: '无', v: 0 }, { name: '红v', v: 1 }, { name: '黄v', v: 2 }, { name: '蓝v', v: 3 }]

let phone = ref('')
const showFormItem = ref(true)

onLoad(option => {
  phone.value = option.phone
})

const finish_basic_info = async () => {
  const form = {
    avatar: userStore.avatar,
    nickname: userStore.nickname,
    phone: phone.value,
    vip: userStore.vip,
    auth: userStore.auth,
    brief: userStore.brief,
    wallpaper: userStore.wallpaper,
    gender: userStore.gender
  }
  !phone.value && delete form.phone
  const { data } = await finish_basic_info_api(form)
  if (phone.value) {
    userStore.token = data
    uni.setStorageSync('token', data)

    setTimeout(() => {
      uni.navigateBack({
        delta: 3
      })
    }, 1500)
  } else {
    setTimeout(() => {
      uni.navigateBack({
        delta: 1
      })
    }, 1500)
  }
}

const on_sucess = (res: iResString, key: string) => {
  // form.value[key] = res.data
  showFormItem.value = false
  userStore[key] = res.data
  nextTick(() => {
    showFormItem.value = true
  })
}
</script>

<style lang="scss">
page {
  background-color: #fff;
}
</style>
