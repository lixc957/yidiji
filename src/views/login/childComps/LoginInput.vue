<template>
  <div class="login-input">
    <el-form :model="form">
      <el-form-item class="input-item">
        <el-input
          placeholder="请输入手机号"
          prefix-icon="el-icon-user"
          v-model.lazy.trim="form.phone"
        >
        </el-input>
      </el-form-item>

      <el-form-item class="input-item">
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model.lazy.trim="form.password"
          show-password
        >
        </el-input>
      </el-form-item>

      <el-form-item class="input-item">
        <el-row>
          <el-col :span="17">
            <el-input
              placeholder="请输入验证码"
              prefix-icon="el-icon-lock"
              v-model.lazy.trim="form.code"
            >
            </el-input>
          </el-col>
          <el-col :span="7" class="code">
            <img src="~assets/img/login/code.png" alt="" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item class="input-item">
        <el-checkbox v-model="isAgree" class="checkbox">
          <span>我已阅读并同意</span>
          <el-link type="primary" class="link" :underline="false">用户协议</el-link>
          <span>和</span>
          <el-link type="primary" class="link" :underline="false">隐私条款</el-link>
        </el-checkbox>
      </el-form-item>

      <el-form-item class="input-item">
        <el-button type="primary" :disabled="!isAgree" class="btn btn-login">登陆</el-button>
      </el-form-item>

      <el-form-item class="input-item">
        <el-button type="primary" class="btn btn-register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginInput',
  data () {
    return {
      form: {
        phone: '',
        password: '',
        code: ''
      },
      isAgree: false
    }
  },
}
</script>

<style scoped>
.input-item {
  margin-top: 25px;
}

.code img {
  width: 100%;
  height: 100%;
}

.checkbox .link {
  vertical-align: bottom;
  margin-top: 1px;
}

.btn {
  width: 100%;
}
</style>