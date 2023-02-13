<template>
  <view class="chat" :style="{ paddingBottom: commentMode ? '102px' : '68px' }" @touchstart="commentMode = false">
    <u-navbar :title="userinfo.nickname"></u-navbar>

    <view v-for="v of msgList" :key="v.id">
      <view v-if="v.showTime" class="q-pt-md u-tips-color text-center">{{ v.send_time_format }}</view>

      <view v-if="v.right" class="msg-user1 flex items-center q-pt-md q-pr-md">
        <u-avatar :src="userStore.avatar" size="64"></u-avatar>

        <view
          class="right-bubble text-body2 q-mr-md relative-position inline-block q-px-md q-py-sm bg-blue text-white rounded-borders"
        >
          <rich-text :nodes="v.content"></rich-text>
        </view>
      </view>

      <u-cell-group v-else class="msg-user2 " :border="false">
        <u-cell-item class="bg-transparent" :title="userinfo.nickname" :arrow="false" :border-bottom="false">
          <template #icon>
            <u-avatar class="q-mr-md" :src="userinfo.avatar" size="64"></u-avatar>
          </template>
          <template #label>
            <view
              class="left-bubble text-body2 q-mr-md relative-position inline-block q-px-md q-py-sm bg-white u-main-color rounded-borders"
            >
              <rich-text :nodes="v.content"></rich-text>
            </view>
          </template>
        </u-cell-item>
      </u-cell-group>
    </view>

    <publish v-model="commentMode" :user_id="userinfo.id" @pubContent="pubContent"></publish>
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onPageScroll, onReachBottom, onUnload } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getMsgListApi } from '../../request/chat'
import { get_user_info_api } from '../../request/user'
import { useUserStore } from '../../store/user'
import Publish from '@/components/publish/publish.vue'
import { useEmojiStore } from '../../store/emoji'



const userStore = useUserStore()
const emojiStore = useEmojiStore()

let interval
let currentMaxId = 0
let currentMinId = 0
let preYear, preMonth, preDay, preHour, preMinute

const commentMode = ref(false)
const userinfo = ref({
  id: 0,
  nickname: '',
  avatar: ''
})
const msgList = ref([])

onLoad(async opt => {
  // userinfo.value.id = parseInt(opt.id)
  const { data } = await get_user_info_api(parseInt(opt.id))
  userinfo.value = data

  await getMsgList()
  scroll()

  // 每10秒，获取一次最新的私信列表，如果存在新私信，则滚动到最底部。
  interval = setInterval(async () => {
    const len = await getMsgList(null, currentMaxId)
    len && scroll()
  }, 10000)
})
onUnload(() => {
  clearInterval(interval)
})
onPageScroll(e => {
  // console.log('页面正在滚动')
  if (e.scrollTop < 50) {
    uni.$u.debounce(async () => {
      await getMsgList(currentMinId)
    })
  }
})

onReachBottom(async () => {
  // 触底的时候，需要获取最新的私信列表，这是因为对方有可能一次性发送超过10条私信。
  await getMsgList(null, currentMaxId)
})

