<template>
  <div>
    <el-table :data="subjectList" v-if="subjectList.length">
      <el-table-column label="序号" width="50px">
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="学科编号"
        prop="rid"
        width="100px"
      ></el-table-column>
      <el-table-column label="学科名称" prop="name"></el-table-column>
      <el-table-column label="简称" prop="short_name"></el-table-column>
      <el-table-column label="创建者" prop="username"></el-table-column>
      <el-table-column label="创建日期" prop="create_time"></el-table-column>
      <el-table-column label="状态" width="100px">
        <template v-slot="scope">
          <span :class="{ isDisabled: scope.row.status === 0 }">{{
            scope.row.status === 1 ? '启用' : '禁用'
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="text">编辑</el-button>
        <el-button type="text">禁用</el-button>
        <el-button type="text">删除</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      background
      class="pagination"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'SubjectBody',
  props: {
    subjectList: {
      type: Array,
      default () {
        return []
      }
    },
    pagination: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleSizeChange (size) {
      // 当前页容量
      this.$emit('handleSizeChange', size)
    },
    handleCurrentChange (val) {
      // 当前页码
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style>
.isDisabled {
  color: red;
}

.pagination {
  margin-top: 40px;
  text-align: center;
}
</style>