<template>
  <u-cell-item class="comment" :arrow="false" :value-style="{ display: 'none' }" @click="showActions">
    <template #icon>
      <avatar :src="avatar" :user_id="user_id"></avatar>
    </template>
    <template #title>
      <view>
        <text class="text-orange-10">{{ nickname }}</text>
        <text v-if="reply_nickname">
          回复
          <text class="text-orange-10">{{ reply_nickname }}</text>
        </text>
      </view>
      <rich-text :nodes="content" @itemclick="showActions"></rich-text>
      <view
        v-if="reply_num && showChildCommentNum"
        class="bg-grey-4 text-blue q-px-md q-my-sm rounded-borders"
        @click.stop="$u.route('/pages/child-comment/child-comment', { id })"
      >
        查看{{ reply_num }}条回复 >
      </view>
    </template>
    <template #label>
      <view class="full-width flex justify-between">
        <view>
          <text>{{ time }}</text>
          <text class="q-ml-md">{{ ip }}</text>
        </view>
        <view>
          <view class="inline-block" :class="zaned ? 'text-orange-10' : ''" @click.stop="zan_comment">
            <u-icon size="20px" :name="zaned ? 'thumb-up-fill' : 'thumb-up'"></u-icon>
            <text class="q-ml-sm q-mr-md">{{ zan_num }}</text>
          </view>
          <view class="inline-block" @click.stop="$emit('clickCommentIcon')">
            <u-icon size="20px" name="chat"></u-icon>
          </view>
        </view>
      </view>
    </template>
  </u-cell-item>
</template>

<script lang="ts" setup>
import { delCommentApi } from '@/request/comment'
import { zan_comment_api } from '@/request/zan-comment'
import { useUserStore } from '@/store/user'

const props = defineProps({
  avatar: String,
  nickname: String,
  reply_nickname: String,
  content: String,
  time: String,
  ip: String,
  zaned: Number,
  zan_num: Number,
  id: Number,
  user_id: Number,
  reply_num: Number,
  showChildCommentNum: Boolean
})

const emits = defineEmits(['zan_comment', 'delComment', 'clickCommentIcon'])

const userStore = useUserStore()

const zan_comment = async () => {
  await zan_comment_api(props.id, props.user_id)
  emits('zan_comment')
}
const showActions = () => {
  const itemList = ['回复']
  const isSelf = userStore.id === props.user_id
  itemList.push(isSelf ? '删除' : '举报')
  uni.showActionSheet({
    itemList,
    success: async res => {
      switch (res.tapIndex) {
        case 0:
          uni.$u.route('/pages/write/write', {
            commentId: props.id
          })
          break
        case 1:
          if (isSelf) {
            await delCommentApi(props.id)
            emits('delComment')
          } else {
            uni.$u.toast('举报成功')
          }
          break
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.comment {
  ::v-deep {
    .u-cell_title {
      flex: 1;
    }
  }
}
</style>
