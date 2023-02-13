<template>
  <i class="iconfont" :class="`icon-${name}`" @click="$emit('click')"></i>
</template>

<script lang="ts" setup>
defineProps({
  name: String
})

defineEmits(['click'])
</script>

<style lang="scss" scoped></style>
