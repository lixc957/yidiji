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
      />
    </el-card>
  </div>
</template>

<script>
import QuestionHeader from './QuestionHeader'
import QuestionBody from './QuestionBody'

import { getSubjectList } from 'network/subject'
import { getBusinessList } from 'network/business'
import { getQuestionList } from 'network/question'

export default {
  name: 'HomeQuestion',
  data () {
    return {
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
      this.pagination.total = res.data.data.pagination.total
      this.questionList = data
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
      // this.mode = 'add'
      // this.$refs.userAdd.dialogVisible = true
    }
  },
  components: {
    QuestionHeader,
    QuestionBody
  }
}
</script>

<style>
.question-body {
  margin-top: 20px;
}
</style>