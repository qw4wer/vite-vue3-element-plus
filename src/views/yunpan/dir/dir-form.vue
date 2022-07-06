<template>
  <el-form ref="form" :model="dirFormData" :rules="rules" label-width="80px">
    <el-form-item label="文件夹名称" prop="dirName">
      <el-input v-model="dirFormData.dirName"></el-input>
    </el-form-item>
    <el-form-item label="文件夹路径" prop="path">
      <el-input v-model="dirFormData.path"></el-input>
    </el-form-item>
    <el-form-item label="文件夹描述" prop="describe">
      <el-input v-model="dirFormData.describe"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import formHandle from "/src/utils/form.handle.js"

export default {
  name: 'dir-form',
  props: ['dirFormData'],
  setup(props) {
    const { validate, clear } = formHandle();
    return {
      validate,
      clear
    }
  },
  data() {
    return {
      rules: {
        dirName: [
          { required: true, message: '请输入文件夹名称', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入文件夹路径', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入文件夹描述', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
