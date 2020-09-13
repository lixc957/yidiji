import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from 'views/login/Login'
import Error from 'components/common/Error'

const Home = () => import(/* webpackChunkName: 'home' */ 'views/home/Home')
const HomeData = () => import(/* webpackChunkName: 'home' */ 'views/home/childComps/main/HomeData')
const HomeUser = () => import(/* webpackChunkName: 'home' */ 'views/home/childComps/main/HomeUser')
const HomeQuestion = () => import(/* webpackChunkName: 'home' */ 'views/home/childComps/main/HomeQuestion')
const HomeSubject = () => import(/* webpackChunkName: 'home' */ 'views/home/childComps/main/HomeSubject')
const HomeBusiness = () => import(/* webpackChunkName: 'home' */ 'views/home/childComps/main/HomeBusiness')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/',
        redirect: '/home/data'
      },
      {
        path: '/home/data',
        component: HomeData
      },
      {
        path: '/home/user',
        component: HomeUser
      },
      {
        path: '/home/question',
        component: HomeQuestion
      },
      {
        path: '/home/subject',
        component: HomeSubject
      },
      {
        path: '/home/business',
        component: HomeBusiness
      }
    ]
  },
  {
    path: '*',
    component: Error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

export default router
