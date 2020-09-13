<template>
  <div class="header-view" v-if="userInfo.username">
    <div class="left">
      <div class="icon">
        <i class="el-icon-s-fold"></i>
      </div>
      <h1 class="logo"></h1>
      <div class="title">依蒂吉</div>
    </div>
    <div class="right">
      <div class="user-icon">
        <img :src="baseUrl + '/' + this.userInfo.avatar" alt="" />
      </div>
      <div class="user-name">{{ userInfo.username }}，您好</div>
      <div class="exit" @click="exit">
        <el-button type="primary" size="small">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeaderView',
  props: {
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL
    }
  },
  methods: {
    exit() {
      this.$confirm('您确定退出吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('userExit')
      }).catch(() => {})
    }
  },
}
</script>

<style scoped lang="less">
.header-view {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-shadow: 0 2px 5px 6px rgba(0, 0, 0, 0.15);
  .left {
    display: flex;
    flex: 1;
    align-items: center;
    .icon {
      font-size: 24px;
    }
    h1.logo {
      width: 33px;
      height: 28px;
      margin: 0 11px 0 18px;
      background: url('~assets/img/home/logo.png');
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 22px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
      text-align: left;
      color: #49a1ff;
      letter-spacing: 1px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .user-icon {
      width: 43px;
      height: 43px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-name {
      margin: 0 30px 0 15px;
      font-size: 14px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
      text-align: left;
      color: #636363;
    }
    .exit button {
      border: 1px solid #369cff;
      border-radius: 4px;
    }
  }
}
</style>