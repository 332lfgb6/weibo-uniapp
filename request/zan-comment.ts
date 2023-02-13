import { useCommonStore } from '../store/common'
import http from './config'

const commonStore = useCommonStore()

export const zan_comment_api = (comment_id: number, user_id2: number) => {
  const brand = commonStore.brand
  const model = commonStore.model
  return http.post(
    '/zan_comment/zanComment',
    { comment_id, user_id2, brand, model },
    {
      custom: {
        auth: true
      }
    }
  )
}

export const getZanCommentListApi = (page: number) => {
  return http.post(
    '/zan_comment/getZanCommentList',
    { page },
    {
      custom: {
        auth: true
      }
    }
  )
}
