<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo aside-bar"
    :collapse="isCollapse"
    router
  >
    <template v-for="(item, index) in routerOpations">
      <el-menu-item 
      :key="index"
      :index="item.path"
      v-if="item.meta.roles.includes($store.state.role)"
      >
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </template>
    
    <!-- <el-menu-item index="/home/user">
      <i class="el-icon-user"></i>
      <span slot="title">用户列表</span>
    </el-menu-item>
    <el-menu-item index="/home/question">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">题库列表</span>
    </el-menu-item>
    <el-menu-item index="/home/business">
      <i class="el-icon-office-building"></i>
      <span slot="title">企业列表</span>
    </el-menu-item>
    <el-menu-item index="/home/subject">
      <i class="el-icon-notebook-2"></i>
      <span slot="title">学科列表</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  name: 'AsideView',
  data() {
    return {
      isCollapse: false
    }
  },
  props: {
    routerOpations: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
    console.log(this.$router)
    console.log(this.routerOpations)
  },
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
}
</style>