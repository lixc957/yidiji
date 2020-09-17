<template>
  <el-dialog :visible.sync="dialogVisible" class="add-subject" width="600px">
    <div class="title" slot="title">
      {{ mode === 'add' ? '新增学科' : '编辑学科' }}
    </div>

    <el-form
      :model="addSubjectForm"
      :rules="rules"
      label-width="100px"
      ref="addSubjectForm"
      class="add-subject-form"
    >
      <el-form-item class="input-item" label="学科编号" prop="rid">
        <el-input v-model.lazy.trim="addSubjectForm.rid"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="学科名称" prop="name">
        <el-input v-model.lazy.trim="addSubjectForm.name"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="学科简称" prop="short_name">
        <el-input v-model.lazy.trim="addSubjectForm.short_name"></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="学科简介" prop="intro">
        <el-input
          v-model.lazy.trim="addSubjectForm.intro"
        ></el-input>
      </el-form-item>

      <el-form-item class="input-item" label="学科备注" prop="remark">
        <el-input
          v-model.lazy.trim="addSubjectForm.remark"
        ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('addSubjectForm')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserAdd',
}
</script>

<style scoped>

</style>