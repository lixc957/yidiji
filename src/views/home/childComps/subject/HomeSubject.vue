<template>
  <div class="subject">
    <el-card class="subject-header">
      <subject-header 
      ref="subjectHeader" 
      :search-form="searchForm"
      @searchSubject="searchSubject"
      @resetForm="resetForm" 
      @addSubject="addSubject"
      />
    </el-card>

    <el-card class="subject-body">
      <subject-body 
      :subject-list="subjectList" 
      :pagination="pagination"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @setStatus="setStatus"
      ref="subjectBody" />
    </el-card>

    <subject-add ref="subjectAdd" @addSubject="add" />
  </div>
</template>

<script>
import SubjectHeader from './SubjectHeader'
import SubjectBody from './SubjectBody'
import SubjectAdd from './SubjectAdd'

import { getSubjectList, setSubjectStatus, addSubject } from 'network/subject'
import { tips } from 'common/utils'

export default {
  name: 'HomeSubject',
  data() {
    return {
      subjectList: [],
      // 搜索数据
      searchForm: {
        rid:'', //	否	string	学科编号
        name:'', //	否	string	学科名称
        username:'', //	否	string	创建者用户名
        status:'', //	否	string	状态 0(禁用) 1(启用)
        page:'', //	否	string	页码 默认为1
        limit:'' //	否	string	页尺寸 默认为10
      },
      // 分页器
      pagination: {
        total: 10,
        pageSize: 1,
        currentPage: 1
      }
    }
  },
  created() {
    this.getSubjectList()
  },
  methods: {
    /**
     * 	网络请求相关方法
     */
    async getSubjectList() {  
      // 传参
      let params = {
        ...this.searchForm,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      }
      const res = await getSubjectList(params)
      const data = res.data.data.items
      this.pagination.total = res.data.data.pagination.total
      this.subjectList = data.map(item => ({
        id: item.id,
        rid: item.rid,
        name: item.name,
        short_name: item.short_name,
        username: item.username,
        status: item.status,
        create_time: item.create_time
      }))
    },
    // 点击启用禁用文本
    setStatus(id) {
      setSubjectStatus({ id }).then(() => {
        tips('修改状态成功', 'success')
        this.getSubjectList()
      })
    },

    async add(data) {
      //await addSubject(data)
      tips('新增成功', 'success')
    },

    /**
     * 	事件相关方法
     */
    // 改变页容量
    handleSizeChange(size) {
       this.pagination.pageSize = size
       // 页容量改变时，页码都变成1
       this.pagination.currentPage = 1
       this.getSubjectList()
    },
    // 点击页码
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getSubjectList()
    },
    // 点击搜索
    searchSubject() {
      this.pagination.currentPage = 1
      this.getSubjectList()
    },
    // 点击清除
    resetForm() {
      this.searchSubject()
    },
    // 点击新增科目
    addSubject() {
      this.$refs.subjectAdd.dialogVisible = true
    }
  },
  components: {
    SubjectHeader,
    SubjectBody,
    SubjectAdd
  }
}
</script>

<style>
.subject-body {
  margin-top: 20px;
}
</style>