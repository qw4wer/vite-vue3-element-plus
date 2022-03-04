<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table ref="tableRef" :data="roleData" highlight-current-row style="width: 100%" border
                  :max-height="tableHeight" :min-height="tableHeight" @selection-change="selectionChange">
          <el-table-column v-if=false prop="id" label="id"></el-table-column>
          <el-table-column type="selection" width="55"/>
          <el-table-column align="center" prop="permissionName" label="权限名" min-width="20%"></el-table-column>
          <el-table-column align="center" prop="permissionCode" label="权限代码" min-width="30%">
          </el-table-column>
        </el-table>
        <el-button @click="saveRolePermission">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import rolePermission from './index.js'

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
    return {...rolePermission(props)}
  },

}
</script>

<style scoped>

</style>
