<template>
  <el-form ref="form" :model="userFormData" :rules="rules" label-width="80px">
    <el-form-item label="账号" prop="userName">
      <el-input v-model="userFormData.userName"></el-input>
    </el-form-item>
    <el-form-item label="中文名" prop="realName">
      <el-input v-model="userFormData.realName"></el-input>
      <input type="button" @click="test" value="xxx">
    </el-form-item>
  </el-form>
</template>

<script>
import {getCurrentInstance} from "vue";
import formHandle from "/src/utils/form.handle.js"

export default {
  name:'user-form',
  props:['userFormData'],
  setup(props) {
    const {validate, clear} = formHandle(getCurrentInstance());
    return {
      validate,
      clear
    }
  },
  data() {
    return {
      rules:{
        userName:[
          {required:true, message:'请输入账号', trigger:'blur'}
        ],
        realName:[
          {required:true, message:'请输入中文名', trigger:'blur'}
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
