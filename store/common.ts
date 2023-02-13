import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      supplierId: 0,
      design: '', // 设计稿uri
      origin: '', // 原始订单

      update_num: false,
      together: false,
      i: 0,
      increaseView: false, // 增加播放量

      brand: '', // 设备的品牌
      model: '' // 设备的型号
    }
  },
  actions: {}
})
