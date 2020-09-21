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
        <el-form-item label="学科" prop="subject" class="question-item">
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

        <el-form-item label="阶段" prop="step" class="question-item">
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

        <el-form-item label="企业" prop="enterprise" class="question-item">
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

        <el-form-item label="城市" prop="city" class="question-item">
          <el-cascader
          v-model.trim.lazy="addQuestionForm.city"
          placeholder="请选择"
          :props="{value:'label'}"
          :options="options"
          class="item-select"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="题型" prop="type" class="question-item">
          <el-radio-group v-model="addQuestionForm.type">
            <el-radio 
            v-for="(value, key, index) in typeObj" 
            :key="index" 
            :label="+key"
            @change="typeChange"
            >{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="难度" prop="difficulty" class="question-item">
          <el-radio-group v-model="addQuestionForm.difficulty">
            <el-radio 
            v-for="(value, key, index) in diffObj" 
            :key="index" 
            :label="+key"
            >{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <hr style="margin-top:30px">

        <el-form-item label="试题标题" prop="title"  class="question-item-title">
          <quill-editor 
          v-model="addQuestionForm.title"
          @change="onEditorChange('title')"
          class="question-input-title">
          </quill-editor>
        </el-form-item>

        <el-form-item 
        :label="typeObj[addQuestionForm.type]" 
        :prop="propObj[addQuestionForm.type]" 
        class="question-item">
          <question-title-all
          :add-question-form="addQuestionForm"
          @inputChange="onEditorChange" />
        </el-form-item>
        <hr>

        <el-form-item label="答案解析" prop="answer_analyze"  class="question-item-title">
          <quill-editor 
          v-model="addQuestionForm.answer_analyze"
          @change="onEditorChange('answer_analyze')"
          class="question-input-title">
          </quill-editor>
        </el-form-item>
        <hr>

        <el-form-item label="试题备注" prop="remark"  class="question-item-remark">
          <el-input    
          type="textarea"
          v-model="addQuestionForm.remark"
          ></el-input>
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
import QuestionTitleAll from './QuestionTitleAll'

import { homeMainAddMixin } from 'common/mixin'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'QuestionAdd',
  components: {
    quillEditor,
    QuestionTitleAll
  },
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
    },
    typeObj: {
      type: Object,
      default () {
        return {}
      }
    },
    diffObj: {
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
        ],
        type: [
          { required: true, message: '请选择题型', trigger: 'change' }
        ],
        difficulty: [
          { required: true, message: '请选择难度', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入试题标题', trigger: 'change' }
        ],
        single_select_answer: [
          { required: true, message: '请输入答案', trigger: 'change' }
        ],
        multiple_select_answer: [
          { required: true, message: '请输入答案', trigger: 'change' }
        ],
        short_answer: [
          { required: true, message: '请输入答案', trigger: 'change' }
        ],
        answer_analyze: [
          { required: true, message: '请输入答案解析', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入试题备注', trigger: 'change' }
        ]
      },
      propObj: {
        1: 'single_select_answer',
        2: 'multiple_select_answer',
        3: 'short_answer'
      }
    }
  },
  methods: {
    // handleChange(val) {
    //   console.log(val)
    // },
    onEditorChange(msg) {
      this.$refs.addQuestionForm.validateField([msg])
    },
    typeChange() {
      this.$emit('typeChange')
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
    hr {
      margin-top: 80px;
    }
    .item-select {
      width: 364px;
    }
    .question-item {
      .el-form-item__label {
        text-align: left;
      }
    }
    .question-item-title {
      margin-bottom: 80px;
      .el-form-item__label {
        margin-top: 35px;
        text-align: left;
      }
      .el-form-item__content {
        margin-left: 0 !important;
        line-height: 0;
      }    
      .question-input-title {   
        margin-top: 100px;
      }  
    }
    .question-item-remark {
      margin-bottom: 80px;
      .el-form-item__label {
        margin-top: 35px;
        text-align: left;
      }
      .el-form-item__content {
        margin-top: 40px;
      }
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