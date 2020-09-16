<template>
  <el-form :model="searchForm" ref="searchForm" class="search-form" inline>
    <el-form-item label="学科编号">
      <el-input
        v-model.trim.lazy="searchForm.rid"
        class="search-input"
      ></el-input>
    </el-form-item>
    <el-form-item label="学科名称">
      <el-input
        v-model.trim.lazy="searchForm.username"
        class="search-input"
      ></el-input>
    </el-form-item>
    <el-form-item label="创建者">
      <el-input
        v-model.trim.lazy="searchForm.name"
        class="search-input"
      ></el-input>
    </el-form-item>
    <el-form-item label="状态">
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
      <el-button type="primary">搜索</el-button>
      <el-button>清除</el-button>
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
      default() {
        return {}
      }
    }
  }
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