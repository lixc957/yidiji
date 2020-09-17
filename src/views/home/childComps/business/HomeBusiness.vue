<template>
  <div class="business-list">
    <el-card class="business-header">
      <business-header
        ref="userHeader"
        :search-form="searchForm"
        @search="searchBusiness"
        @resetForm="resetForm"
        @add="increment"
      />
    </el-card>

    <el-card class="business-body">
      <business-body
        :business-list="businessList"
        :pagination="pagination"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @setStatus="setStatus"
        @editDialogVisible="editDialogVisible"
        @del="delBusiness"
        ref="businessBody"
      />
    </el-card>

    <business-add
      ref="businessAdd"
      @add="addBusiness"
      @edit="editBusiness"
      @isDialogVisible="isDialogVisible"
      :add-business-form="addBusinessForm"
      :mode="mode"
    />
  </div>
</template>

<script>
import BusinessHeader from './BusinessHeader'
import BusinessBody from './BusinessBody'
import BusinessAdd from './BusinessAdd'

import {
  getBusinessList,
  setBusinessStatus,
  addBusiness,
  editBusiness,
  delBusiness
} from 'network/business'
import { tips } from 'common/utils'

export default {
  name: 'HomeBusiness',
  data () {
    return {
      businessList: [],
      mode: 'add',
      searchForm: {
        eid: '', //	否	string	企业id
        name: '', //	否	string	企业名称
        username: '', //	否	string	用户名
        status: '', //	否	string	状态 1（启用） 0（禁用）
        page: '', //	否	string	页码 默认为1
        limit: '' //	否	string	页尺寸 默认为10
      },
      // 分页器
      pagination: {
        total: 10,
        pageSize: 5,
        currentPage: 1
      },
      // 模态框
      addBusinessForm: {
        eid: '', //	是	string	企业编号
        name: '', //	是	string	企业名称
        short_name: '', //	是	string	简称
        intro: '', //	是	string	企业简介
        remark: '' //	否	string	备注
      },
    }
  },
  created () {
    this.getBusinessList()
  },
  methods: {
    /**
     * 	网络请求相关方法
     */
    async getBusinessList () {
      // 传参
      let params = {
        ...this.searchForm,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      }
      const res = await getBusinessList(params)
      const data = res.data.data.items
      this.pagination.total = res.data.data.pagination.total
      this.businessList = data
    },
    // 点击启用禁用文本
    async setStatus (id) {
      await setBusinessStatus({ id })
      tips('修改状态成功', 'success')
      this.getBusinessList()
    },

    async addBusiness (data) {
      try {
        this.mode = 'add'
        await addBusiness(data)
        tips('新增成功', 'success')
        this.$refs.businessAdd.dialogVisible = false
        this.searchBusiness()
      } catch (error) {
        console.warn(error)
      }
    },

    async editBusiness (data) {
      try {
        await editBusiness(data)
        tips('编辑成功', 'success')
        this.$refs.businessAdd.dialogVisible = false
        this.getBusinessList()
      } catch (error) {
        console.warn(error)
      }
    },

    async delBusiness (id) {
      await delBusiness({ id })
      tips('删除成功', 'success')
      this.getBusinessList()
    },

    /**
     * 	事件相关方法
     */
    // 改变页容量
    handleSizeChange (size) {
      this.pagination.pageSize = size
      // 页容量改变时，页码都变成1
      this.pagination.currentPage = 1
      this.getBusinessList()
    },
    // 点击页码
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getBusinessList()
    },
    // 点击编辑打开模态框
    editDialogVisible (data) {
      this.mode = 'edit'
      this.$refs.businessAdd.dialogVisible = true
      this.addBusinessForm = JSON.parse(JSON.stringify(data))
    },
    // 模态框改变
    isDialogVisible () {
      // 字段还原
      this.addBusinessForm = {
        eid: '', 
        name: '', 
        short_name: '', 
        intro: '', 
        remark: ''
      }
      this.$refs.businessAdd.resetFields('addBusinessForm')
    },
    // 点击搜索
    searchBusiness () {
      this.pagination.currentPage = 1
      this.getBusinessList()
    },
    // 点击清除
    resetForm () {
      this.searchBusiness()
    },
    // 点击新增科目
    increment () {
      this.mode = 'add'
      this.$refs.businessAdd.dialogVisible = true
    }
  },
  components: {
    BusinessHeader,
    BusinessBody,
    BusinessAdd
  }
}
</script>

<style>
.business-body {
  margin-top: 20px;
}
</style>