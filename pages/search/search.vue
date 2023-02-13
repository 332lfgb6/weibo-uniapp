<template>
  <view class="stat-bar">
    <view class="navbar bg-white q-px-md row items-center">
      <u-icon name="arrow-left" size="20px" @click="back"></u-icon>
      <u-field
        class="input bg-grey-4 col q-ml-md"
        icon="search"
        label-width="0"
        v-model="key"
        confirm-type="搜索"
        focus
        placeholder="搜一搜"
        clearable
        @confirm="search"
      ></u-field>
    </view>

    <u-cell-group :border="false" class="q-my-md">
      <u-cell-item v-for="(v, i) of user_list" :key="v.id" :arrow="false">
        <template #icon>
          <avatar :src="v.avatar" :user_id="v.id" :auth="v.auth" :size="140"></avatar>
        </template>
        <template #title>
          <view class="text-orange-7">{{ v.nickname }}</view>
          <view>{{ v.brief }}</view>
        </template>
        <template #label>
          <view>粉丝：{{ v.fans_num }}</view>
        </template>
        <template #right-icon>
          <view v-if="!v.followed" class="text-orange-7 column items-center" @click="follow_user(v.id, i)">
            <u-icon class="q-mb-xs" name="man-add" size="28px"></u-icon>
            <text>加关注</text>
          </view>
        </template>
      </u-cell-item>
    </u-cell-group>

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
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { follow_user_api } from '../../request/follow'
import { search_api } from '../../request/common'
import { onReachBottom, onShow } from '@dcloudio/uni-app'
import { get_post_list_api } from '../../request/post'
import { useEmojiStore } from '../../store/emoji'
import { useCommonStore } from '../../store/common'

const emojiStore = useEmojiStore()
const common_store = useCommonStore()

let page = 1
let totalPages = 0

const post_list = ref([])
const stat = ref('nomore')
const key = ref('')
const user_list = ref([])

onShow(() => {
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
  const { data } = await get_post_list_api(page, null, null, key.value)

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
const back = () => {
  uni.navigateBack()
}
const search = async () => {
  if (key.value) {
    const { data } = await search_api(key.value)
    user_list.value = data.user_list

    get_post_list()
  }
}
const follow_user = async (id: number, i: number) => {
  await follow_user_api(id)
  const user = user_list.value[i]
  user.followed = 1
  user.fans_num++
}
const zan_post = (i: number) => {
  const post = post_list.value[i]
  post.zaned = post.zaned ? 0 : 1
  post.zaned ? post.zan_num++ : post.zan_num--
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 44px;
  .input {
    padding: 4px 8px;
    border-radius: 15px;
  }
}
</style>
