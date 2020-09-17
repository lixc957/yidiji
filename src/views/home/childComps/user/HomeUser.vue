<template>
  <div class="user-list">
    <el-card class="user-header">
      <user-header
        ref="userHeader"
        :search-form="searchForm"
        @search="searchUser"
        @resetForm="resetForm"
        @add="increment"
      />
    </el-card>

    <el-card class="user-body">
      <user-body
        ref="UserBody"
        :user-list="userList"
        :pagination="pagination"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @setStatus="setStatus"
        @editDialogVisible="editDialogVisible"
        @del="delUser"
      />
    </el-card>

    <user-add
      ref="userAdd"
      :add-user-form="addUserForm"
      :mode="mode"
      :role-obj="roleObj"
      @isDialogVisible="isDialogVisible"
      @add="addUser"
      @edit="editUser"
    />
  </div>
</template>

<script>
import UserHeader from './UserHeader'
import UserBody from './UserBody'
import UserAdd from './UserAdd'

import {
  getUserList,
  setUserStatus,
  addUser,
  editUser,
  delUser
} from 'network/user'
import { tips } from 'common/utils'

export default {
  name: 'HomeUser',
  data () {
    return {
      userList: [],
      mode: 'add',
      searchForm: {
        username: '', //	否	string	昵称
        email: '', //	否	string	邮箱
        role_id: '', //	否	string	角色数字 2管理员、3老师、 4学生
        page: '', //	否	string	页码 默认为1
        limit: '', //	否	string	页尺寸 默认为10
      },
      // 分页器
      pagination: {
        total: 10,
        pageSize: 5,
        currentPage: 1
      },
      // 模态框
      addUserForm: {
        username: '', //	是	string	用户名
        email: '', //	是	string	邮箱
        phone: '', //	是	string	手机号
        role_id: '', //	是	string	角色 、2 管理员、3 老师、4 学生
        status: '', //	否	string	1(启用)0(禁用)
        remark: '' //	否	string	备注
      },
      // 角色信息
      roleObj: {
        1: '超级管理员',
        2: '管理员',
        3: '老师',
        4: '学生'
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    /**
     * 	网络请求相关方法
     */
    async getUserList () {
      // 传参
      let params = {
        ...this.searchForm,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      }
      const res = await getUserList(params)
      const data = res.data.data.items
      this.pagination.total = res.data.data.pagination.total
      this.userList = data
    },
    // 点击启用禁用文本
    async setStatus (id) {
      await setUserStatus({ id })
      tips('修改状态成功', 'success')
      this.getUserList()
    },
    async addUser(data) {
      try {
        this.mode = 'add'
        await addUser(data)
        tips('新增成功', 'success')
        this.$refs.userAdd.dialogVisible = false
        this.searchUser()
      } catch (error) {
        console.warn(error)
      }
    },
    async editUser (data) {
      try {
        await editUser(data)
        tips('编辑成功', 'success')
        this.$refs.userAdd.dialogVisible = false
        this.getUserList()
      } catch (error) {
        console.warn(error)
      }
    },
    async delUser (id) {
      await delUser({ id })
      tips('删除成功', 'success')
      this.getUserList()
    },

    /**
     * 	事件相关方法
     */
    // 改变页容量
    handleSizeChange (size) {
      this.pagination.pageSize = size
      // 页容量改变时，页码都变成1
      this.pagination.currentPage = 1
      this.getUserList()
    },
    // 点击页码
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getUserList()
    },
    // 模态框改变
    isDialogVisible () {
      // 字段还原
      this.addUserForm = {
        username: '',
        email: '', 
        phone: '', 
        role_id: '', 
        status: '', 
        remark: '' 
      }
      this.$refs.userAdd.resetFields('addUserForm')
    },
    // 点击搜索
    searchUser () {
      this.pagination.currentPage = 1
      this.getUserList()
    },
    // 点击清除
    resetForm () {
      this.searchUser()
    },
    // 点击新增科目
    increment () {
      this.mode = 'add'
      this.$refs.userAdd.dialogVisible = true
    },
    // 点击编辑打开模态框
    editDialogVisible (data) {
      this.mode = 'edit'
      this.$refs.userAdd.dialogVisible = true
      this.addUserForm = JSON.parse(JSON.stringify(data))
    },
  },
  components: {
    UserHeader,
    UserBody,
    UserAdd
  }
}
</script>

<style>
.user-body {
  margin-top: 20px;
}
</style>