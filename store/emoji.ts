import { defineStore } from 'pinia'

function arrToObj(arr) {
  let obj = {}
  arr.forEach(item => {
    obj[item.text] = item.filename
  })
  return obj
}

export const useEmojiStore = defineStore({
  id: 'emoji',
  state: () => {
    return {
      emoji_arr: [
        { filename: 'l_xin-43af9086c0', text: '心' },
        { filename: 'd_bingbujiandan-9955880b30', text: '并不简单' },
        { filename: 'h_good-0c51afc69c', text: 'good' },
        { filename: 'd_aini-09d5f3f870', text: '爱你' },
        { filename: 'd_lei-4cdf6ee412', text: '泪' },
        { filename: 'h_ye-8d6db3a711', text: '耶' },
        { filename: 'd_taikaixin-b7d86de3fd', text: '太开心' },
        { filename: 'd_sikao-ff9602dd08', text: '思考' },
        { filename: 'd_xixi-643ef6e48d', text: '嘻嘻' },
        { filename: 'w_taiyang-2b1d91ddac', text: '太阳' },
        { filename: 'd_jiyan-9f343230f4', text: '挤眼' },
        { filename: 'd_touxiao-0d995330b6', text: '偷笑' },
        { filename: 'd_haha-0ec05e6dad', text: '哈哈' },
        { filename: 'fb_a1dacall-1e0c4593fc', text: '打call' },
        { filename: 'd_doge-be7f768d78', text: 'doge' },
        { filename: 'co_a1hug-f3910d0e88', text: '抱一抱' },
        { filename: '2022_Flowers_org', text: '送花花' }
        // { position: '0 0', text: '航天员' },
        // { position: '-32px 0', text: '千古玦尘' },
        // { position: '0 -32px', text: '高考必胜' },
        // { position: '-32px -32px', text: '高考锦鲤' },
        // { position: '-64px 0', text: '金榜题名' },
        // { position: '-64px -32px', text: '录取通知' },
        // { position: '0 -64px', text: '水稻' },
        // { position: '-32px -64px', text: '抱一抱' },
        // { position: '-64px -64px', text: '奶瓶' },
        // { position: '-96px 0', text: '爱你' },
        // { position: '-96px -32px', text: '拜拜' },
        // { position: '-96px -64px', text: '抱抱' },
        // { position: '0 -96px', text: '悲伤' },
        // { position: '-32px -96px', text: '并不简单' },
        // { position: '-64px -96px', text: '鄙视' },
        // { position: '-96px -96px', text: '闭嘴' },
        // { position: '-128px 0', text: '馋嘴' },
        // { position: '-128px -32px', text: '吃瓜' },
        // { position: '-128px -64px', text: '吃惊' },
        // { position: '-128px -96px', text: '哈欠' },
        // { position: '0 -128px', text: '打脸' },
        // { position: '-32px -128px', text: '顶' },
        // { position: '-64px -128px', text: '费解' },
        // { position: '-96px -128px', text: '感冒' },
        // { position: '-128px -128px', text: '跪了' },
        // { position: '-160px 0', text: '鼓掌' },
        // { position: '-160px -32px', text: '哈哈' },
        // { position: '-160px -64px', text: '害羞' }
      ]
    }
  },
  getters: {
    emoji_obj: state => arrToObj(state.emoji_arr)
  },
  actions: {
    insertEmoji: (soure: string, start: number, newStr: string) => {
      return soure.slice(0, start) + newStr + soure.slice(start)
    },
    parseContent(content: string) {
      const emojiObj = this.emoji_obj
      content = content.replace(/\[(.+?)\]/g, function() {
        const filename = emojiObj[arguments[1]]
        return `
          <img
            width="16"
            height="16"
            src="/static/emoji/${filename}.png"
          />
        `
      })
      return content
    }
  }
})
