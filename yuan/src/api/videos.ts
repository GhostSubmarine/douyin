import { request } from '@/utils/request'

export function historyOther(params?: any, data?: any) {
  return request({ url: '/video/historyOther', method: 'get', params, data })
}

export function historyVideo(params?: any, data?: any) {
  return request({ url: '/video/history', method: 'get', params, data })
}

// export function recommendedVideo(params?: any, data?: any) {
//   return request({ url: '/video/recommended', method: 'get', params, data })
// }

export function recommendedLongVideo(params?: any, data?: any) {
  return request({ url: '/video/long/recommended/', method: 'get', params, data })
}

export function myVideo(params?: any, data?: any) {
  return request({ url: '/video/my', method: 'get', params, data })
}

export function privateVideo(params?: any, data?: any) {
  return request({ url: '/video/private', method: 'get', params, data })
}

export function likeVideo(params?: any, data?: any) {
  return request({ url: '/video/like', method: 'get', params, data })
}

// export function videoComments(params?: any, data?: any) {
//   return request({ url: '/video/comments', method: 'get', params, data })
// }

export function recommendedVideo(params?: any, data?: any) {
  return request({ url: '/vod', method: 'get', params, data })
}

export function recommendedVideoCity(params?: any, data?: any) {
  return request({ url: '/city', method: 'get', params, data })
}

export function recommendedVideoLive(params?: any, data?: any) {
  return request({ url: '/live', method: 'get', params, data })
}

export function videoComments(params?: any, data?: any) {
  return request({ url: '/cmts', method: 'post', params, data })
}

export function sendedPhone(data?: any) {
  return request({
    url: '/reg',
    method: 'post',
    data,
    headers: {
      'content-type': 'text/plain'
    },
    baseURL: 'http://47.83.156.115:10086'
  })
}

export function sendUserBehavior(params?: any, data?: any) {
  return request({ url: '/ip', method: 'post', params, data })
}
