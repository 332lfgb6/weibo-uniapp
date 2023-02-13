<template>
  <view class="profile">
    <u-navbar title="博主资料"></u-navbar>

    <user-panel
      :wallpaper="userinfo.wallpaper"
      :avatar="userinfo.avatar"
      :nickname="userinfo.nickname"
      :auth="userinfo.auth"
      :vip="userinfo.vip"
      :brief="userinfo.brief"
      :follow_num="userinfo.follow_num"
      :fans_num="userinfo.fans_num"
      :gender="userinfo.gender"
    ></user-panel>

    <post
      v-for="(v, i) of post_list"
      :key="v.id"
      :nickname="v.nickname"
      :avatar="v.avatar"
      :time="v.time"
      :auth="v.auth"
      :content="v.content"
      :id="v.id"
      :user_id="v.user_id"
      :post-imgs="v.post_imgs"
      show_actions
      :zaned="v.zaned"
      :i="i"
      :zhuanfa_num="v.zhuanfa_num"
      :comment_num="v.comment_num"
      :zan_num="v.zan_num"
      @zan_post="zan_post(i)"
      @delPost="post_list.splice(i, 1)"
    ></post>

    <loadmore :status="stat"></loadmore>

    <bottom
      v-if="userinfo.id !== userStore.id"
      :id="userinfo.id"
      :isFollow="userinfo.is_follow"
      @followUser="followUser"
    ></bottom>
  </view>
</template>

<script lang="ts" setup>
import UserPanel from './user-panel/user-panel.vue'
import { onLoad, onShow, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { get_user_info_api } from '../../request/user'
import { get_post_list_api } from '../../request/post'
import { useEmojiStore } from '../../store/emoji'
import Bottom from './bottom/bottom.vue'
import { useUserStore } from '../../store/user'
import { useCommonStore } from '../../store/common'

const emojiStore = useEmojiStore()
const userStore = useUserStore()
const common_store = useCommonStore()

let page = 1
let totalPages = 0

const post_list = ref([])
const stat = ref('loading')
const userinfo = ref({
  id: 0,
  wallpaper: '',
  avatar: '',
  nickname: '',
  auth: 0,
  vip: 0,
  brief: '',
  follow_num: 0,
  fans_num: 0,
  gender: 0,
  is_follow: 0
})

onLoad(async option => {
  const id = parseInt(option.id)
  userinfo.value.id = id

  get_post_list()
})
onShow(async () => {
  const { data } = await get_user_info_api(userinfo.value.id)
  userinfo.value = data
  
  // 增加播放量
  if (common_store.increaseView) {
    const current = post_list.value[common_store.i]
    current.view++
    common_store.increaseView = false
  }
})
onReachBottom(() => {
  if (page <= totalPages) {
    get_post_list()
  }
})

const get_post_list = async () => {
  stat.value = 'loading'
  const { data } = await get_post_list_api(page, null, null, null, userinfo.value.id)

  // 解析表情字符串
  data.data = data.data.map(v => {
    v.content = emojiStore.parseContent(v.content)
    return v
  })

  post_list.value.push(...data.data)
  totalPages = data.totalPages
  stat.value = totalPages <= page ? 'nomore' : 'loadmore'
  page++
}
const followUser = () => {
  const is_follow = userinfo.value.is_follow
  if (is_follow) {
    userinfo.value.is_follow = 0
    userinfo.value.fans_num--
  } else {
    userinfo.value.is_follow = 1
    userinfo.value.fans_num++
  }
}
</script>

<style lang="scss" scoped>
.profile {
  padding-bottom: 50px;
}
</style>
