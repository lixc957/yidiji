<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    class="register"
    width="603px"
  >
    <div class="title" slot="title">用户注册</div>
    <register-input
      ref="registerInput"
      @getCode="getCode(arguments)"
      @register="register"
    />
    <div slot="footer" class="dialog-footer footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import RegisterInput from './childComps/RegisterInput'

import { getCode, register } from 'network/register'
import { tips } from 'common/utils'

export default {
  name: 'Register',
  data () {
    return {
      dialogVisible: false,
      code: '',
      phone: ''
    }
  },
  components: {
    RegisterInput
  },
  watch: {
    // 清空表单
    dialogVisible (newVal) {
      if (!newVal) {
        this.$refs.registerInput.resetFields()
      }
    }
  },
  methods: {
    /**
     * 	网络请求相关方法
     */
    async getCode (params) {
      try {    
        this.code = params[0]
        this.phone = params[1]
        const res = await getCode(this.code, this.phone)
        // 开启倒计时
        this.$refs.registerInput.countDown()
        const { captcha } = res.data.data
        if (captcha) tips(captcha + '', 'success')
      } catch (error) {
        console.warn(error)
      }
    },

    async register (data) {
      try {
        await register(data)
        tips('注册成功', 'success')
        this.dialogVisible = false
      } catch (error) {
        console.warn(error)
      }
    },

    /**
     * 	事件相关方法
     */
    submitForm () {
      this.$refs.registerInput.submitForm('registerForm')
    }
  },
}
</script>

<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .title {
    width: 100%;
    height: 53px;
    color: #ffffff;
    text-align: center;
    background: linear-gradient(#1493fa, #01c6fa);
    line-height: 53px;
    font-size: 14px;
  }
  .footer {
    text-align: center;
  }
}
</style>