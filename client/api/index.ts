import HttpClient from '@/utils/request'

// 创建认证相关接口实例
const authHttp = new HttpClient('http://localhost:3000')
export const login = {
  // 微信小程序登录
  wechat: (code: string) => authHttp.post<{ token: string }>('/wx', { code }),
  
  // 账号密码登录
  account: (data: { 
    username: string
    password: string 
  }) => authHttp.post('/auth/login', data)
}