<template>
  <view class="post bg-white" @click="click_post">
    <u-cell-group :border="false">
      <u-cell-item :title="nickname" :label="time" :arrow="false" :border-bottom="false">
        <template #icon>
          <avatar :src="avatar" :auth="auth" :user_id="user_id"></avatar>
        </template>
      </u-cell-item>
    </u-cell-group>
    <view class="q-pa-md"><rich-text :nodes="content"></rich-text></view>

    <!-- <view class="q-pa-sm">
      <u-grid :col="3" :border="false">
        <u-grid-item v-for="(v, i) in postImgs" :key="i" :customStyle="{ padding: '4px' }">
          <image style="width: 230upx; height: 230upx;" mode="aspectFill" :src="v" @click.stop="handleClick(i)"></image>
        </u-grid-item>
      </u-grid>
    </view> -->
    <img-list v-if="postImgs.length" :modelValue="postImgs"></img-list>

    <view class="q-px-md">
      <view
        class="cover-container relative-position text-white"
        v-if="video"
        @click.stop="$u.route('/pages/video/video', { id: video })"
      >
        <u-image height="100%" :src="cover"></u-image>

        <view class="play absolute-center flex flex-center"><u-icon name="play-right-fill"></u-icon></view>

        <view class="view-duration absolute-bottom q-pa-sm flex justify-between u-font-12">
          <text>{{ view }}次播放</text>
          <text>{{ duration }}</text>
        </view>
      </view>
    </view>

    <view v-if="show_actions" class="q-pa-md flex justify-between">
      <view class="q-gutter-md">
        <view class="action" @click.stop="zhuanfa">
          <u-icon size="20px" class="q-mr-sm" name="zhuanfa"></u-icon>
          {{ zhuanfa_num }}
        </view>
        <view class="action">
          <u-icon size="20px" class="q-mr-sm" name="chat"></u-icon>
          {{ comment_num }}
        </view>
        <view class="action" :class="zaned ? 'text-orange-10' : ''" @click.stop="zan_post">
          <u-icon size="20px" class="q-mr-sm" :name="zaned ? 'thumb-up-fill' : 'thumb-up'"></u-icon>
          {{ zan_num }}
        </view>
      </view>
      <view @click.stop="share"><u-icon name="more-dot-fill"></u-icon></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { delPostApi } from '@/request/post'
import { zan_post_api } from '@/request/zan'
import { useCommonStore } from '@/store/common'
import { useUserStore } from '@/store/user'
import ImgList from '../img-list/img-list.vue'

const props = defineProps({
  nickname: String,
  avatar: String,
  auth: Number,
  time: String,
  content: String,
  id: Number,
  user_id: Number,
  postImgs: Array,
  zaned: Number,
  zan_num: Number,
  zhuanfa_num: Number,
  comment_num: Number,
  show_actions: Boolean,
  i: Number,
  is_vertical: Number,
  video: Number,
  cover: String,
  duration: String,
  view: Number
})

const emits = defineEmits(['zan_post', 'delPost'])

const userStore = useUserStore()

// const handleClick = (idx: number) => {
//   uni.previewImage({
//     current: idx,
//     urls: props.postImgs as string[]
//   })
// }
const share = () => {
  const itemList = ['复制链接']
  userStore.id === props.user_id && itemList.push('删除')
  uni.showActionSheet({
    itemList,
    success: function(res) {
      switch (res.tapIndex) {
        case 0:
          uni.setClipboardData({
            data: `${import.meta.env.VITE_COPY_URL}/#/pages/detail/detail?id=${props.id}`,
            success: async function() {
              uni.$u.toast('已复制链接')
            }
          })
          break
        case 1:
          uni.showModal({
            content: '确定要删除此条微博吗？',
            success: async res => {
              if (res.confirm) {
                await delPostApi(props.id)
                emits('delPost')
              }
            }
          })
          break
      }
    }
  })
}

const zan_post = async () => {
  await zan_post_api(props.id, props.user_id)
  emits('zan_post')
}
const zhuanfa = () => {
  const common_store = useCommonStore()
  common_store.post_i = props.i
  uni.$u.route('/pages/write/write', { refer_id: props.id })
}
const click_post = () => {
  if (props.show_actions) {
    uni.$u.route('/pages/detail/detail', { id: props.id })
  }
}
</script>

<style lang="scss" scoped>
.post {
  border-bottom: 1px solid #e6e6e6;
  .cover-container {
    height: 200px;
    .play {
      width: 54px;
      height: 54px;
      border-radius: 27px;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .view-duration {
      background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
    }
  }

  .action {
    display: inline-flex;
    align-items: center;
  }
}
</style>
