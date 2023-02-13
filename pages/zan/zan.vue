<template>
  <view>
    <u-navbar>
      <template #default>
        <u-tabs v-model="currentTab" :list="tabs" activeColor="#000" inactiveColor="#282f3c"></u-tabs>
      </template>
    </u-navbar>

    <u-cell-group>
      <u-cell-item v-for="v of list" :key="v.id" @click="$u.route('/pages/detail/detail', { id: v.post_id })">
        <template #icon>
          <avatar :user_id="v.user_id" :src="v.avatar" :auth="v.auth"></avatar>
        </template>
        <template #title>
          <view>
            <text class="text-blue" @click.stop="$u.route('/pages/profile/profile', { id: v.user_id })">
              {{ v.nickname }}
            </text>
            赞了你的{{ v.isComment ? '评论' : '微博' }}
          </view>

          <rich-text :nodes="v.content"></rich-text>

          <view>{{ v.zan_time }} 来自 {{ v.brand + v.model }}</view>
        </template>
      </u-cell-item>
    </u-cell-group>
    <loadmore :status="stat"></loadmore>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { onShow, onReachBottom } from '@dcloudio/uni-app'
import { getZanCommentListApi } from '../../request/zan-comment'
import { getZanListApi } from '../../request/zan'
import { useEmojiStore } from '../../store/emoji'

const emojiStore = useEmojiStore()

let page = 1
let totalPages = 0

const stat = ref('loading')
const currentTab = ref(0)
const tabs = ref([{ name: '微博' }, { name: '评论' }])
const list = ref([])

watch(
  () => currentTab.value,
  () => {
    reGetList()
  }
)

const getList = async () => {
  stat.value = 'loading'
  const { data } = currentTab.value === 0 ? await getZanListApi(page) : await getZanCommentListApi(page)

  // 解析表情字符串
  data.data = data.data.map(v => {
    v.content = emojiStore.parseContent(v.content)
    return v
  })

  list.value.push(...data.data)
  totalPages = data.totalPages
  stat.value = page < totalPages ? 'loadmore' : 'nomore'
  page++
}
const reGetList = () => {
  list.value = []
  page = 1
  totalPages = 0
  getList()
}

onShow(() => {
  reGetList()
})
onReachBottom(() => {
  if (page <= totalPages) {
    getList()
  }
})
</script>

<style lang="scss" scoped>
::v-deep {
  .u-slot-content {
    justify-content: center;
  }
}
</style>
