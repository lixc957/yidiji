import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import Login from 'views/login/Login'
import Error from 'components/common/Error'

const Home = () => import(/* webpackChunkName: 'home' */ 'views/home/Home')
const HomeData = () => import(/* webpackChunkName: 'home' */ 'views/home/childComps/data/HomeData')
const HomeUser = () => import(/* webpackChunkName: 'home' */ 'views/home/childComps/user/HomeUser')
const HomeQuestion = () => import(/* webpackChunkName: 'home' */ 'views/home/childComps/question/HomeQuestion')
const HomeSubject = () => import(/* webpackChunkName: 'home' */ 'views/home/childComps/subject/HomeSubject')
const HomeBusiness = () => import(/* webpackChunkName: 'home' */ 'views/home/childComps/business/HomeBusiness')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '用户登录',
      roles: ['超级管理员', '管理员', '老师', '学生']
    }
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/subject',
    children: [
      {
        path: '/home/data',
        component: HomeData,
        meta: {
          title: '数据概览',
          icon: 'el-icon-pie-chart',
          roles: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: '/home/user',
        component: HomeUser,
        meta: {
          title: '用户列表',
          icon: 'el-icon-user',
          roles: ['超级管理员', '管理员']
        }
      },
      {
        path: '/home/question',
        component: HomeQuestion,
        meta: {
          title: '题库列表',
          icon: 'el-icon-edit-outline',
          roles: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: '/home/business',
        component: HomeBusiness,
        meta: {
          title: '企业列表',
          icon: 'el-icon-office-building',
          roles: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: '/home/subject',
        component: HomeSubject,
        meta: {
          title: '学科列表',
          icon: 'el-icon-notebook-2',
          roles: ['超级管理员', '管理员', '老师', '学生']
        }
      }
    ]
  },
  {
    path: '*',
    component: Error,
    meta: {
      title: '404'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 配置路由进度条
router.beforeEach((to, from, next) => {
  Nprogress.start() 
  next() //允许通过  next()  不允许通过 next('path')
})

router.afterEach((to, from) => {
  Nprogress.done()
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
