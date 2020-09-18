<template>
  <el-dialog :visible.sync="dialogVisible" class="add-question" fullscreen>
    <div class="title" slot="title">
      {{ mode === 'add' ? '新增题库测试' : '编辑题库测试' }}
    </div>

    <div class="question-main">
      <el-form
        :model="addQuestionForm"
        :rules="rules"
        label-width="100px"
        ref="addQuestionForm"
        class="add-question-form"
      >
        <el-form-item class="input-item" label="学科" prop="subject">
          <el-select
            v-model.trim.lazy="addQuestionForm.subject"
            placeholder="请选择学科"
            class="item-select"
          >
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="阶段" prop="step">
          <el-select
            v-model.trim.lazy="addQuestionForm.step"
            placeholder="请选择阶段"
            class="item-select"
          >
            <el-option
              v-for="(value, key, index) in stepObj"
              :key="index"
              :value="+key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业" prop="enterprise">
          <el-select
            v-model.trim.lazy="addQuestionForm.enterprise"
            placeholder="请选择企业"
            class="item-select"
          >
            <el-option 
            v-for="(item, index) in businessList" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="城市" prop="city">
          <el-cascader
          v-model.trim.lazy="addQuestionForm.city"
          placeholder="请选择"
          :props="{value:'label'}"
          :options="options"
          @change="handleChange"
          class="item-select"
          ></el-cascader>
        </el-form-item>

      </el-form>
    </div>

    <div slot="footer" class="dialog-footer footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="submitForm('addQuestionForm', addQuestionForm)"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { homeMainAddMixin } from 'common/mixin'

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
    },
    subjectList: {
      type: Array,
      default () {
        return []
      }
    },
    stepObj: {
      type: Object,
      default () {
        return {}
      }
    },
    businessList: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      dialogVisible: false,
      rules: {
        subject: [
          { required: true, message: '请选择学科', trigger: 'change' }
        ],
        step: [
          { required: true, message: '请选择阶段', trigger: 'change' }
        ],
        enterprise: [
          { required: true, message: '请选择企业', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  },
  mixins: [homeMainAddMixin]
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
  .question-main {
    width: 835px;
    margin: 0 auto;
    .item-select {
      width: 364px;
    }
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
  .footer {
    text-align: center;
  }
}
</style>