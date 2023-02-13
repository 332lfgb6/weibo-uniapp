interface iResBase {
  errno: number
  errmsg: string
}

interface iResString extends iResBase {
  data: string
}

// 注意：接口名称不能使用下划线命名法，否则其它文件检测不到。
interface iFilter {
  page: number
}

interface iFilter2 extends iFilter {
  post_id: number
}
