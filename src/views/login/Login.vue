<template>
  <div class="login">
    <div class="left">
      <login-title />
      <login-input @register="toRegister" @login="login" />
    </div>
    <div class="right">
      <img src="~assets/img/login/login_banner_ele.png" alt="" />
    </div>
    <register ref="register" />
  </div>
</template>

<script>
import LoginInput from './childComps/LoginInput'
import LoginTitle from './childComps/LoginTitle'
import Register from 'views/register/Register'

import { login } from 'network/login'
import { getUserInfo } from 'network/home'
import { setLocal, getLocal, tips } from 'common/utils'

export default {
  name: 'Login',
  components: {
    LoginInput,
    LoginTitle,
    Register
  },
  created () {
    this.getToken()
  },
  methods: {
    /**
     * 	网络请求相关方法
     */
    async login (data) {
      try {
        const res = await login(data)
        setLocal('token', res.data.data.token)
        this.$router.push('/home')
      } catch (error) {
        console.warn(error)
      }
    },

    /**
     * 	事件相关方法
     */
    // 点击注册
    toRegister (dialogVisible) {
      this.$refs.register.dialogVisible = dialogVisible
    },
    getToken () {
      if (getLocal('token')) {
        return this.$router.replace('/home')
      }
    }
  },
}
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(#1493fa 28%, #01c6fa 96%);
  display: flex;
  justify-content: space-around;
  align-items: center;

  .left {
    width: 478px;
    height: 550px;
    padding: 42px;
    background: #f5f5f5;
  }

  .right {
    width: 633px;
    height: 435px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>