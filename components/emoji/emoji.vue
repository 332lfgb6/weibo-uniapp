<template>
  <scroll-view class="emoji_list" scroll-y>
    <u-grid :col="7" :border="false">
      <u-grid-item v-for="v of emoji_store.emoji_arr" :key="v.text" @click="$emit('insertEmoji', `[${v.text}]`)">
        <u-avatar size="64" :src="`/static/emoji/${v.filename}.png`"></u-avatar>
      </u-grid-item>
    </u-grid>
  </scroll-view>
</template>

<script lang="ts" setup>
import { useEmojiStore } from '../../store/emoji'

const emoji_store = useEmojiStore()

defineEmits(['insertEmoji'])
</script>

<style lang="scss" scoped>
.emoji_list {
  height: 160px;
}
</style>
