import { useCommonStore } from '../store/common'
import http from './config'

const commonStore = useCommonStore()

export const zan_post_api = (post_id: number, user_id2: number) => {
  const brand = commonStore.brand
  const model = commonStore.model
  return http.post(
    '/zan/zanPost',
    { post_id, user_id2, brand, model },
    {
      custom: {
        auth: true
      }
    }
  )
}

export const get_zaned_user_list_api = (page: number, post_id: number) => {
  return http.post('/zan/getZanedUserList', { page, post_id })
}

export const getZanListApi = (page: number) => {
  return http.post(
    '/zan/getZanList',
    { page },
    {
      custom: {
        auth: true
      }
    }
  )
}
