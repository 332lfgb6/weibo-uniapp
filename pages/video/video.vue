<template>
  <view class="window-width window-height relative-position">
    <view class="q-pa-md absolute-top-left close" v-if="show">
      <u-icon
        name="close"
        color="white"
        size="40"
        @click="
          $u.route({
            type: 'back'
          })
        "
      ></u-icon>
    </view>
    <video class="fit" :src="src" autoplay @click="showClose" :show-fullscreen-btn="false"></video>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getVideoDataApi } from '@/request/post_video'
import { useCommonStore } from '../../store/common'

let timeout: any

const src = ref('')
const show = ref(true)

const commonStore = useCommonStore()

onLoad(async option => {
  // await
  const { data } = await getVideoDataApi(parseInt(option.id))
  src.value = data.video
  commonStore.increaseView = data.increaseView

  timeout = setTimeout(() => {
    show.value = false
  }, 3000)
})

const showClose = () => {
  show.value = !show.value
  clearTimeout(timeout)
  if (show.value) {
    timeout = setTimeout(() => {
      show.value = false
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.close {
  z-index: 1;
}
</style>
