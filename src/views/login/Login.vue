<template>
  <div class="login">
    <div class="left">
      <div class="login-title">
        <img class="login-logo" src="~assets/img/login/login_logo.png" alt="" />
        <span>依蒂吉用户管理系统</span>
      </div>
    </div>
    <div class="right">
      <img src="~assets/img/login/login_banner_ele.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
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

    .login-title {
      display: flex;
      align-items: center;
      justify-content: center;

      .login-logo {
        width: 25px;
        height: 18px;
        margin-top: 6px;
        margin-right: 16px;
      }

      > span {
        font-size: 24px;
        font-family: SourceHanSansCN Regular, SourceHanSansCN Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #0c0c0c;
      }
    }
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