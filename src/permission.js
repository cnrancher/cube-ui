import router from './router'
// import {Message} from 'element-ui'
import {isLogin} from '@/utils/auth'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  console.log(isLogin())
  if (isLogin()) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path: '/login'})
    }
  }
})
