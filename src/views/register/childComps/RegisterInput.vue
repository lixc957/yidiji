<template>
  <el-form
    :model="registerForm"
    :rules="rules"
    label-width="100px"
    ref="registerForm"
    class="register-form"
  >
    <el-form-item label="头像" prop="avatar">
      <register-upload
        v-model.lazy.trim="registerForm.avatar"
        @handleAvatarSuccess="avatarSuccess"
        :baseUrl="baseUrl"
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

    <el-form-item class="input-item" label="图形码">
      <el-row>
        <el-col :span="16">
          <el-input v-model.lazy.trim="registerForm.icode"></el-input>
        </el-col>
        <el-col :span="7" :offset="1" class="icode">
          <img :src="icodeUrl" alt="" />
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item class="input-item" label="验证码">
      <el-row>
        <el-col :span="16">
          <el-input v-model.lazy.trim="registerForm.rcode"></el-input>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-button>获取用户验证码</el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import RegisterUpload from './RegisterUpload'

export default {
  name: 'RegisterInput',
  data () {
    return {
      registerForm: {
        avatar: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        icode: '',
        rcode: ''
      },
      rules: {
        avatar: [
          { required: true, message: '请上传头像', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '昵称长度为 3 至 5 位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 3, max: 5, message: '昵称长度为 3 至 5 位', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号长度为 11 位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度为 6 至 12 位', trigger: 'blur' }
        ],
      },
      baseUrl: process.env.VUE_APP_BASEURL,
      icodeUrl: process.env.VUE_APP_BASEURL + '/captcha?type=sendsms'
    }
  },
  components: {
    RegisterUpload
  },
  methods: {
    avatarSuccess (res) {
      this.registerForm.avatar = res
      // 手动触发一次校验
      this.$refs.registerForm.validateField(['avatar'])
    },
    // 表单验证
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '验证成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 2000
          })
          return false
        }
      })
    }
  },
}
</script>

<style>
.register-form .el-form-item__label {
  text-align: center;
}
.icode img {
  width: 100%;
  height: 100%;
}
</style>