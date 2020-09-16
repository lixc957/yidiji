<template>
  <el-dialog :visible.sync="dialogVisible" class="add-subject" width="600px">
    <div class="title" slot="title">
      {{ mode === 'add' ? '新增学科' : '编辑学科' }}
    </div>

    <el-form
      :model="addSubjectForm"
      :rules="rules"
      label-width="100px"
      ref="addSubjectForm"
      class="add-subject-form"
    >
      <el-form-item class="input-item" label="学科编号" prop="rid">
        <el-input v-model.lazy.trim="addSubjectForm.rid"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="学科名称" prop="name">
        <el-input v-model.lazy.trim="addSubjectForm.name"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="学科简称" prop="short_name">
        <el-input v-model.lazy.trim="addSubjectForm.short_name"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="学科简介" prop="intro">
        <el-input
          v-model.lazy.trim="addSubjectForm.intro"
        ></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="学科备注" prop="remark">
        <el-input
          v-model.lazy.trim="addSubjectForm.remark"
        ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('addSubjectForm')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'SubjectAdd',
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    addSubjectForm: {
      type: Object,
      default () {
        return {}
      }
    }   
  },
  data () {
    return {
      dialogVisible: false,
      rules: {
        rid: [
          { required: true, message: '请输入学科编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入学科名称', trigger: 'blur' }
        ],
        short_name: [
          { required: true, message: '请输入学科简称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 清空表单
    dialogVisible (newVal) {
      if (!newVal) {
        this.$emit('isDialogVisible')
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.mode === 'add') {
            this.$emit('addSubject', this.addSubjectForm)
          } else if (this.mode === 'edit') {
            this.$emit('editSubject', this.addSubjectForm)
          }
        }
      })
    },
    resetFields() {
      this.$refs.addSubjectForm.resetFields()
    }
  },
  
}
</script>

<style lang="less">
.add-subject {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 16px;
    color: #fff;
  }
  .title {
    width: 100%;
    height: 53px;
    color: #ffffff;
    text-align: center;
    background: linear-gradient(#1493fa, #01c6fa);
    line-height: 53px;
    font-size: 16px;
  }
  .footer {
    text-align: center;
  }
}
</style>