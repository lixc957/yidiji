<template>
  <div class="login">
    <div class="left">
      <login-title />
      <login-input />
    </div>
    <div class="right">
      <img src="~assets/img/login/login_banner_ele.png" alt="" />
    </div>
  </div>
</template>

<script>
import LoginInput from './childComps/LoginInput'
import LoginTitle from './childComps/LoginTitle'

export default {
  name: 'Login',
  components: {
    LoginInput,
    LoginTitle
  }
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