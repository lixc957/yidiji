<template>
  <div class="data-view">
    <el-card>
      <data-header :titleInfo="titleInfo"  />
    </el-card>
    <el-card>
      <data-body />
    </el-card>
  </div>
</template>

<script>
import DataHeader from './DataHeader'
import DataBody from './DataBody'

import { getTitlteList } from 'network/data'

export default {
  name: 'HomeData',
  components: {
    DataHeader,
    DataBody
  },
  data() {
    return {
      titleInfo: {}
    }
  },
  created() {
    this.getTitlteList()
  },
  methods: {
    async getTitlteList() {
      const res = await getTitlteList()      
      this.titleInfo = res.data.data
    }
  },
}
</script>

<style scoped>

</style>