<template>
  <div class="user-list">
    <el-card class="user-header">
      <user-header 
      ref="userHeader"
      :search-form="searchForm"
       />
    </el-card>
  </div>
</template>

<script>
import UserHeader from './UserHeader'

export default {
  name: 'HomeUser',
  data () {
    return {
      searchForm: {
        username: '', //	否	string	昵称
        email: '', //	否	string	邮箱
        role_id: '', //	否	string	角色数字 2管理员、3老师、 4学生
        page: '', //	否	string	页码 默认为1
        limit: '', //	否	string	页尺寸 默认为10
      },
    }
  },
  components: {
    UserHeader
  }
}
</script>

<style scoped>
</style>