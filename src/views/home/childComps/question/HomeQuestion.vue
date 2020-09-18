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
       />
    </el-card>
  </div>
</template>

<script>
import QuestionHeader from './QuestionHeader'

import { getSubjectList } from 'network/subject'
import { getBusinessList } from 'network/business'

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
      subjectList: [],
      businessList: [],
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
  },
  methods: {
    /**
     * 	网络请求相关方法
     */
    async getSubjectList () {
      const res = await getSubjectList({limit: Infinity})
      const data = res.data.data.items
      this.subjectList = data.map((item => ({rid: item.rid, name: item.name})))
    },
    async getBusinessList () {
      const res = await getBusinessList({limit: Infinity})
      const data = res.data.data.items
      this.businessList = data.map((item => ({eid: item.eid, name: item.name})))
    },
  },
  components: {
    QuestionHeader
  }
}
</script>

<style scoped>
</style>