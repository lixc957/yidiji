<template>
  <el-form :model="searchForm" ref="searchForm" class="search-form" inline>
    <el-form-item label="用户名称" prop="username">
      <el-input
        v-model.trim.lazy="searchForm.username"
        class="search-input"
      ></el-input>
    </el-form-item>
    <el-form-item label="用户邮箱" prop="email">
      <el-input
        v-model.trim.lazy="searchForm.email"
        class="search-input"
      ></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="role_id">
      <el-select
        v-model="searchForm.role_id"
        placeholder="请选择角色"
        class="search-input"
      >
        <el-option label="管理员" value="2"></el-option>
        <el-option label="老师" value="3"></el-option>
        <el-option label="学生" value="4"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="search-btn">
      <el-button type="primary" @click="searchUser">搜索</el-button>
      <el-button @click="resetForm">清除</el-button>
      <el-button type="primary" @click="addUser">+ 新增用户</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { homeHeaderMixin } from 'common/mixin'

export default {
  name: 'UserHeader',
  props: {
    searchForm: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mixins: [homeHeaderMixin],
  methods: {
    searchUser() {
      this.$emit('searchUser')
    },
    addUser() {
      this.$emit('addUser')
    }
  },
}
</script>

<style>
.search-form .search-input {
  width: 120px;
}
</style>