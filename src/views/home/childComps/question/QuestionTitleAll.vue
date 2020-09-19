<template>
  <div class="question-title-all">
    <!-- 单选 -->
    <div v-if="addQuestionForm.type === 1">
      <div
        class="item"
        v-for="(item, index) in addQuestionForm.select_options"
        :key="index"
      >
        <el-radio 
        v-model="addQuestionForm.single_select_answer" 
        :label="item.label">{{item.label}}</el-radio>
      
        <el-input v-model="item.text"></el-input>
        <up-load 
        v-model="item.image" 
        :imgUrl="item.image"
        name="file" />
      </div>
    </div>

    <!-- 多选 -->
    <div v-if="addQuestionForm.type === 2">
      <div
        class="item"
        v-for="(item, index) in addQuestionForm.select_options"
        :key="index"
      >
        <el-checkbox
        v-model="addQuestionForm.multiple_select_answer"
        :label="item.label"
        >{{ item.label }}</el-checkbox>
         
        <el-input v-model="item.text"></el-input>
        <up-load 
        v-model="item.image" 
        :imgUrl="item.image"
        name="file" />
      </div>
    </div>
    
    <!-- 简答 -->
    <div v-else>
      <el-input    
        type="textarea"
        :rows="5"
        v-model="addQuestionForm.short_answer"
      ></el-input>
    </div>
    
  </div>
</template>

<script>
import UpLoad from 'components/content/upload/UpLoad'

export default {
  name: 'QuestionTitleAll',
  components: {
    UpLoad
  },
  props: {
    addQuestionForm: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less">
.question-title-all {
  margin-top: 60px;
  .item {
    display: flex;
    align-items: center;
    .el-radio {
      width: 50px;
    }
    .el-checkbox {
      margin-right: 20px;
    }
    .el-input {
      flex: 1;
    }
    .avatar-uploader {
      flex: 1;
    }
  }
}
</style>