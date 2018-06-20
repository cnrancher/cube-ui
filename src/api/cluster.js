import request from '@/utils/request'

export const EVENT_SOURCE_URL = process.env.BASE_API + '/v1/clusters'

export function fetchList () {
  return request({
    url: '/v1/clusters',
    method: 'get'
  })
}
