<template>
  <view class="write">
    <u-navbar :background="{ backgroundColor: '#fafafa' }" :title="title">
      <template #right>
        <text class="text-blue q-mr-md" :class="content ? '' : 'disabled'" @click="pub">发布</text>
      </template>
    </u-navbar>

    <view class="q-pa-md">
      <textarea
        auto-height
        v-model="content"
        :placeholder="placeholder"
        @click="getSelectedTextRange"
        @input="getSelectedTextRange"
        @focus="show.emoji = false"
        @keyboardheightchange="xxx"
      ></textarea>
    </view>

    <img-list v-if="!post.id && !comment.id" v-model="postImgs" upload></img-list>

    <u-cell-group v-if="post.id">
      <u-cell-item bgColor="#f7f7f7" :title="`@${post.nickname}`" :label="post.content" :arrow="false">
        <template #icon>
          <u-image class="q-mr-md" width="84px" height="84px" :src="get_cover()"></u-image>
        </template>
      </u-cell-item>
    </u-cell-group>

    <view class="fixed-bottom q-pa-md" :style="{ bottom }">
      <view class="flex justify-between items-center">
        <u-checkbox v-if="post.id || comment.id" v-model="common_store.together">
          同时{{ post.id ? '评论' : '转发' }}
        </u-checkbox>
        <view v-else></view>

        <u-tag
          shape="circle"
          color="#4e7cb1"
          bgColor="#f8f8f8"
          borderColor="#e4e4e4"
          :text="tag_text"
          @click="click_tag"
        ></u-tag>
      </view>

      <view class="q-mt-md">
        <extra-icon :name="show.emoji ? 'revoke' : 'smile-o'" @click="show.emoji = !show.emoji"></extra-icon>
      </view>

      <emoji v-show="show.emoji" @insertEmoji="insertEmoji"></emoji>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { get_post_detail_api, pub_api } from '../../request/post'
import { onLoad } from '@dcloudio/uni-app'
import { getCommentInfoApi, pub_comment_api } from '../../request/comment'
import { useCommonStore } from '../../store/common'
import { useEmojiStore } from '../../store/emoji'
import ImgList from '../../components/img-list/img-list.vue'

const common_store = useCommonStore()
const emojiStore = useEmojiStore()

let selectedTextRange = 0

const bottom = ref('0px')
const postImgs = ref([])
const show = ref({
  emoji: false
})
const content = ref('')
const tag_text = ref('公开')
const height = ref('100%')
const post = ref({
  id: 0,
  nickname: '',
  avatar: '',
  time: '',
  auth: 0,
  content: '',
  post_imgs: []
})
const comment = ref({
  id: 0,
  nickname: '',
  post_id: 0
})

const placeholder = computed(() => {
  if (post.value.id) return '说说分享心得...'
  if (comment.value.id) return `回复 @${comment.value.nickname}`
  return '分享新鲜事...'
})
const title = computed(() => {
  if (post.value.id) return '转发微博'
  if (comment.value.id) return `回复评论`
  return ''
})

onLoad(async option => {
  const refer_id = parseInt(option.refer_id)
  const commentId = parseInt(option.commentId)

  if (refer_id) {
    const { data } = await get_post_detail_api(refer_id)
    post.value = data
  }

  if (commentId) {
    const { data } = await getCommentInfoApi(commentId)
    comment.value = data
  }
})

const xxx = e => {
  bottom.value = `${e.detail.height}px`
}
const insertEmoji = (e: string) => {
  content.value = emojiStore.insertEmoji(content.value, selectedTextRange, e)
  selectedTextRange += e.length
}
const click_tag = () => {
  switch (tag_text.value) {
    case '公开':
      tag_text.value = '朋友圈'
      break
    case '朋友圈':
      tag_text.value = '私密'
      break
    case '私密':
      tag_text.value = '公开'
      break
  }
}
const pub = async () => {
  const _content = content.value
  if (_content) {
    const refer_id = post.value.id
    const comment_id = comment.value.id

    // 发微博 || 转发微博 || 同时转发
    if ((!refer_id && !comment_id) || refer_id || common_store.together) {
      await pub_api(_content, postImgs.value, refer_id)
    }

    // 发评论 || 同时评论
    if (comment_id || common_store.together) {
      const post_id = refer_id || comment.value.post_id
      const parent_id = comment_id ? comment_id : 0
      await pub_comment_api(_content, post_id, parent_id)
    }

    if (refer_id || comment_id) {
      common_store.update_num = true
    }

    uni.$u.toast('发布成功')

    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
}
const get_cover = () => {
  const first_post_img = post.value.post_imgs[0]
  const avatar = post.value.avatar
  return first_post_img ? first_post_img : avatar
}
const getSelectedTextRange = () => {
  uni.getSelectedTextRange({
    success: res => {
      selectedTextRange = res.start
    }
  })
}
</script>

<style lang="scss">
page {
  background-color: #fff;
}
</style>

<style lang="scss" scoped>
.write {
  textarea {
    width: 100%;
  }
}
</style>
