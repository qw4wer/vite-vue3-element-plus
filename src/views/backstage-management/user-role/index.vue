<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table ref="tableRef" :data="roleData" highlight-current-row style="width: 100%" border
                  :max-height="tableHeight" :min-height="tableHeight" @selection-change="selectionChange">
          <el-table-column v-if=false prop="id" label="id"></el-table-column>
          <el-table-column type="selection" width="55"/>
          <el-table-column align="center" prop="name" label="角色名" min-width="20%"></el-table-column>
          <el-table-column align="center" prop="describe" label="角色描述" min-width="30%">
          </el-table-column>
        </el-table>
        <el-button @click="saveUserRole">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userRole from './index.js'

export default {
  name:"index",
  props:{
    id:{
      type:Number,
      required:true,
    },
    timeStamp:{
      type:Number,
      required:true,
    },
  },
  setup(props) {
    return {...userRole(props)}
  },

}
</script>

<style scoped>

</style>
