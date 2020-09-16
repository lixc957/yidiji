<template>
  <el-form :model="searchForm" ref="searchForm" class="search-form" inline>
    <el-form-item label="学科编号" prop="rid">
      <el-input
        v-model.trim.lazy="searchForm.rid"
        class="search-input"
      ></el-input>
    </el-form-item>
    <el-form-item label="学科名称" prop="username">
      <el-input
        v-model.trim.lazy="searchForm.username"
        class="search-input"
      ></el-input>
    </el-form-item>
    <el-form-item label="创建者" prop="name">
      <el-input
        v-model.trim.lazy="searchForm.name"
        class="search-input"
      ></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select
        v-model="searchForm.status"
        placeholder="请选择"
        class="search-input"
      >
        <el-option label="禁用" value="0"></el-option>
        <el-option label="启用" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="search-btn">
      <el-button type="primary" @click="searchSubject">搜索</el-button>
      <el-button @click="resetForm">清除</el-button>
      <el-button type="primary">+ 新增学科</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SubjectHeader',
  props: {
    searchForm: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    searchSubject () {
      this.$emit('searchSubject')
    },
    resetForm() {
      // 清空表单
      this.$refs.searchForm.resetFields()
      this.$emit('resetForm')
    }
  },
}
</script>

<style>
.search-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.search-form .search-input {
  width: 120px;
}
</style>