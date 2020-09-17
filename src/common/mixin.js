export const regFromMixin = {
  data() {
    return {
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              if (reg.test(value)) {
                callback()
              } else {
                callback(new Error('请输入正确手机号'))
              }
            },
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '密码长度为 6 至 12 位',
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            min: 4,
            max: 4,
            message: '验证码错误，请重新输入',
            trigger: 'blur',
          },
        ],
      },
    }
  },
}

/**
 * 	通用方法
 */

export const homeMainHeaderMixin = {
  methods: {
    resetForm() {
      // 清空表单
      this.$refs.searchForm.resetFields()
      this.$emit('resetForm')
    },
    search () {
      this.$emit('search')
    },
    add() {
      this.$emit('add')
    }
  },
}

export const homeMainBodyMixin = {
  methods: {
    handleSizeChange (size) {
      // 当前页容量
      this.$emit('handleSizeChange', size)
    },
    handleCurrentChange (val) {
      // 当前页码
      this.$emit('handleCurrentChange', val)
    },
    setStatus (id) {
      this.$emit('setStatus', id)
    },
    edit (row) {
      this.$emit('editDialogVisible', row)
    },
    del (id) {
      this.$confirm('您确定删除吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('del', id)
      }).catch(() => { })  
    }
  },
}
