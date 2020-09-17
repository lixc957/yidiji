<template>
  <div class="user-list">
    <el-card class="user-header">
      <user-header ref="userHeader" :search-form="searchForm" />
    </el-card>
  </div>
</template>

<script>
import UserHeader from './UserHeader'

import { getUserList } from 'network/user'

export default {
  name: 'HomeUser',
  data () {
    return {
      userList: [],
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
        pageSize: 1,
        currentPage: 1
      },
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
  },
  components: {
    UserHeader
  }
}
</script>

<style scoped>
</style>