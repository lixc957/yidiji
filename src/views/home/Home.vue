<template>
  <el-container class="home">
    <el-header class="header">
      <header-view :user-info="userInfo" @userExit="userExit" />
    </el-header>
    
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderView from './childComps/HeaderView'

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
    HeaderView
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
      this.userInfo = res.data.data
    },
    async userExit() {
       await userExit()
       removeLocal('token')
       tips('退出成功', 'success')
       this.$router.replace('login')
     },

    /**
     * 	事件相关方法
     */
     getToken() {
       if (!getLocal('token')) {
         return this.$router.replace('login')
       }
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