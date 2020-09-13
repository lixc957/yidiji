<template>
  <div class="login-input">
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item class="input-item" prop="phone">
        <el-input
          placeholder="请输入手机号"
          prefix-icon="el-icon-user"
          v-model.lazy.trim="loginForm.phone"
        >
        </el-input>
      </el-form-item>

      <el-form-item class="input-item" prop="password">
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model.lazy.trim="loginForm.password"
          show-password
        >
        </el-input>
      </el-form-item>

      <el-form-item class="input-item" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input
              placeholder="请输入验证码"
              prefix-icon="el-icon-lock"
              v-model.lazy.trim="loginForm.code"
            >
            </el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img :src="codeUrl" @click="codeImgClick" alt="" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item class="input-item">
        <el-checkbox v-model="isAgree" class="checkbox">
          <span>我已阅读并同意</span>
          <el-link type="primary" class="link" :underline="false"
            >用户协议</el-link
          >
          <span>和</span>
          <el-link type="primary" class="link" :underline="false"
            >隐私条款</el-link
          >
        </el-checkbox>
      </el-form-item>

      <el-form-item class="input-item">
        <el-button
          type="primary"
          :disabled="!isAgree"
          class="btn btn-login"
          @click="submitForm('loginForm')"
          >登陆
        </el-button>
      </el-form-item>

      <el-form-item class="input-item">
        <el-button type="primary" class="btn btn-register" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regFromMixin } from 'common/mixin'

export default {
  name: 'LoginInput',
  mixins: [regFromMixin],
  data () {
    return {
      loginForm: {
        phone: '',
        password: '',
        code: ''
      },
      isAgree: false,
      dialogVisible: true,
      baseUrl: process.env.VUE_APP_BASEURL,
      codeUrl: process.env.VUE_APP_BASEURL + '/captcha?type=login',
    }
  },
  methods: {
    // 用户注册
    register() {
      this.$emit('register', this.dialogVisible)
    },
    // 点击验证码
    codeImgClick () {
      this.codeUrl = this.baseUrl + '/captcha?type=login&msg=' + Date.now()
    },
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('login', this.loginForm)
        } 
      })
    },
  }
}
</script>

<style scoped>
.input-item {
  margin-top: 25px;
}

.input-item img {
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