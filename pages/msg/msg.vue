<template>
  <view>
    <u-navbar title="消息箱"></u-navbar>

    <u-cell-group>
      <u-cell-item v-for="(v, i) of interact" :key="i" :title="v.text" @click="$u.route(`/pages/${v.page}/${v.page}`)" :arrow="!v.num">
        <template #icon>
          <view class="icon-container flex flex-center q-mr-md text-white" :class="`bg-${v.color}`">
            <u-icon :name="v.icon" size="56"></u-icon>
          </view>
        </template>
        <template #right-icon>
          <u-badge :absolute="false" type="error" :count="v.num"></u-badge>
        </template>
      </u-cell-item>

      <u-cell-item
        v-for="v in list"
        :key="v.id"
        :title="v.nickname"
        :arrow="false"
        @click="
          $u.route('/pages/chat/chat', {
            id: v.user_id
          })
        "
      >
        <template #icon>
          <avatar :src="v.avatar" :auth="v.auth"></avatar>
        </template>
        <template #label>
          <rich-text :nodes="v.content" />
        </template>
        <template #right-icon>
          <text>{{ v.send_time }}</text>
          <u-badge v-if="v.unread" type="error" :count="v.unread"></u-badge>
        </template>
      </u-cell-item>
    </u-cell-group>
  </view>
</template>

<script lang="ts" setup>
import { onReachBottom, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getLastChatListApi } from '../../request/last-chat'
import { getInteractNumApi } from '../../request/common'
import { useEmojiStore } from '../../store/emoji'

const emojiStore = useEmojiStore()

let page = 1
let totalPages = 0

const interact = ref([{ icon: 'thumb-up', color: 'orange-7', num: 0, text: '赞', page: 'zan' }])
const list = ref([])

onShow(async () => {
  const { data } = await getInteractNumApi()
  interact.value[0].num = data

  list.value = []
  page = 1
  getLastChatList()
})
onReachBottom(() => {
  page <= totalPages && getLastChatList()
})

const getLastChatList = async () => {
  const { data } = await getLastChatListApi(page)

  data.data.map(v => {
    // 解析表情字符串
    v.content = emojiStore.parseContent(v.content)
    v.send_time = uni.$u.timeFrom(new Date(v.send_time))
    return v
  })

  list.value.push(...data.data)
  page++
  totalPages = data.totalPages
}
</script>

<style lang="scss" scoped>
.icon-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
