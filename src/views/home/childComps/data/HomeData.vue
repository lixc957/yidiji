<template>
  <div class="data-view" v-if="statisticsList.length">
    <el-card>
      <data-header :titleInfo="titleInfo"  />
    </el-card>
    <el-card class="data-body">
      <data-body :statisticsList="statisticsList" />
    </el-card>
  </div>
</template>

<script>
import DataHeader from './DataHeader'
import DataBody from './DataBody'

import { getTitlteInfo, getStatisticsList } from 'network/data'

export default {
  name: 'HomeData',
  components: {
    DataHeader,
    DataBody
  },
  data() {
    return {
      titleInfo: {},
      statisticsList: []
    }
  },
  created() {
    this.getTitlteInfo()
    this.getStatisticsList()
  },
  methods: {
    async getTitlteInfo() {
      const res = await getTitlteInfo()      
      this.titleInfo = res.data.data
    },
    async getStatisticsList() {
      const res = await getStatisticsList()      
      this.statisticsList = res.data.data
    }
  },
}
</script>

<style scoped>
.data-body {
  width: 100%;
  height: 470px;
  margin-top: 10px;
}
</style>