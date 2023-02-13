import http from './config'

export const search_api = (key: string) => {
  return http.post('/common/search', { key })
}

export const getUnreadNumApi = () => {
  return http.post(
    '/common/getUnreadNum',
    {},
    {
      custom: {
        auth: true
      }
    }
  )
}

export const getInteractNumApi = () => {
  return http.post(
    '/common/getInteractNum',
    {},
    {
      custom: {
        auth: true
      }
    }
  )
}
