<template>
  <div class="question-list">
    <el-card class="question-header">
      <question-header
        ref="questionHeader"
        :search-form="searchForm"
        :subject-list="subjectList"
        :business-list="businessList"
        :step-obj="stepObj"
        :type-obj="typeObj"
        :diff-obj="diffObj"
        :status-obj="statusObj"
        @search="searchQuestion"
        @resetForm="resetForm"
        @add="increment"
      />
    </el-card>

    <el-card class="question-body">
      <question-body
        ref="questionBody"
        :pagination="pagination"
        :question-list="questionList"
        :step-obj="stepObj"
        :type-obj="typeObj"
        :diff-obj="diffObj"
        :status-obj="statusObj"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @setStatus="setStatus"
        @editDialogVisible="editDialogVisible"
      />
    </el-card>

    <question-add 
    ref="questionAdd" 
    :mode="mode"
    :subject-list="subjectList"
    :add-question-form="addQuestionForm"
    :step-obj="stepObj"
    :business-list="businessList"
    :options="options"
    :type-obj="typeObj"
    :diff-obj="diffObj"
    @isDialogVisible="isDialogVisible"
    @add="addQuestion"
    />
  </div>
</template>

<script>
import QuestionHeader from './QuestionHeader'
import QuestionBody from './QuestionBody'
import QuestionAdd from './QuestionAdd'
import { regionData } from "element-china-area-data"

import { getSubjectList } from 'network/subject'
import { getBusinessList } from 'network/business'
import { 
  getQuestionList,
  addQuestion,
  setQuestionStatus } from 'network/question'
import { tips } from 'common/utils'

export default {
  name: 'HomeQuestion',
  data () {
    return {
      mode: 'add',
      options: regionData,
      searchForm: {
        subject: '', //	否	int	学科id
        step: '', //	否	string	题目阶段:1(初级),2(中级),3(高级)
        enterprise: '', //	否	int	企业id
        type: '', //	否	int	题目类型:1(单选),2(多选),3(简答)
        difficulty: '', //	否	int	题目难度: 1(简单),2(一般),3(困难)
        username: '', //	否	string	作者
        status: '', //	否	int	状态:0(禁用),1(启用)
        create_date: '', //	否	string	创建日期
        title: '', //	否	string	标题名称
        page: '', //	否	string	页码 默认为1
        limit: '' //	否	string	页尺寸 默认为10
      },
      // 分页器
      pagination: {
        total: 10,
        pageSize: 5,
        currentPage: 1
      },
      addQuestionForm: {
        subject: '', //	是	int	学科id标识
        step: '', //	是	int	阶段1、初级 2、中级 3、高级
        enterprise: '', //	是	int	企业id标识
        city: [], //	是	array	[省、市、区县]
        type: 1, //	是	string	题型 1单选 、2多选 、3简答
        difficulty: 1, //	是	int	题目难度 1简单 、2一般 、3困难
        title: '', //	是	string	标题
        single_select_answer: '', //	是	string	单选题答案
        multiple_select_answer: [], //	是	array	多选题答案
        short_answer: '', //	是	string	简答题答案
        select_options: [
          {
            label: 'A',
            text: '',
            image: ''
          },
          {
            label: 'B',
            text: '',
            image: ''
          },
          {
            label: 'C',
            text: '',
            image: ''
          },
          {
            label: 'D',
            text: '',
            image: ''
          }
        ], //是	array	选项，介绍，图片介绍
        video: '', //	否	string	解析视频地址
        answer_analyze: '', //	是	string	答案解析
        remark: '' //	是	string	答案备注
      },
      subjectList: [],
      businessList: [],
      questionList: [],
      stepObj: {
        1: '初级',
        2: '中级',
        3: '高级'
      },
      typeObj: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      diffObj: {
        1: '简单',
        2: '一般',
        3: '困难'
      },
      statusObj: {
        0: '禁用',
        1: '启用'
      }
    }
  },
  created () {
    this.getSubjectList()
    this.getBusinessList()
    this.getQuestionList()
  },
  methods: {
    /**
     * 	网络请求相关方法
     */
    async getSubjectList () {
      const res = await getSubjectList({ limit: Infinity })
      const data = res.data.data.items
      this.subjectList = data.map((item => ({ id: item.id, name: item.name })))
    },
    async getBusinessList () {
      const res = await getBusinessList({ limit: Infinity })
      const data = res.data.data.items
      this.businessList = data.map((item => ({ id: item.id, name: item.name })))
    },
    async getQuestionList () {
      // 传参
      let params = {
        ...this.searchForm,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      }
      const res = await getQuestionList(params)
      const data = res.data.data.items
      data.forEach(item => {
        item.city = item.city.split(',')
        item.multiple_select_answer = item.multiple_select_answer.split(',')
      })
      this.pagination.total = res.data.data.pagination.total
      this.questionList = data
      console.log(this.questionList);
    },
    // 点击启用禁用文本
    async setStatus (id) {
      await setQuestionStatus({ id })
      tips('修改状态成功', 'success')
      this.getQuestionList()
    },
    async addQuestion(data) {
      try {
        this.mode = 'add'
        const res = await addQuestion(data)
        tips('新增成功', 'success')
        this.$refs.questionAdd.dialogVisible = false
        this.searchQuestion()
      } catch (error) {
        console.warn(error)
      }
    },
    /**
     * 	事件相关方法
     */
    // 改变页容量
    handleSizeChange (size) {
      this.pagination.pageSize = size
      // 页容量改变时，页码都变成1
      this.pagination.currentPage = 1
      this.getQuestionList()
    },
    // 点击页码
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getQuestionList()
    },
    // 模态框改变
    isDialogVisible () {
      // 字段还原
      this.addQuestionForm = {
        subject: '', 
        step: '', 
        enterprise: '', 
        city: [], 
        type: 1, 
        difficulty: 1, 
        title: '', 
        single_select_answer: '', 
        multiple_select_answer: [], 
        short_answer: '', 
        select_options: [
          {
            label: 'A',
            text: '',
            image: ''
          },
          {
            label: 'B',
            text: '',
            image: ''
          },
          {
            label: 'C',
            text: '',
            image: ''
          },
          {
            label: 'D',
            text: '',
            image: ''
          }
        ], 
        video: '', 
        answer_analyze: '', 
        remark: '' 
      }
      this.$refs.questionAdd.resetFields('addQuestionForm')
    },
    // 点击编辑打开模态框
    editDialogVisible (data) {
      this.mode = 'edit'
      this.$refs.questionAdd.dialogVisible = true
      this.addQuestionForm = JSON.parse(JSON.stringify(data))
    },
    // 点击搜索
    searchQuestion () {
      this.pagination.currentPage = 1
      this.getQuestionList()
    },
    // 点击清除
    resetForm () {
      this.searchQuestion()
    },
    // 点击新增科目
    increment () {
      this.mode = 'add'
      this.$refs.questionAdd.dialogVisible = true
    }
  },
  components: {
    QuestionHeader,
    QuestionBody,
    QuestionAdd
  }
}
</script>

<style scpoed>
.question-body {
  margin-top: 20px;
}

</style>