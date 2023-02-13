import http from './config'

export const follow_user_api = (user_id2: number) => {
  return http.post('/follow/followUser', { user_id2 })
}
