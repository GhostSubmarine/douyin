import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 兼容微信小程序的 openid 字段
    openid: uni.getStorageSync('openid') || '',
    // 其他用户信息...
  }),
  actions: {
    // 微信小程序登录示例
    async wechatLogin() {
      /* #ifdef MP-WEIXIN */
      const [err, res] = await uni.login({
        provider: 'weixin'
      })
      if (res?.code) {
        // 调用后端登录接口...
      }
      /* #endif */
    }
  }
})
