<template>
  <view class="actions bg-white q-px-md q-py-sm fixed-bottom" :style="{ bottom }" @touchstart.stop="">
    <textarea
      v-if="commentMode"
      class="q-mb-md full-width"
      focus
      v-model="content"
      auto-height
      :placeholder="placeholder"
      :adjust-position="false"
      @click="getSelectedTextRange"
      @input="getSelectedTextRange"
      @focus="show.emoji = false"
      @keyboardheightchange="xxx"
    ></textarea>

    <view class="row q-col-gutter-md items-center">
      <text class="col ellipsis" :class="content ? 'u-main-color' : 'u-tips-color'" @click="commentMode = true">
        {{ leftBottomContent }}
      </text>
      <template v-if="id && !parent_id && !commentMode">
        <extra-icon name="exchange" @click="zhuanfa"></extra-icon>
        <extra-icon
          :class="zaned ? 'text-orange-10' : ''"
          :name="zaned ? 'good-job' : 'good-job-o'"
          @click="zanPost"
        ></extra-icon>
        <extra-icon name="share-o" @click="share"></extra-icon>
      </template>
      <template v-else>
        <extra-icon :name="show.emoji ? 'revoke' : 'smile-o'" @click="show.emoji = !show.emoji"></extra-icon>
        <view>
          <u-button class="send-btn" type="primary" size="mini" :disabled="!content" @click="publish">发送</u-button>
        </view>
      </template>
    </view>

    <emoji v-show="show.emoji" @insertEmoji="insertEmoji"></emoji>
  </view>
</template>

<script lang="ts" setup>
import { zan_post_api } from '@/request/zan'
import { ref, computed } from 'vue'
import { useEmojiStore } from '@/store/emoji'
import { pub_comment_api } from '@/request/comment'
import { pubMsgApi } from '../../request/chat'

const props = defineProps({
  zaned: Number,
  id: Number, // 发评论的时候，需要帖子的post_id
  user_id: Number, // 私信的时候，需要接收者的user_id
  modelValue: Boolean,
  parent_id: {
    type: Number,
    default: 0
  },
  reply_id: {
    type: Number,
    default: 0
  },
  nickname: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['zanPost', 'update:modelValue', 'updateHeight', 'pubContent'])

const emojiStore = useEmojiStore()

let selectedTextRange: number

const content = ref('')
const show = ref({
  emoji: false
})
const bottom = ref('0')

const placeholder = computed(() => {
  // return props.nickname ? `回复 @${props.nickname}` : '发表评论'
  if (props.nickname) {
    return `回复 @${props.nickname}:`
  }

  if (props.id) {
    return '发表评论'
  }

  return '说点什么'
})
const commentMode = computed({
  get() {
    return props.modelValue
  },
  set(newV) {
    emits('update:modelValue', newV)
  }
})
const leftBottomContent = computed(() => {
  if (commentMode.value) {
    return ''
  } else {
    return content.value ? content.value : placeholder.value
  }
})

const publish = async () => {
  if (content.value) {
    let emitData: any
    // 发评论
    if (props.id) {
      const { data } = await pub_comment_api(content.value, props.id, props.parent_id, props.reply_id)
      emitData = data
    } else {
      // 发私信
      const { data } = await pubMsgApi(props.user_id, content.value)
      emitData = data
    }
    content.value = ''

    // 解析表情字符串
    emitData.content = emojiStore.parseContent(emitData.content)

    // console.log(222);

    emits('pubContent', emitData)
    commentMode.value = false

    show.value.emoji = false
  }
}
const getSelectedTextRange = () => {
  uni.getSelectedTextRange({
    success: res => {
      selectedTextRange = res.start
    }
  })
}
const insertEmoji = (e: string) => {
  content.value = emojiStore.insertEmoji(content.value, selectedTextRange, e)
  selectedTextRange += e.length
}
const xxx = e => {
  // const height = `${uni.getSystemInfoSync().screenHeight - e.detail.height}px`
  // emits('updateHeight', height)
  bottom.value = `${e.detail.height}px`
}
const share = () => {
  uni.setClipboardData({
    data: `${import.meta.env.VITE_COPY_URL}/#/pages/detail/detail?id=${props.id}`,
    success: function() {
      uni.$u.toast('已复制链接')
    }
  })
}
const zhuanfa = () => {
  // const common_store = useCommonStore()
  // common_store.post_i = props.i
  uni.$u.route('/pages/write/write', { refer_id: props.id })
}
const zanPost = async () => {
  await zan_post_api(props.id, props.user_id)
  emits('zanPost', props.zaned ? 0 : 1)
}
</script>

<style lang="scss" scoped>
.actions {
  border-top: 1px solid $u-border-color;
  z-index: 2;
  .emoji-send {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .send-btn {
      padding: 8px 16px !important;
      font-size: 14px !important;
      margin: 0;
      background-color: #1b9af4;
    }
  }
}
</style>
