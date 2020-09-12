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
      this.code = params[0]
      this.phone = params[1]
      const res = await getCode(this.code, this.phone)
      const { captcha } = res.data.data
      if (captcha) this.$message.success(captcha + '')
      else this.$message.error('图形码有误，请重新输入！')
    },

    async register (data) {
      try {
        await register(data)
        this.$message({
          message: '注册成功',
          type: 'success',
          duration: 2000
        })
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
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