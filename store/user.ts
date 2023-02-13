import { defineStore } from 'pinia'
// import { ERole } from '../common/types'
import { get_user_info_api } from '@/request/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: uni.getStorageSync('token'),
      nickname: '',
      avatar: '',
      id: 0,
      auth: 0,
      vip: 0,
      wallpaper: '',
      gender: 1,
      brief: '',
      post_num: 0,
      follow_num: 0,
      fans_num: 0
    }
  },
  getters: {},
  actions: {
    async getUserInfo() {
      const { data } = await get_user_info_api()
      this.nickname = data.nickname
      this.id = data.id
      this.avatar = data.avatar
      this.auth = data.auth
      this.vip = data.vip
      this.wallpaper = data.wallpaper
      this.gender = data.gender
      this.brief = data.brief
      this.post_num = data.post_num
      this.follow_num = data.follow_num
      this.fans_num = data.fans_num
    }
  }
})
