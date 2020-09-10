<template>
  <el-dialog 
  :visible.sync="dialogVisible" 
  :show-close="false" 
  class="register"
  width="603px"
  >
    <div class="title" slot="title">用户注册</div>
    <div slot="footer" class="dialog-footer footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      dialogVisible: false
    }
  },
}
</script>

<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .title {
    width: 100%;
    height: 53px;
    color: #ffffff;
    text-align: center;
    background: linear-gradient(#1493fa, #01c6fa);
    line-height: 53px;
    font-size: 14px;
  }
  .footer {
    text-align: center;
  }
}
</style>