<template>
  <view class="stat-bar">
    <!-- <u-button type="primary" @click="$u.route('/pages/test/test')">前往test</u-button> -->

    <navbar :unreadNum="unreadNum"></navbar>

    <tabs @change_tab="change_tab"></tabs>

    <view v-show="category === 0">
      <post
        v-for="(v, i) of post_list.index0.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index0.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index0.stat" />
    </view>

    <view v-show="category === 1">
      <post
        v-for="(v, i) of post_list.index1.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index1.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index1.stat" />
    </view>

    <view v-show="category === 2">
      <post
        v-for="(v, i) of post_list.index2.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index2.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index2.stat" />
    </view>

    <view v-show="category === 3">
      <post
        v-for="(v, i) of post_list.index3.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index3.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index3.stat" />
    </view>

    <view v-show="category === 4">
      <post
        v-for="(v, i) of post_list.index4.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index4.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index4.stat" />
    </view>

    <view v-show="category === 5">
      <post
        v-for="(v, i) of post_list.index5.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index5.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index5.stat" />
    </view>

    <view v-show="category === 6">
      <post
        v-for="(v, i) of post_list.index6.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index6.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index6.stat" />
    </view>

    <view v-show="category === 7">
      <post
        v-for="(v, i) of post_list.index7.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index7.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index7.stat" />
    </view>

    <view v-show="category === 8">
      <post
        v-for="(v, i) of post_list.index8.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index8.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index8.stat" />
    </view>

    <view v-show="category === 9">
      <post
        v-for="(v, i) of post_list.index9.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index9.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index9.stat" />
    </view>

    <view v-show="category === 10">
      <post
        v-for="(v, i) of post_list.index10.data"
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
        :is_vertical="v.is_vertical"
        :video="v.video"
        :cover="v.cover"
        :duration="v.duration"
        :view="v.view"
        :zhuanfa_num="v.zhuanfa_num"
        :comment_num="v.comment_num"
        :zan_num="v.zan_num"
        @zan_post="zan_post(i)"
        @delPost="post_list.index10.data.splice(i, 1)"
      ></post>
      <u-loadmore class="q-py-sm" :status="post_list.index10.stat" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import Navbar from './navbar/navbar'
import Tabs from './tabs/tabs.vue'
import { get_post_list_api } from '../../request/post'
import { nextTick, ref } from 'vue'
import { onLoad, onReachBottom, onShow, onHide } from '@dcloudio/uni-app'
import { useCommonStore } from '../../store/common'
import { useEmojiStore } from '../../store/emoji'
import { getUnreadNumApi } from '../../request/common'
import { useUserStore } from '../../store/user'

const common_store = useCommonStore()
const userStore = useUserStore()
const emojiStore = useEmojiStore()

let interval: any

const unreadNum = ref(0)
const category = ref(0)
const post_list = ref({
  index0: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  },
  index1: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  },
  index2: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  },
  index3: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  },
  index4: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  },
  index5: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  },
  index6: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  },
  index7: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  },
  index8: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  },
  index9: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  },
  index10: {
    page: 1,
    total_pages: 0,
    data: [],
    stat: 'loading'
  }
})

onLoad(() => {
  get_post_list()
})
onShow(async () => {
  if (common_store.update_num) {
    const current = post_list.value[`index${category.value}`].data[common_store.i]
    current.zhuanfa_num++
    common_store.together && current.comment_num++
    common_store.update_num = false
  }

  // 如果已经登录成功，那么需要长连接获取未读消息数量
  if (userStore.token) {
    await getUnreadNum()
    interval = setInterval(() => {
      getUnreadNum()
    }, 10000)
  }

  // 增加播放量
  if (common_store.increaseView) {
    const current = post_list.value[`index${category.value}`].data[common_store.i]
    current.view++
    common_store.increaseView = false
  }
})
onHide(() => {
  clearInterval(interval)
})
onReachBottom(() => {
  const current = post_list.value[`index${category.value}`]
  if (current.page <= current.total_pages) {
    get_post_list()
  }
})

const getUnreadNum = async () => {
  const { data } = await getUnreadNumApi()
  unreadNum.value = data
}
const change_tab = (i: number) => {
  category.value = i
  nextTick(() => {
    if (!post_list.value[`index${i}`].data.length) {
      get_post_list()
    }
  })
}
const get_post_list = async () => {
  const current = post_list.value[`index${category.value}`]
  const { data } = await get_post_list_api(current.page, category.value)

  // 解析表情字符串
  data.data = data.data.map(v => {
    v.content = emojiStore.parseContent(v.content)
    return v
  })

  current.data.push(...data.data)
  current.total_pages = data.totalPages
  data.totalPages <= current.page && (current.stat = 'nomore')
  current.page++
}
const zan_post = (i: number) => {
  const post = post_list.value[`index${category.value}`].data[i]
  post.zaned = post.zaned ? 0 : 1
  post.zaned ? post.zan_num++ : post.zan_num--
}
</script>

<style lang="scss" scoped>
.index {
  padding-top: var(--status-bar-height);
}
</style>
