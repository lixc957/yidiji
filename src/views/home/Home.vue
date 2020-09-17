<template>
  <el-container class="home">
    <el-header class="header">
      <header-view 
      :user-info="userInfo" 
      @userExit="userExit"
      @logoClick="logoClick" 
      />
    </el-header>
    
    <el-container>
      <el-aside width="auto" class="aside">
        <aside-view ref="asideBar" />
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
  data() {
    return {
      userInfo: {}
    }
  },
  components: {
    HeaderView,
    AsideView
  },
  created() {
    // 判断有无token
    this.getToken()

    // 调用用户信息接口
    this.getUserInfo()
  },
  methods: {
    /**
     * 	网络请求相关方法
     */
    async getUserInfo() {
      const res = await getUserInfo()
      this.$store.state.userInfo = res.data.data
      this.userInfo = this.$store.state.userInfo
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
     getToken() {
       if (!getLocal('token')) {
         return this.$router.replace('login')
       }
     },
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