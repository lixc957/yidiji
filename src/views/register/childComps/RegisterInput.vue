<template>
  <el-form
    :model="registerForm"
    :rules="rules"
    label-width="100px"
    ref="registerForm"
    class="register-form"
  >
    <el-form-item label="头像" prop="avatar">
      <up-load
        v-model="registerForm.avatar"
        name="image"
        :imageUrl="registerForm.avatar"
        @handleAvatarSuccess="avatarSuccess"
        :baseUrl="baseUrl"
        ref="registerUpload"
      />
    </el-form-item>

    <el-form-item class="input-item" label="昵称" prop="username">
      <el-input v-model.lazy.trim="registerForm.username"></el-input>
    </el-form-item>

    <el-form-item class="input-item" label="邮箱" prop="email">
      <el-input v-model.lazy.trim="registerForm.email"></el-input>
    </el-form-item>

    <el-form-item class="input-item" label="手机" prop="phone">
      <el-input v-model.lazy.trim="registerForm.phone"></el-input>
    </el-form-item>

    <el-form-item class="input-item" label="密码" prop="password">
      <el-input
        v-model.lazy.trim="registerForm.password"
        show-password
      ></el-input>
    </el-form-item>

    <el-form-item class="input-item" label="图形码" prop="code">
      <el-row>
        <el-col :span="16">
          <el-input v-model.lazy.trim="registerForm.code"></el-input>
        </el-col>
        <el-col :span="7" :offset="1" class="icode">
          <img :src="codeUrl" @click="codeImgClick" alt="" />
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item class="input-item" label="验证码">
      <el-row>
        <el-col :span="14">
          <el-input v-model.lazy.trim="registerForm.rcode"></el-input>
        </el-col>
        <el-col :span="9" :offset="1">
          <el-button @click="getCode" :disabled="time != 6" class="btn-GetCode">
            获取用户验证码
            <span v-if="time != 6">({{ time }})</span>
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import UpLoad from 'components/content/upload/UpLoad'

import { regFromMixin } from 'common/mixin'

export default {
  name: 'RegisterInput',
  mixins: [regFromMixin],
  data () {
    return {
      registerForm: {
        avatar: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        code: '',
        rcode: ''
      },
      rules: {
        avatar: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 6, message: '昵称长度为 3 至 6 位', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              let reg = /^[a-z]+$/i
              if (reg.test(value)) {
                callback()
              } else {
                callback(new Error('昵称只能是英文字母'))
              }
            }, trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
              if (reg.test(value)) {
                callback()
              } else {
                callback(new Error('请输入正确邮箱'))
              }
            }, trigger: 'blur'
          }
        ],

      },
      baseUrl: process.env.VUE_APP_BASEURL,
      codeUrl: process.env.VUE_APP_BASEURL + '/captcha?type=sendsms',
      time: 6
    }
  },
  components: {
    UpLoad
  },
  methods: {
    // 获取用户验证码
    getCode () {
      let num = 0
      this.$refs.registerForm.validateField(['phone', 'code'], err => {
        if (err === '') {
          // 验证成功
          num++
        }
        if (num === 2) {
          // 发射事件
          this.$emit('getCode', this.registerForm.code, this.registerForm.phone)
        }
      })
    },

    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('register', this.registerForm)
        } 
      })
    },

    // 头像上传
    avatarSuccess (res) {
      // 手动触发一次校验
      this.$refs.registerForm.validateField(['avatar'])
    },

    // 点击图形码
    codeImgClick () {
      this.codeUrl = this.baseUrl + '/captcha?type=sendsms&msg=' + Date.now()
    },

    // 清空表单
    resetFields () {
      this.$refs.registerForm.resetFields()
      this.registerForm.avatar = ''
      this.registerForm.rcode = ''
    },

    // 倒计时
    countDown() {
      this.time--
      let timerId = setInterval(() => {
        this.time--
        if (this.time === 0) {
          this.time = 6
          clearInterval(timerId)
        }
      }, 1000)
    }
  },
}
</script>

<style lang="less">
.register-form .el-form-item__label {
  text-align: center;
}
.icode img {
  width: 100%;
  height: 100%;
}
</style>