<template>
  <div>
    <el-table :data="userList" v-if="userList.length">
      <el-table-column label="序号" width="50px">
        <template v-slot="scope">
          {{
            (pagination.currentPage - 1) * pagination.pageSize +
            scope.$index +
            1
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
      ></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="角色" prop="role"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="状态" width="100px">
        <template v-slot="scope">
          <span :class="{ isDisabled: scope.row.status === 0 }">{{
            scope.row.status === 1 ? '启用' : '禁用'
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" @click="setStatus(scope.row.id)">
            {{ scope.row.status === 0 ? '启用' : '禁用' }}
          </el-button>
          <el-button type="text" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-table v-else>
      <el-table-column label="序号" width="50px">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
      ></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="角色" prop="role"></el-table-column>
      <el-table-column label="备注" prop="create_time"></el-table-column>
      <el-table-column label="状态" width="100px">
      </el-table-column>
      <el-table-column label="操作">
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
import { homeMainBodyMixin } from 'common/mixin'

export default {
  name: 'UserBody',
  props: {
    userList: {
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
  mixins: [homeMainBodyMixin]
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