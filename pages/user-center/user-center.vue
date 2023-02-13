<template>
  <view>
    <u-navbar title="用户中心">
      <template #right>
        <u-icon name="close" size="20px" class="q-pr-md" @click="exit_login"></u-icon>
      </template>
    </u-navbar>

    <u-cell-group :border="false">
      <u-cell-item :arrow="false">
        <template #icon>
          <avatar :src="userStore.avatar" :auth="userStore.auth" :size="140"></avatar>
        </template>
        <template #title>
          <view>{{ userStore.nickname }}</view>
        </template>
        <template #label>
          <view>{{ userStore.brief }}</view>
        </template>
      </u-cell-item>
    </u-cell-group>

    <view class="q-pa-md row q-col-gutter-md">
      <view>
        <text>{{ userStore.post_num }}</text>
        <view>微博</view>
      </view>
      <view>
        <text>{{ userStore.follow_num }}</text>
        <view>关注</view>
      </view>
      <view>
        <text>{{ userStore.fans_num }}</text>
        <view>粉丝</view>
      </view>
      <view class="col"><u-button @click="$u.route('/pages/basic/basic')">编辑个人资料</u-button></view>
    </view>

    <post
      v-for="(v, i) of post_list"
      :key="v.id"
      :nickname="userStore.nickname"
      :avatar="userStore.avatar"
      :time="v.time"
      :auth="userStore.auth"
      :content="v.content"
      :id="v.id"
      :user_id="v.user_id"
      :post-imgs="v.post_imgs"
      show_actions
      :zaned="v.zaned"
      :zan_num="v.zan_num"
      @zan_post="zan_post(i)"
      @delPost="post_list.splice(i, 1)"
    ></post>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { get_post_list_api } from '../../request/post'
import { useUserStore } from '../../store/user'
import { onReachBottom, onShow } from '@dcloudio/uni-app'
import { useEmojiStore } from '../../store/emoji'
import { useCommonStore } from '../../store/common'

const userStore = useUserStore()
const emojiStore = useEmojiStore()
const common_store = useCommonStore()

const page = ref(1)
const total_pages = ref(0)
const post_list = ref([])
const stat = ref('loading')

onShow(() => {
  // 增加播放量
  if (common_store.increaseView) {
    const current = post_list.value[common_store.i]
    current.view++
    common_store.increaseView = false
  }
})
onReachBottom(() => {
  if (page.value <= total_pages.value) {
    get_post_list()
  }
})

const get_post_list = async () => {
  const { data } = await get_post_list_api(page.value, null, 1)

  // 解析表情字符串
  data.data = data.data.map(v => {
    v.content = emojiStore.parseContent(v.content)
    return v
  })

  post_list.value.push(...data.data)
  total_pages.value = data.totalPages
  total_pages.value <= page.value && (stat.value = 'nomore')
  page.value++
}
get_post_list()
const exit_login = () => {
  uni.showModal({
    title: userStore.nickname,
    content: '确定要退出登录吗？',
    success: res => {
      if (res.confirm) {
        userStore.token = ''
        uni.removeStorageSync('token')

        userStore.nickname = ''
        userStore.id = 0
        userStore.avatar = ''
        userStore.auth = 0
        userStore.vip = 0
        userStore.wallpaper = ''
        userStore.gender = 1
        userStore.brief = ''
        userStore.post_num = 0
        userStore.follow_num = 0
        userStore.fans_num = 0

        uni.navigateBack()
      }
    }
  })
}
const zan_post = (i: number) => {
  const post = post_list.value[i]
  post.zaned = post.zaned ? 0 : 1
  post.zaned ? post.zan_num++ : post.zan_num--
}
</script>

<style lang="scss" scoped></style>
