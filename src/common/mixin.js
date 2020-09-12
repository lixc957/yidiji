export const submitFormMixin = {
  methods: {
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('register', this.registerForm)
        } 
      })
    }
  }
}

export const regFromMixin = {
  data() {
    return {
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            if (reg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确手机号'))
            }
          }, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度为 6 至 12 位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码错误，请重新输入', trigger: 'blur' }
        ]
      }
    }
  },
}
