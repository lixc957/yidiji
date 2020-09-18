<template>
  <el-form
    :model="searchForm"
    ref="searchForm"
    class="search-form"
    label-width="100px"
  >
    <el-row>
      <el-col :span="5">
        <el-form-item label="学科" prop="subject">
          <el-select
            v-model.trim.lazy="searchForm.subject"
            placeholder="请选择学科"
          >
            <el-option 
            v-for="(item, index) in subjectList" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="阶段" prop="step">
          <el-select
            v-model.trim.lazy="searchForm.step"
            placeholder="请选择阶段"
          >
            <el-option
            v-for="(value, key, index) in stepObj" 
            :key="index" 
            :value="+key" :label="value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="企业" prop="enterprise">
          <el-select
            v-model.trim.lazy="searchForm.enterprise"
            placeholder="请选择企业"
          >
            <el-option 
            v-for="(item, index) in businessList" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="题型" prop="type">
          <el-select
            v-model.trim.lazy="searchForm.type"
            placeholder="请选择题型"
          >
            <el-option
            v-for="(value, key, index) in typeObj" 
            :key="index" 
            :value="+key" :label="value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>

    <el-row>
      <el-col :span="5">
        <el-form-item label="难度" prop="difficulty">
          <el-select
            v-model.trim.lazy="searchForm.difficulty"
            placeholder="请选择难度"
          >
            <el-option
            v-for="(value, key, index) in diffObj" 
            :key="index" 
            :value="+key" :label="value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="作者" prop="username">
          <el-input v-model.trim.lazy="searchForm.username"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="状态" prop="status">
          <el-select
            v-model.trim.lazy="searchForm.status"
            placeholder="请选择状态"
          >
            <el-option
            v-for="(value, key, index) in statusObj" 
            :key="index" 
            :value="+key" :label="value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="日期" prop="create_date">
          <el-date-picker 
          v-model.trim.lazy="searchForm.create_date" 
          type="date" 
          placeholder="选择日期"
          style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>

    <el-row>
      <el-col :span="10">
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim.lazy="searchForm.title"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="14">
        <el-form-item label-width="10px">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="resetForm">清除</el-button>
          <el-button type="primary" @click="add">+ 新增用户</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { homeMainHeaderMixin } from 'common/mixin'

export default {
  name: 'QuestionHeader',
  props: {
    searchForm: {
      type: Object,
      default () {
        return {}
      }
    },
    subjectList: {
      type: Array,
      default() {
        return []
      }
    },
    businessList: {
      type: Array,
      default() {
        return []
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
  mixins: [homeMainHeaderMixin]
}
</script>

<style scoped>
</style>