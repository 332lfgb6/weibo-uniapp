import http from './config'

export const getLastChatListApi = (page: number) => {
  return http.post(
    '/last-chat/getLastChatList',
    { page },
    {
      custom: {
        auth: true
      }
    }
  )
}
