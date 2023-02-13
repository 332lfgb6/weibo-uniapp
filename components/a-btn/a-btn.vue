<template>
  <u-button type="primary" shape="circle" :custom-style="customStyle" :disabled="disabled" @click="$emit('click')">
    {{ text }}
  </u-button>
</template>

<script lang="ts" setup>
defineProps({
  disabled: Boolean,
  text: String
})

defineEmits(['click'])

const customStyle = {
  color: '#fff',
  backgroundColor: '#1b9af4'
}
</script>

<style lang="scss" scoped></style>
