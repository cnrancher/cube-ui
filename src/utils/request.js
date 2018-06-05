import axios from 'axios'
import {Message} from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api base url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  console.log(config)
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error) // for // debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
