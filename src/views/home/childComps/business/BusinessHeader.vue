<template>
  <el-form :model="searchForm" ref="searchForm" class="search-form" inline>
    <el-form-item label="企业编号" prop="eid">
      <el-input
        v-model.trim.lazy="searchForm.eid"
        class="search-input"
      ></el-input>
    </el-form-item>

    <el-form-item label="企业名称" prop="name">
      <el-input
        v-model.trim.lazy="searchForm.name"
        class="search-input"
      ></el-input>
    </el-form-item>

    <el-form-item label="创建者" prop="username">
      <el-input
        v-model.trim.lazy="searchForm.username"
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
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="resetForm">清除</el-button>
      <el-button type="primary" @click="add">+ 新增企业</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { homeMainHeaderMixin } from 'common/mixin'

export default {
  name: 'BusinessHeader',
  props: {
    searchForm: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mixins: [homeMainHeaderMixin]
}

</script>

<style>
.search-form .search-input {
  width: 120px;
}
</style>