<template>
  <u-loadmore class="q-py-sm" :status="status" :load-text="load_text" />
</template>

<script lang="ts" setup>
defineProps({
  status: String
})

const load_text = {
  loadmore: '上拉加载更多',
  loading: '加载中',
  nomore: '已经到底了'
}
</script>

<style lang="scss" scoped></style>
