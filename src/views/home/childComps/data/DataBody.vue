<template>
  <div class="pie" ref="pie"></div>
</template>

<script>
import echarts from "echarts"

const option = {
  color: ['#F76137', '#F9B358','#409EFF'],
  title: {
    text: '整体数据',
    textStyle: {
      color: '#666',
      fontSize: 21,
      fontWeight: 400
    },
    left: '35px',
    top: '14px'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    top: '5%',
    right: '10%',
    textStyle: {
      color: '#666',
      fontSize: 18,
      fontWeight: 400,
      padding: [3, 0, 0, 23]
    },
    itemGap: 33,
    itemWidth: 11,
    itemHeight:11,
  },
  series: [
    {
      name: '整体数据',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
}

export default {
  name: 'DataBody',
  props: {
    statisticsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      myChart: ''
    }
  },
  mounted () {
    this.getPieData()
  },
  methods: {
    getPieData () {
      this.myChart = echarts.init(this.$refs.pie)
      option.series[0].data = this.statisticsList
      this.myChart.setOption(option)
    }
  },
}
</script>

<style scoped>
.pie {
  width: 100%;
  height: 470px;
}
</style>