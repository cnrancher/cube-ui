import Cookies from 'js-cookie'

const TokenKey = 'is-login'
const LoginTime = 'loginTime'
const TTL = 'ttl'

export function isLogin () {
  return Cookies.get(TokenKey) + '' === 'true'
}

export function setLogined (time, ttl) {
  Cookies.set(LoginTime, time)
  Cookies.set(TTL, ttl)
  Cookies.set(TokenKey, true)
}

export function removeLoginStatus () {
  return Cookies.remove(TokenKey)
}
export function isTimeout () {
  return (new Date().getTime() - (parseInt(Cookies.get(LoginTime), 10) || 0)) > (parseInt(Cookies.get(TTL), 10) || 0)
}
