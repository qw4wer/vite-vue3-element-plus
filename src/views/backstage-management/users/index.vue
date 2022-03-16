<template>
  <div>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="queryForm.userName" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="中文名">
        <el-input v-model="queryForm.realName" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="queryForm.status" placeholder="用户状态">
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

    <el-table v-loading="isLoading" :data="tableData" highlight-current-row style="width: 100%" border
              :max-height="tableHeight">
      <el-table-column v-if=false prop="id" label="id"></el-table-column>
      <el-table-column type="index" align="center" label="编号" min-width="10%"></el-table-column>
      <el-table-column align="center" prop="userName" label="账号" min-width="20%"></el-table-column>
      <el-table-column align="center" prop="realName" label="中文名" min-width="20%"></el-table-column>
      <el-table-column align="center" prop="status" label="状态" min-width="15%"></el-table-column>
      <el-table-column align="center" label="操作" min-width="30%">
        <template #default="scope">
          <el-button size="small" @click="toUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" @click="toEditUserRole(scope.$index, scope.row)">角色</el-button>
          <el-button size="small" type="danger" @click="toDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>


    <form-dialog title="新建/修改用户" ref="userDialog" :submit-fn="submitFn" :after-submit-fn="findByCond">
      <template v-slot:body>
        <user-form :userFormData="formData" @clear="clear"/>
      </template>
    </form-dialog>

    <el-dialog
        title="编辑角色"
        :model-value="userRoleDialogVisible"
        width="80%"
        :before-close="handleClose">
      <user-role :id="id" :timeStamp="timeStamp" ref="userRoleRef"/>

    </el-dialog>

  </div>
</template>

<script>
import bind from '../../../utils/index.handle'
import {getCurrentInstance, ref} from "vue";
import user from "../../../apis/user";

export default {
  name:'index',
  setup() {
    const queryForm = ref({
      userName:'',
      realName:'',
      status:''
    })

    const formData = ref({
      userName:null,
      realName:null,
      id:null
    })

    const {proxy} = getCurrentInstance()
    const bindHandle = bind({
      module:'user',
      queryForm:queryForm,
      formData:formData,
      dialog:'userDialog'
    }, proxy)

    const userRoleDialogVisible = ref(false)
    const id = ref(0)
    const timeStamp = ref(0)

    const toEditUserRole = (index, row) => {
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
      toEditUserRole,
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
