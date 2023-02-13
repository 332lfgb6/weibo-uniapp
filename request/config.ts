import Request from '@/js_sdk/luch-request/luch-request/index.js'
import { useUserStore } from '../store/user'
import magic_numbers from '@/common/magic_numbers'

const http = new Request()

http.setConfig(config => {
  config.baseURL = import.meta.env.VITE_BASE_URL + '/api'
  return config
})

http.interceptors.request.use(config => {
  const token = uni.getStorageSync('token')
  config.header.Authorization = token ? `Bearer ${token}` : ''

  if (config.custom && config.custom.auth && !token) {
    uni.$u.route('/pages/login/login')
    return new Promise(() => {})
  }

  return config
})

http.interceptors.response.use(response => {
  const res = response.data
  const custom = response.config.custom
  const errno = res.errno
  if (errno === 0) {
    custom &&
      custom.successToast &&
      uni.showToast({
        title: res.errmsg,
        icon: 'none'
      })
    return res
  } else if (errno === magic_numbers.NEED_LOGIN) {
    uni.$u.toast(res.errmsg)
    const userStore = useUserStore()
    userStore.token = ''
    uni.removeStorageSync('token')
    setTimeout(() => {
      uni.$u.route('/pages/login/login')
    }, 1500)
    return new Promise(() => {})
  } else {
    custom &&
      custom.failToast &&
      uni.showToast({
        title: res.errmsg,
        icon: 'none'
      })

    return custom && custom.catch ? Promise.reject() : new Promise(() => {})
  }
})

export default http
