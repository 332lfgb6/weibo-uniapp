<script lang="ts" setup>
import { useUserStore } from './store/user'
import { useCommonStore } from './store/common'
import { onLaunch } from '@dcloudio/uni-app'

const commonStore = useCommonStore()
const userStore = useUserStore()

onLaunch(async () => {
  const systemInfo = uni.getSystemInfoSync()
  commonStore.brand = systemInfo.brand || ''
  commonStore.model = systemInfo.model || ''

  // 应用启动的时候，如果本地存储中有token，则把用户信息获取过来
  if (uni.getStorageSync('token')) {
    userStore.getUserInfo()
  }

  // uni.connectSocket({
  //   url: import.meta.env.VITE_WS_URL
  // })

  // var socketOpen = false
  // var socketMsgQueue = []

  // uni.onSocketOpen(function(res) {
  //   console.log('连接成功')
  //   socketOpen = true
  //   // for (var i = 0; i < socketMsgQueue.length; i++) {
  //   //   sendSocketMessage(socketMsgQueue[i])
  //   // }
  //   // socketMsgQueue = []
  // })

  // uni.onSocketMessage(res => {
  //   console.log(res)
  // })
})
</script>

<style lang="scss">
// 字体图标
@import url('./static/iconfont/iconfont.css');

/*每个页面公共css */
@import './uni_modules/vk-uview-ui/index.scss';

@import 'help-code-fastly/src/style/quasar.prod.css';

page {
  background-color: $u-bg-color;
}

.stat-bar {
  padding-top: var(--status-bar-height);
}
</style>
