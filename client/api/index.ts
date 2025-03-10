import request from '../utils/http'
export const getUserInfo = () => request.get('weixin/userinfo')

export const homeList = data => request.get('weixin/videolist', data)
export const getVideo = data => request.get('weixin/videodetail', data)

export const diamondpackage = () => request.get('weixin/diamondpackage')
export const diamondorderadd = (data) => request.post('weixin/diamondorderadd', data)
export const diamondorderpay = (data) => request.post('weixin/diamondorderpay', data)

export const weixinlogin = (data) => request.post('weixin/wxlogin', data)
export const bindphone = (data) => request.post('weixin/bindphone', data)

export const vippackage = () => request.get('weixin/vippackage')
export const viporderadd = (data) => request.post('weixin/viporderadd', data)
export const viporderpay = (data) => request.post('weixin/viporderpay', data)

export const agreement = (data) => request.post('weixin/agreement',data)
