<template>
  <el-form ref="form" :model="roleFormData" :rules="rules" label-width="80px">
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="roleFormData.name"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="describe">
      <el-input v-model="roleFormData.describe"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import formHandle from "../../../utils/form.handle";
import {getCurrentInstance} from "vue";

export default {
  name:'roleForm',
  props:['roleFormData'],
  setup(props) {
    const {proxy} = getCurrentInstance()
    const {validate, clear} = formHandle(proxy)
    return {
      validate,
      clear
    }
  },
  data() {
    return {
      rules:{
        name:[
          {required:true, message:'权限名称', trigger:'blur'}
        ],
        describe:[
          {required:true, message:'角色描述', trigger:'blur'}
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
