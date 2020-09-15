<template>
  <div class="subject-list">
    <el-card>
      <el-form :model="searchForm" ref="searchForm" class="search-form" inline>
        <el-form-item label="学科编号">
          <el-input v-model.trim.lazy="searchForm.rid" class="search-input"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model.trim.lazy="searchForm.username" class="search-input"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model.trim.lazy="searchForm.name" class="search-input"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" class="search-input">
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
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HomeSubject',
  data() {
    return {
      searchForm: {
        rid:'', //	否	string	学科编号
        name:'', //	否	string	学科名称
        username:'', //	否	string	创建者用户名
        status:'', //	否	string	状态 0(禁用) 1(启用)
        page:'', //	否	string	页码 默认为1
        limit:'' //	否	string	页尺寸 默认为10
      }
    }
  },
}
</script>

<style>


.search-form .search-input {
  width: 120px;
}

</style>