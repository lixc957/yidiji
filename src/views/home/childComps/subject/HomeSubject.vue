<template>
  <div class="subject">
    <el-card class="subject-header">
      <subject-header />
    </el-card>

    <el-card class="subject-body">
      <subject-body :subject-list="subjectList" />
    </el-card>
  </div>
</template>

<script>
import SubjectHeader from './SubjectHeader'
import SubjectBody from './SubjectBody'

import { getSubjectList } from 'network/subject'

export default {
  name: 'HomeSubject',
  data() {
    return {
      subjectList: []
    }
  },
  created() {
    this.getSubjectList()
  },
  methods: {
    async getSubjectList() {
      const res = await getSubjectList()
      const data = res.data.data.items
      this.subjectList = data.map(item => ({
        rid: item.rid,
        name: item.name,
        short_name: item.short_name,
        username: item.username,
        status: item.status,
        create_time: item.create_time
      }))
    }
  },
  components: {
    SubjectHeader,
    SubjectBody
  }
}
</script>

<style>
.subject-body {
  margin-top: 20px;
}
</style>