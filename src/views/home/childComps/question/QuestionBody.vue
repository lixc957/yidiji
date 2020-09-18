<template>
  <div>
    <el-table :data="questionList" v-if="questionList.length" border>
      <el-table-column label="序号" width="50px">
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="题目">
        <template v-slot="scope">
          <div v-html="scope.row.title"></div>
        </template>
      </el-table-column>
      <el-table-column label="学科.阶段">
        <template v-slot="scope">
          <div>{{ scope.row.subject_name }}.{{ stepObj[scope.row.step] }}</div>
        </template>
      </el-table-column>
      <el-table-column label="题型">
        <template v-slot="scope">
          <div>{{ typeObj[scope.row.type] }}</div>
        </template>
      </el-table-column>
      <el-table-column label="企业" prop="enterprise_name"></el-table-column>
      <el-table-column label="创建者" prop="username"></el-table-column>
      <el-table-column label="状态" width="80px">
        <template v-slot="scope">
          <div>{{ statusObj[scope.row.status] }}</div>
        </template>
      </el-table-column>
      <el-table-column label="访问量" prop="reads"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text">
            {{ scope.row.status === 0 ? '启用' : '禁用' }}
          </el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-else border>
      <el-table-column label="序号" width="50px"></el-table-column>
      <el-table-column label="题目"></el-table-column>
      <el-table-column label="学科.阶段"></el-table-column>
      <el-table-column label="题型"></el-table-column>
      <el-table-column label="企业" prop="enterprise_name"></el-table-column>
      <el-table-column label="创建者" prop="username"></el-table-column>
      <el-table-column label="状态" width="80px"></el-table-column>
      <el-table-column label="访问量" prop="reads"></el-table-column>
      <el-table-column label="操作"></el-table-column>
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
  name: 'QuestionBody',
  props: {
    questionList: {
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
    },
    stepObj: {
      type: Object,
      default () {
        return {}
      }
    },
    typeObj: {
      type: Object,
      default () {
        return {}
      }
    },
    diffObj: {
      type: Object,
      default () {
        return {}
      }
    },
    statusObj: {
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