<template>
  <div class="login">
    <div class="left"></div>
    <div class="right">
      <img src="~assets/img/login_banner_ele.png" alt="">
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