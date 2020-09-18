<template>
  <el-dialog :visible.sync="dialogVisible" class="add-question" fullscreen>
    <div class="title" slot="title">
      {{ mode === 'add' ? '新增题库测试' : '编辑题库测试' }}
    </div>

    <el-form
      :model="addQuestionForm"
      :rules="rules"
      label-width="100px"
      ref="addQuestionForm"
      class="add-question-form"
    >
      <el-form-item class="input-item" label="用户名" prop="username">
        <el-input v-model.lazy.trim="addUserForm.username"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="邮箱" prop="email">
        <el-input v-model.lazy.trim="addUserForm.email"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="电话" prop="phone">
        <el-input v-model.lazy.trim="addUserForm.phone"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="角色" prop="role_id">
        <el-select
          v-model="addUserForm.role_id"
          placeholder="请选择角色"
          class="search-input"
        >
          <el-option 
          v-for="(value, key, index) in roleObj" 
          :key="index"
          :label="value" 
          :value="index+1"></el-option>
        
        </el-select>
      </el-form-item>

      <el-form-item class="input-item" label="状态" prop="status">
        <el-select
          v-model="addUserForm.status"
          placeholder="请选择"
          class="search-input"
        >
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="input-item" label="用户备注" prop="remark">
        <el-input v-model.lazy.trim="addUserForm.remark"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('addQuestionForm', addQuestionForm)"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'QuestionAdd',
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    addQuestionForm: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      rules: {}
    }
  },
}
</script>

<style lang="less">
.add-question {
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
    text-indent: 22px;
    background: linear-gradient(#1493fa, #01c6fa);
    line-height: 66px;
    font-size: 14px;
  }
}
</style>