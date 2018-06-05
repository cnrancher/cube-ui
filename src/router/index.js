import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRouterMap = [
  {path: '/login', name: 'login', component: () => import('@/views/login/index')}
]

export default new Router({
  routes: constantRouterMap
})
