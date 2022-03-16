<template>
  <el-form ref="form" :model="permissionFormData" :rules="rules" label-width="80px">
    <el-form-item label="权限名称" prop="permissionName">
      <el-input v-model="permissionFormData.permissionName"></el-input>
    </el-form-item>
    <el-form-item label="权限代码" prop="permissionCode">
      <el-input v-model="permissionFormData.permissionCode"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import formHandle from "../../../utils/form.handle";
import {getCurrentInstance} from "vue";

export default {
  name:'permissionForm',
  props:['permissionFormData'],
  setup(props) {
    const {validate, clear} = formHandle()
    return {
      validate,
      clear,
    }
  },
  data() {
    return {
      rules:{
        permissionName:[
          {required:true, message:'权限名称', trigger:'blur'}
        ],
        permissionCode:[
          {required:true, message:'权限代码', trigger:'blur'}
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
