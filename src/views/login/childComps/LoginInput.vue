<template>
  <div class="login-input">
    <el-input
      placeholder="请输入手机号"
      prefix-icon="el-icon-user"
      v-model.lazy.trim="userPhone"
      class="input-item"
    >
    </el-input>
    <el-input
      placeholder="请输入密码"
      prefix-icon="el-icon-lock"
      v-model.lazy.trim="password"
      show-password
      class="input-item"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'LoginInput',
  data() {
    return {
      userPhone: '',
      password: ''
    }
  },
}
</script>

<style scoped>
.input-item {
  margin-top: 25px;
}
</style>