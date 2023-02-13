import http from './config'

export const pubMsgApi = (user_id2: number, content: string) => {
  return http.post(
    '/chat/pubMsg',
    { user_id2, content },
    {
      custom: {
        auth: true
      }
    }
  )
}

export const getMsgListApi = (user_id2: number, current_min_id?: number, current_max_id?: number) => {
  return http.post(
    '/chat/getMsgList',
    { user_id2, current_max_id, current_min_id },
    {
      custom: {
        auth: true
      }
    }
  )
}
