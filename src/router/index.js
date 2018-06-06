import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/views/layout/layout'

Vue.use(Router)

const constantRouterMap = [
  {path: '/login', name: 'login', component: () => import('@/views/login/index')},
  {
    path: '',
    component: layout,
    redirect: 'overview',
    children: [{
      path: 'overview',
      component: () => import('@/views/overview/index'),
      name: 'overview',
      meta: {title: 'Overview'}
    }]
  },
  {
    path: '/infra',
    component: layout,
    children: [{
      path: '',
      component: () => import('@/views/infra/index'),
      name: 'infra',
      meta: {title: 'Infra'}
    }]
  }

]

export default new Router({
  routes: constantRouterMap
})
