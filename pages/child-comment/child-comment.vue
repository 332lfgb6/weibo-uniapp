<template>
  <view @touchstart="commentMode = false">
    <u-navbar :title="`${comment.reply_num}条回复`"></u-navbar>

    <u-cell-group>
      <comment
        class="q-mb-md"
        :id="comment.id"
        :user_id="comment.user_id"
        :avatar="comment.avatar"
        :nickname="comment.nickname"
        :content="comment.content"
        :auth="comment.auth"
        :time="comment.time"
        :ip="comment.ip"
        :zaned="comment.zaned"
        :zan_num="comment.zan_num"
        :reply_num="comment.reply_num"
        @zan_comment="zan_comment(-1)"
        @delComment=""
        @clickCommentIcon="clickCommentIcon(0, comment.nickname)"
      ></comment>
    </u-cell-group>

    <u-cell-group>
      <comment
        v-for="(v, i) of commentList"
        :key="v.id"
        :id="v.id"
        :user_id="v.user_id"
        :avatar="v.avatar"
        :nickname="v.nickname"
        :reply_nickname="v.reply_nickname"
        :content="v.content"
        :auth="v.auth"
        :time="v.time"
        :ip="v.ip"
        :zaned="v.zaned"
        :zan_num="v.zan_num"
        :reply_id="v.reply_id"
        @zan_comment="zan_comment(i)"
        @delComment="delComment(i)"
        @clickCommentIcon="clickCommentIcon(v.user_id, v.nickname)"
      ></comment>
    </u-cell-group>

    <loadmore :status="stat"></loadmore>

    <publish
      v-model="commentMode"
      :id="comment.post_id"
      :parent_id="comment.id"
      :reply_id="replyId"
      :nickname="nickname"
      @pubContent="pubContent"
    ></publish>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { getCommentInfoApi, get_comment_list_api } from '../../request/comment'
import { useEmojiStore } from '../../store/emoji'
import Comment from '@/components/comment/comment.vue'

const emojiStore = useEmojiStore()

let totalPages = 0
let page = 0
let total_pages = 0

const replyId = ref(0)
const nickname = ref('')
const commentMode = ref(false)
const stat = ref('loading')
const comment = ref({
  id: 0,
  nickname: '',
  avatar: '',
  auth: 0,
  user_id: 0,
  post_id: 0,
  content: '',
  ip: '',
  time: '',
  zaned: 0,
  zan_num: 0,
  reply_num: 0
})
const commentList = ref([])

onLoad(async option => {
  comment.value.id = parseInt(option.id)

  const { data } = await getCommentInfoApi(comment.value.id)

  // 解析表情字符串
  data.content = emojiStore.parseContent(data.content)

  comment.value = data

  getCommentList()
})
onReachBottom(() => {
  if (page <= totalPages) {
    getCommentList()
  }
})

const clickCommentIcon = (reply_id: number = 0, nickName: string = '') => {
  replyId.value = reply_id
  nickname.value = nickName
  commentMode.value = true
}
const pubContent = e => {
  commentList.value.push(e)
  comment.value.reply_num++
}
const delComment = (i: number) => {
  commentList.value.splice(i, 1)
  comment.value.reply_num--
}
const zan_comment = (i: number) => {
  if (i >= 0) {
    const comment = commentList.value[i]
    comment.zaned = comment.zaned ? 0 : 1
    comment.zaned ? comment.zan_num++ : comment.zan_num--
  } else {
    comment.value.zaned = comment.value.zaned ? 0 : 1
    comment.value.zaned ? comment.value.zan_num++ : comment.value.zan_num--
  }
}
const getCommentList = async () => {
  stat.value = 'loading'
  const { data } = await get_comment_list_api(page, null, comment.value.id)

  // 解析表情字符串
  data.data = data.data.map(v => {
    v.content = emojiStore.parseContent(v.content)
    return v
  })

  commentList.value.push(...data.data)
  stat.value = total_pages <= page ? 'nomore' : 'loadmore'
  page++
}
</script>

<style lang="scss" scoped></style>
