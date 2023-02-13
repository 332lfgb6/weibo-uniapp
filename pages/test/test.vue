<template>
  <view class="test"><u-button @click="sendSocketMessage('哈哈')">发送</u-button></view>
</template>

<script lang="ts" setup>
// uni.connectSocket({
//   url: 'ws://192.168.1.104:8360/ws',
//   header: {
//     Authorization: '7788'
//   }
// })

var socketOpen = true
// var socketMsgQueue = []

// uni.onSocketOpen(function(res) {
//   console.log('链接成功')
//   socketOpen = true
//   for (var i = 0; i < socketMsgQueue.length; i++) {
//     sendSocketMessage(socketMsgQueue[i])
//   }
//   socketMsgQueue = []
// })

// uni.onSocketError(function(res) {
//   console.log('WebSocket连接打开失败，请检查！')
// })

function sendSocketMessage(msg) {
  msg = JSON.stringify({
    event: 'addUser',
    data: msg
  })

  if (socketOpen) {
    uni.sendSocketMessage({
      data: msg
    })
  } else {
    socketMsgQueue.push(msg)
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 200upx;
  height: 200upx;
  background-color: green;
}
</style>
