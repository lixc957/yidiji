<template>
  <div class="data-header">
    <ul>
      <li>
        <div class="circle">{{titleInfo.increment_users}}</div>
        <p>今日新增用户</p>
      </li>
      <li>
        <div class="circle">{{titleInfo.total_users}}</div>
        <p>总用户量</p>
      </li>
      <li>
        <div class="circle">{{titleInfo.increment_questions}}</div>
        <p>新增试题</p>
      </li>
      <li>
        <div class="circle">{{titleInfo.total_questions}}</div>
        <p>总试题量</p>
      </li>
      <li>
        <div class="circle">{{titleInfo.total_done_questions}}</div>
        <p>总刷题量</p>
      </li>
      <li>
        <div class="circle">{{titleInfo.personal_questions}}</div>
        <p>人均刷题量</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DataHeader',
  props: {
    titleInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="less">
.data-header {
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      flex: 1;
      text-align: center; 
      .circle {
        display: inline-block;
        width: 99px;
        height: 99px;
        margin-bottom: 10px;
        line-height: 99px;
        font-size: 35px;
        font-family: SimHei Regular, SimHei Regular-Regular;
        font-weight: 400;
        color: #0086fa;
        border: 2px solid #0086fa;
        border-radius: 50%;
      }
      &:nth-of-type(3) .circle,
      &:nth-of-type(4) .circle {
        color: #f76137;
        border: 2px solid #f76137;
      }
      &:nth-of-type(5) .circle,
      &:nth-of-type(6) .circle {
        color: #55cd78;
        border: 2px solid #55cd78;
      }
      p {
        font-size: 16px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        color: #737373;
      }
    }
  }
}
</style>