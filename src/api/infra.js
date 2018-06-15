import request from '@/utils/request'
export const EVENT_SOURCE_URL = process.env.BASE_API + '/v1/baseinfos'

export function fetchList () {
  return request({
    url: '/v1/baseinfos',
    method: 'get'
  })
}

export function deploy (url, data) {
  return request({
    url: 'v1' + url,
    method: 'post',
    data: data
  })
}

export function fetchState (url, cancelToken) {
  let options = {
    url: 'v1' + url,
    method: 'get'
  }
  if (cancelToken) {
    options.cancelToken = cancelToken
  }
  return request(options)
}
