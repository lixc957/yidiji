<template>
  <el-dialog :visible.sync="dialogVisible" class="add-business" width="600px">
    <div class="title" slot="title">
      {{ mode === 'add' ? '新增企业' : '编辑企业' }}
    </div>

    <el-form
      :model="addBusinessForm"
      :rules="rules"
      label-width="100px"
      ref="addBusinessForm"
      class="add-business-form"
    >
      <el-form-item class="input-item" label="企业编号" prop="eid">
        <el-input v-model.lazy.trim="addBusinessForm.eid"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="企业名称" prop="name">
        <el-input v-model.lazy.trim="addBusinessForm.name"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="企业简称" prop="short_name">
        <el-input v-model.lazy.trim="addBusinessForm.short_name"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="企业简介" prop="intro">
        <el-input
          v-model.lazy.trim="addBusinessForm.intro"
        ></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="企业备注" prop="remark">
        <el-input
          v-model.lazy.trim="addBusinessForm.remark"
        ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('addBusinessForm', addBusinessForm)"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { homeMainAddMixin } from 'common/mixin'

export default {
  name: 'BusinessAdd',
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    addBusinessForm: {
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
        eid: [
          { required: true, message: '请输入企业编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        short_name: [
          { required: true, message: '请输入企业简称', trigger: 'blur' }
        ]
      }
    }
  },
  mixins: [homeMainAddMixin] 
}
</script>

<style lang="less">
.add-business {
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