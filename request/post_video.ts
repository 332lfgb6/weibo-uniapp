import http from './config'

export const getVideoDataApi = (id: number) => {
  return http.post('/post_video/getVideoData', { id })
}
