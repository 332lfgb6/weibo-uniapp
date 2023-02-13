import http from './config'

export const login_api = (phone: string) => {
  return http.post('/user/login', { phone })
}

interface iForm {
  avatar: string
  nickname: string
  phone: string
  vip: number
  auth: number
  brief: string
  wallpaper: string
  gender: number
}

export const finish_basic_info_api = (form: iForm) => {
  return http.post('/user/finishBasicInfo', form, {
    custom: {
      successToast: true
    }
  })
}

export const get_user_info_api = (id?: number) => {
  return http.post('/user/getUserInfo', { id })
}
