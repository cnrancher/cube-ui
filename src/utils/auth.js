import Cookies from 'js-cookie'

const TokenKey = 'is-login'

export function isLogin () {
  return Cookies.get(TokenKey) + '' === 'true'
}

export function setLogined () {
  return Cookies.set(TokenKey, true)
}

export function removeLoginStatus () {
  return Cookies.remove(TokenKey)
}