const pubContent = async e => {
  // debugger
  // console.log(222);
  await getMsgList(null, currentMaxId)
  scroll()
}
const getMsgList = async (current_min_id?: number, current_max_id?: number) => {
  const { data } = await getMsgListApi(userinfo.value.id, current_min_id, current_max_id)
  // debugger

  // 由于后端获取数据库记录的特性，获取历史私信列表的时候，需要把数组倒叙。
  if (!current_max_id) {
    data.data.reverse()
  }

  data.data.map((v, i) => {
    v.content = emojiStore.parseContent(v.content)

    // 格式化发送时间
    const current = new Date()
    const currentYear = current.getFullYear()
    const currentMonth = current.getMonth() + 1
    const currentDay = current.getDate()
    const currentHour = current.getHours()
    const currentMinute = current.getMinutes()
    const currentSecond = current.getSeconds()
    const currentTimestamp = current.getTime()

    const date = new Date(v.send_time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const timestamp = date.getTime()

    let time = v.send_time.split(' ')[1].split(':')
    time.pop()
    time = time.join(':')

    let label
    if (hour >= 18) {
      label = '晚上'
    } else if (hour >= 13) {
      label = '下午'
    } else if (hour >= 12) {
      label = '中午'
    } else if (hour > 6) {
      label = '上午'
    } else {
      label = '凌晨'
    }

    // 当天的私信，格式为：12: 55
    if (currentYear === year && currentMonth === month && currentDay === day) {
      v.send_time_format = `${label}${time}`
    } else if (currentYear === year && (currentMonth !== month || currentDay !== day)) {
      v.send_time_format = `${month}月${day}日 ${label}${time}`
    } else {
      v.send_time_format = `${year}年${month}月${day}日 ${label}${time}`
    }

    // 如果互相发送的私信的时间在同一分钟内，则只有最前面的显示时间
    const updatePreTime = () => {
      preYear = year
      preMonth = month
      preDay = day
      preHour = hour
      preMinute = minute
    }

    // current_max_id和current_min_id都没有，代表第一次获取私信列表
    if (!current_max_id && !current_min_id && data.data.length) {
      if (i === 7) {
        // debugger
      }

      if (i === 0) {
        updatePreTime()
        currentMaxId = v.id
        currentMinId = v.id
        v.showTime = true
        return v
      }

      if (preYear === year && preMonth === month && preDay === day && preHour === hour && preMinute === minute) {
        v.showTime = false
      } else {
        v.showTime = true
      }
      // console.log(preMinYear, preMinMonth, preMinDay, preMinHour, preMinMinute)
      updatePreTime()

      if (i === data.data.length - 1) {
        currentMaxId = v.id
      }

      return v
    }

    // 有current_min_id，代表正在获取历史私信列表
    if (current_min_id && !current_max_id && data.data.length) {
      if (i === 0) {
        currentMinId = v.id
        updatePreTime()
        v.showTime = true
        return v
      }

      v.showTime = !(
        preYear === year &&
        preMonth === month &&
        preDay === day &&
        preHour === hour &&
        preMinute === minute
      )
      updatePreTime()

      if (i === data.data.length - 1) {
        const rendered = new Date(msgList.value[0].send_time)
        const renderedYear = rendered.getFullYear()
        const renderedMonth = rendered.getMonth() + 1
        const renderedDay = rendered.getDate()
        const renderedHour = rendered.getHours()
        const renderedMinute = rendered.getMinutes()

        if (
          renderedYear === year &&
          renderedMonth === month &&
          renderedDay === day &&
          renderedHour === hour &&
          renderedMinute === minute
        ) {
          msgList.value[0].showTime = false
        }
      }

      return v
    }

    // 有current_max_id，代表正在获取最新私信列表
    if (!current_min_id && current_max_id && data.data.length) {
      if (i === 0) {
        const rendered = new Date(msgList.value[msgList.value.length - 1].send_time)
        const renderedYear = rendered.getFullYear()
        const renderedMonth = rendered.getMonth() + 1
        const renderedDay = rendered.getDate()
        const renderedHour = rendered.getHours()
        const renderedMinute = rendered.getMinutes()

        if (
          renderedYear === year &&
          renderedMonth === month &&
          renderedDay === day &&
          renderedHour === hour &&
          renderedMinute === minute
        ) {
          v.showTime = false
        } else {
          v.showTime = true
        }
        updatePreTime()
        currentMaxId = v.id

        return v
      }

      v.showTime = !(
        preYear === year &&
        preMonth === month &&
        preDay === day &&
        preHour === hour &&
        preMinute === minute
      )
      updatePreTime()

      if (i === data.data.length - 1) {
        currentMaxId = v.id
      }

      return v
    }
  })

  // console.log(JSON.parse(JSON.stringify(data.data)))

  msgList.value[current_max_id ? 'push' : 'unshift'](...data.data)

  return data.data.length
}
const scroll = () => {
  uni.pageScrollTo({
    duration: 0,
    scrollTop: 9999
  })
}
</script>

<style lang="scss">
page {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.chat {
  min-height: 100%;

  .msg-user1 {
    flex-direction: row-reverse;

    .right-bubble::after {
      position: absolute;
      top: 5px;
      right: -20px;
      content: '';
      border: 10px solid;
      border-top: 5px solid;
      border-color: transparent transparent transparent #2196f3;
    }
  }

  .msg-user2 {
    ::v-deep {
      .u-cell-item-box {
        background-color: #0000;
        .u-cell {
          padding-bottom: 0;
        }
      }
    }

    .left-bubble::before {
      position: absolute;
      top: 5px;
      left: -20px;
      content: '';
      border: 10px solid;
      border-top: 5px solid;
      border-color: transparent white transparent transparent;
    }
  }
}
</style>
