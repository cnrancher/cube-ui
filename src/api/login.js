import request from '@/utils/request'
import {removeLoginStatus, setLogined} from '@/utils/auth'
export function loginByUsername (username, password) {
  const data = {
    providerType: 'local',
    responseType: 'cookie',
    ttl: 60 * 60 * 1000,
    username,
    password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  }).then((resp) => {
    setLogined(new Date().getTime(), data.ttl)
    return resp
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
