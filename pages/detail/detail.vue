<template>
  <view class="detail" @touchstart="commentMode = false">
    <u-navbar title="微博正文">
      <template #right>
        <u-icon class="q-mr-md" name="more-dot-fill" @click="share"></u-icon>
      </template>
    </u-navbar>

    <post
      :nickname="post.nickname"
      :avatar="post.avatar"
      :time="post.time"
      :auth="post.auth"
      :user_id="post.user_id"
      :content="post.content"
      :post-imgs="post.post_imgs"
    ></post>

    <u-tabs
      class="q-mt-md"
      :list="list"
      v-model="current"
      @change="change_tabs"
      inactiveColor="#a5aeb5"
      activeColor="#697480"
    ></u-tabs>

    <template v-if="current === 1">
      <u-cell-group>
        <comment
          v-for="(v, i) of comment_list"
          :key="v.id"
          :id="v.id"
          :user_id="v.user_id"
          :avatar="v.avatar"
          :nickname="v.nickname"
          :content="v.content"
          :auth="v.auth"
          :time="v.time"
          :ip="v.ip"
          :zaned="v.zaned"
          :zan_num="v.zan_num"
          :reply_num="v.reply_num"
          @zan_comment="zan_comment(i)"
          showChildCommentNum
          @delComment="comment_list.splice(i, 1)"
          @clickCommentIcon="
            $u.route('/pages/write/write', {
              commentId: id
            })
          "
        ></comment>
      </u-cell-group>
      <u-loadmore class="q-py-sm" :status="stat1" :load-text="load_text" />
    </template>

    <template v-if="current === 2">
      <u-cell-group>
        <u-cell-item v-for="v of zaned_user_list" :key="v.id" :title="v.nickname" :arrow="false">
          <template #icon>
            <u-avatar class="q-mr-md" :src="v.avatar" size="64"></u-avatar>
          </template>
        </u-cell-item>
      </u-cell-group>
      <u-loadmore class="q-py-sm" :status="stat2" :load-text="load_text" />
    </template>

    <publish
      v-model="commentMode"
      :id="post.id"
      :zaned="post.zaned"
      @zanPost="post.zaned = $event"
      @pubContent="pubContent"
    ></publish>
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onReachBottom, onShow } from '@dcloudio/uni-app'
import { nextTick, ref } from 'vue'
import { get_post_detail_api } from '../../request/post'
import Post from '@/components/post/post.vue'
import { get_comment_list_api } from '../../request/comment'
import { get_zaned_user_list_api } from '../../request/zan'
import { useEmojiStore } from '../../store/emoji'
import { useCommonStore } from '../../store/common'

const emojiStore = useEmojiStore()
const common_store = useCommonStore()

let page0 = 1
let page1 = 1
let page2 = 1
const filter: iFilter2 = {
  page: 1,
  post_id: 0
}
const filter2: iFilter2 = {
  page: 1,
  post_id: 0
}
const load_text = {
  loadmore: '上拉加载',
  loading: '加载中',
  nomore: '到底了'
}

const commentMode = ref(false)
const height = ref('calc(100vh - 44px)')
const post = ref({
  id: 0,
  user_id: 0,
  nickname: '',
  avatar: '',
  time: '',
  auth: 0,
  content: '',
  post_imgs: [],
  zaned: 0
})
const stat1 = ref('loading')
const stat2 = ref('loading')
const current = ref(1)
const list = ref([{ name: '转发' }, { name: '评论' }, { name: '赞' }])
const comment_list = ref([])
const zaned_user_list = ref([])
// const loading = ref(false)
let total_pages0 = 0 // 转发微博总页数
let total_pages1 = 0 // 根评论总页数
let total_pages2 = 0 // 赞过的用户总页数

onLoad(async option => {
  post.value.id = parseInt(option.id)
  let { data } = await get_post_detail_api(post.value.id)

  // 解析表情字符串
  data.content = emojiStore.parseContent(data.content)

  post.value = data

  // loading.value = true
  get_comment_list()
})
onShow(() => {
  if (common_store.update_num) {
    comment_list.value[common_store.i].reply_num++
    common_store.update_num = false
  }
})
onReachBottom(() => {
  switch (current.value) {
    case 1:
      if (filter.page <= total_pages1) {
        get_comment_list()
      }
      break
    case 2:
      if (filter2.page <= total_pages2) {
        get_zaned_user_list()
      }
      break
  }
})

const share = () => {
  const itemList = ['复制链接']
  uni.showActionSheet({
    itemList,
    success: function(res) {
      uni.setClipboardData({
        data: `${import.meta.env.VITE_COPY_URL}/#/pages/detail/detail?id=${post.value.id}`,
        success: async function() {
          uni.$u.toast('已复制链接')
        }
      })
    }
  })
}
const pubContent = e => {
  comment_list.value.push(e)
}
const get_comment_list = async () => {
  const { data } = await get_comment_list_api(page1, post.value.id)

  // 解析表情字符串
  data.data = data.data.map(v => {
    v.content = emojiStore.parseContent(v.content)
    return v
  })

  comment_list.value.push(...data.data)
  total_pages1 = data.totalPages
  stat1.value = total_pages1 <= page1 ? 'nomore' : 'loadmore'
  page1++
}
const get_zaned_user_list = async () => {
  const res = await get_zaned_user_list_api(page2, post.value.id)
  zaned_user_list.value.push(...res.data.data)
  total_pages2 = res.data.totalPages
  stat2.value = total_pages2 <= page2 ? 'nomore' : 'loadmore'
  page2++
}
const zan_comment = (i: number) => {
  const comment = comment_list.value[i]
  comment.zaned = comment.zaned ? 0 : 1
  comment.zaned ? comment.zan_num++ : comment.zan_num--
}
const change_tabs = (e: number) => {
  switch (e) {
    case 1:
      stat1.value = 'loading'
      comment_list.value = []
      page1 = 1
      nextTick(() => get_comment_list())
      break
    case 2:
      stat2.value = 'loading'
      zaned_user_list.value = []
      page2 = 1
      nextTick(() => get_zaned_user_list())
      break
  }
}
</script>

<style>
page {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.detail {
  height: 100%;
}
</style>
