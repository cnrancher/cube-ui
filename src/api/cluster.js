import request from '@/utils/request'

export function fetchList () {
  return request({
    url: '/v1/clusters',
    method: 'get'
  })
}
