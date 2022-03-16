<template>
  <div>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="queryForm.name" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="queryForm.describe" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="queryForm.status" placeholder="状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findByCond">查询</el-button>
        <el-button type="primary" @click="toAdd">新建</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="isLoading" :data="tableData" highlight-current-row :fit=true style="width: 100%">
      <el-table-column align="center" prop="id" label="id" width="180" v-if="false"></el-table-column>
      <el-table-column align="center" prop="name" label="角色名称" width="180"></el-table-column>
      <el-table-column align="center" prop="describe" label="描述" width="180"></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button size="small" @click="toUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" @click="toEditRolePermission(scope.$index, scope.row)">角色</el-button>
          <el-button size="small" type="danger" @click="toDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <form-dialog title="新建/修改角色" ref="roleDialog" :submit-fn="submitFn" :after-submit-fn="findByCond">
      <template v-slot:body>
        <role-form :roleFormData="formData"/>
      </template>
    </form-dialog>

    <el-dialog
        title="编辑权限"
        :model-value="userRoleDialogVisible"
        width="80%"
        :before-close="handleClose">
      <role-permission :id="id" :timeStamp="timeStamp" ref="userRoleRef"/>

    </el-dialog>
  </div>
</template>

<script>
import {getCurrentInstance, ref} from "vue";
import bind from "../../../utils/index.handle";

export default {
  name:'index',
  setup() {
    const queryForm = ref({
      name:'',
      describe:'',
      status:''
    })

    const formData = ref({
      name:null,
      describe:null,
      id:null
    })

    const {proxy} = getCurrentInstance();
    const bindHandle = bind({
      module:'role',
      queryForm:queryForm,
      formData:formData,
      dialog:'roleDialog'
    }, proxy);

    const userRoleDialogVisible = ref(false)
    const id = ref(0)
    const timeStamp = ref(0)

    const toEditRolePermission = (index, row) => {
      id.value = row.id
      timeStamp.value = new Date().getTime()
      userRoleDialogVisible.value = true
    }
    const handleClose = () => {
      userRoleDialogVisible.value = false
    }

    return {
      ...bindHandle,
      queryForm,
      formData,
      userRoleDialogVisible,
      toEditRolePermission,
      handleClose,
      id,
      timeStamp
    }
  },
  computed:{},
  methods:{}
}
</script>

<style scoped>

</style>
