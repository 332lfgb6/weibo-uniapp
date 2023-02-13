import http from './config'

export const get_post_list_api = (page: number, category?: number, my?: number, key?: string, user_id?: number) => {
  return http.post('/post/getPostList', { page, category, my, key, user_id })
}

export const get_post_detail_api = (id: number) => {
  return http.post('/post/getPostDetail', { id })
}

export const pub_api = (content: string, postImgs: string[], refer_id: number) => {
  return http.post(
    '/post/pub',
    { content, postImgs, refer_id },
    {
      custom: {
        auth: true
      }
    }
  )
}

export const delPostApi = (id: number) => {
  return http.post(
    '/post/delPost',
    { id },
    {
      custom: {
        auth: true,
        successToast: true
      }
    }
  )
}
