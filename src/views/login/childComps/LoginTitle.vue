<template>
  <div class="login-title">
    <img class="login-logo" src="~assets/img/login/login_logo.png" alt="" />
    <span>依蒂吉用户管理系统</span>
  </div>
</template>

<script>
export default {
  name: 'LoginTitle',
}
</script>

<style scoped lang="less">
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
</style>