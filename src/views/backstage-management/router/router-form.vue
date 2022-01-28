<template>
  <el-form ref="form" :model="routerFormData" :rules="rules" label-width="80px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="routerFormData.title"></el-input>
    </el-form-item>
    <el-form-item label="组件路径" prop="viewPath">
      <el-input v-model="routerFormData.viewPath"></el-input>
    </el-form-item>
    <el-form-item label="路径" prop="path">
      <el-input v-model="routerFormData.path"></el-input>
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <el-input v-model="routerFormData.icon"></el-input>
    </el-form-item>
    <el-form-item label="权限" prop="permission">
      <el-input v-model="routerFormData.permission"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import {getCurrentInstance} from "vue";
import formHandle from "/src/utils/form.handle.js"

export default {
  name:'router-form',
  props:['routerFormData'],
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
        title:[
          {required:true, message:'请输入标题', trigger:'blur'}
        ],
        viewPath:[
          {required:true, message:'请输入组件路径', trigger:'blur'}
        ],
        path:[
          {required:true, message:'请输入路径', trigger:'blur'}
        ],
        icon:[
          {required:true, message:'请输入图片', trigger:'blur'}
        ],
        permission:[
          {required:true, message:'请输入权限', trigger:'blur'}
        ],
      }
    }
  }
}
</script>

<style scoped>

</style>
