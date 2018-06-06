import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import {fedLogout} from '@/api/login'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api base url
  // withCredentials: true, // for dev
  timeout: 30000 // request timeout
})
service.defaults.headers.common['Accept'] = 'application/json'
// request interceptor
service.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = config.params || {}
    config.params['_t'] = new Date().getTime()
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log(error) // for // debug
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message)
      return Promise.reject(error)
    }
    let resp = error.response
    if (resp && resp.status) {
      switch (resp.status) {
        case 410:
        case 401:
          MessageBox.confirm('会话超时，请重新登录', {
            confirmButtonText: '登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            fedLogout()
          })
          break
        default:
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
