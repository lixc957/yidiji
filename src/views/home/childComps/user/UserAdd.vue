<template>
  <el-dialog :visible.sync="dialogVisible" class="add-user" width="600px">
    <div class="title" slot="title">
      {{ mode === 'add' ? '新增用户' : '编辑用户' }}
    </div>

    <el-form
      :model="addUserForm"
      :rules="rules"
      label-width="100px"
      ref="addUserForm"
      class="add-user-form"
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
      <el-button type="primary" @click="submitForm('addUserForm', addUserForm)"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { homeMainAddMixin } from 'common/mixin'

export default {
  name: 'UserAdd',
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    addUserForm: {
      type: Object,
      default () {
        return {}
      }
    },
    roleObj: {
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
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '用户名长度为 3 至 6 位', trigger: 'blur'}
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
            if (reg.test(value)) {
              callback()
            } else {
              callback(new Error('邮箱格式错误，请重新输入!'))
            }
          }, trigger: 'blur'}
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            if (reg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的手机号'))
            }
          }, trigger: 'blur'}
        ],
        role_id: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      }
    }
  },
  mixins: [homeMainAddMixin] 
}
</script>

<style lang="less">
.add-user {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 16px;
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
}
</style>