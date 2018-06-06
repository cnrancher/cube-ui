import request from '@/utils/request'
import {removeLoginStatus} from '@/utils/auth'
export function loginByUsername (username, password) {
  const data = {
    providerType: 'local',
    responseType: 'cookie',
    ttl: 30 * 60 * 1000,
    username,
    password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function fedLogout () {
  removeLoginStatus()
  location.reload()
}
