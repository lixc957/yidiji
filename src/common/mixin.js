export const submitFormMixin = {
  methods: {
    // 表单验证
    submitForm(formName) {
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
            duration: 2000,
          })
          return false
        }
      })
    }
  }
}
