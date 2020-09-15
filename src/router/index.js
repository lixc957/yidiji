import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

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
    component: Login,
    meta: {
      title: '用户登录'
    }
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
        component: HomeData,
        meta: {
          title: '数据概览'
        }
      },
      {
        path: '/home/user',
        component: HomeUser,
        meta: {
          title: '用户列表'
        }
      },
      {
        path: '/home/question',
        component: HomeQuestion,
        meta: {
          title: '题库列表'
        }
      },
      {
        path: '/home/business',
        component: HomeBusiness,
        meta: {
          title: '企业列表'
        }
      },
      {
        path: '/home/subject',
        component: HomeSubject,
        meta: {
          title: '学科列表'
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
  next()
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
