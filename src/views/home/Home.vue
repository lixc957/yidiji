<template>
  <el-container class="home" v-if="userInfo.username">
    <el-header class="header">
      <header-view 
      :user-info="userInfo" 
      @userExit="userExit"
      @logoClick="logoClick" 
      />
    </el-header>
    
    <el-container>
      <el-aside width="auto" class="aside">
        <aside-view ref="asideBar" :router-opations="routerOpations" />
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderView from './childComps/HeaderView'
import AsideView from './childComps/AsideView'

import { getUserInfo, userExit } from 'network/home'
import { getLocal, removeLocal, tips } from 'common/utils'

export default {
  name: 'Home',
  components: {
    HeaderView,
    AsideView
  },
  data() {
    return {
      userInfo: {},
      routerOpations: []
    }
  },
  created() {  
    // 调用用户信息接口 
    this.getUserInfo()
    this.routerOpations = this.$router.options.routes[2].children
  },
  beforeRouteEnter (to, from, next) {
    if (!getLocal('token')) {
      next('/login')
    } else next()  
  },
  methods: {
    /**
     * 	网络请求相关方法
     */
    async getUserInfo() {
      const res = await getUserInfo()
      this.userInfo = res.data.data
      this.$store.state.userInfo = this.userInfo
      this.$store.state.role = this.userInfo.role
    },
    async userExit() {
       await userExit()
       removeLocal('token')
       tips('退出成功', 'success')
       this.$router.replace('/login')
     },

    /**
     * 	事件相关方法
     */
     logoClick() {
       this.$refs.asideBar.isCollapse = !this.$refs.asideBar.isCollapse
     }
  },
}
</script>

<style lang="less">
.home {
  height: 100%;
  .header {
    height: 60px;
    padding: 0;
  }
}
</style>