import http from './config'

export const get_comment_list_api = (page: number, post_id?: number, parent_id?: number) => {
  return http.post('/comment/getCommentList', { page, post_id, parent_id })
}

export const pub_comment_api = (
  content: string,
  post_id: number,
  parent_id: number = 0,
  reply_id: number = 0,
  ip: string = '新疆'
) => {
  return http.post(
    '/comment/pubComment',
    { content, post_id, parent_id, reply_id, ip },
    {
      custom: {
        auth: true,
        successToast: true
      }
    }
  )
}

export const get_post_detail_api = (id: number) => {
  return http.post('/post/getPostDetail', { id })
}

export const delCommentApi = (id: number) => {
  return http.post(
    '/comment/delComment',
    { id },
    {
      custom: {
        auth: true,
        successToast: true
      }
    }
  )
}

export const getCommentInfoApi = (commentId: number) => {
  return http.post('/comment/getCommentInfo', { commentId })
}
