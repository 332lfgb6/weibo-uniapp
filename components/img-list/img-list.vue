<template>
  <view class="img-list">
    <u-upload
      v-if="show"
      :maxCount="maxCount"
      :limitType="['png', 'jpg', 'jpeg', 'webp', 'gif', 'jfif']"
      :action="action"
      :formData="{ folder: 'post_imgs' }"
      :file-list="fileList"
      :customBtn="!upload"
      :deletable="upload"
      @on-success="onSuccess"
      @on-remove="onRemove"
    ></u-upload>
  </view>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'

const props = defineProps({
  upload: Boolean,
  modelValue: Array,
  maxCount: {
    type: Number,
    default: 9
  }
})

const emits = defineEmits(['update:modelValue'])

const action = `${import.meta.env.VITE_BASE_URL}/api/common/upload`

const show = ref(true)

const fileList = computed({
  get() {
    // console.log('get:', props.modelValue)
    return props.modelValue.map(v => ({ url: v }))
  },
  set(newV) {
    // console.log('newV:', newV)
    emits('update:modelValue', newV)
  }
})

const onSuccess = (res: iResString) => {
  show.value = false
  // fileList.value.push(res.data)
  // fileList.value = fileList.value
  props.modelValue.push(res.data)
  nextTick(() => {
    show.value = true
  })
}
const onRemove = (i: number) => {
  show.value = false
  // fileList.value.splice(i, 1)
  // fileList.value = fileList.value
  props.modelValue.splice(i, 1)
  nextTick(() => {
    show.value = true
  })
}
</script>

<style lang="scss" scoped>
.img-list {
  padding: 0 45upx;
}
</style>
