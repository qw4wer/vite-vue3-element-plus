<template>
    <div>
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item label="权限名称">
                <el-input v-model="queryForm.permissionName" placeholder="权限名称"></el-input>
            </el-form-item>
            <el-form-item label="权限代码">
                <el-input v-model="queryForm.permissionCode" placeholder="权限代码"></el-input>
            </el-form-item>
            <el-form-item label="用户状态">
                <el-select v-model="queryForm.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="0"></el-option>
                    <el-option label="禁用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="findPermissionByCond">查询</el-button>
                <el-button type="primary" @click="toAddPermission">新建</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="isLoading" :data="tableData" highlight-current-row :fit=true style="width: 100%">
            <el-table-column prop="id" label="id" width="180" v-if="false"></el-table-column>
            <el-table-column prop="permissionName" label="权限名称" width="180"></el-table-column>
            <el-table-column prop="permissionCode" label="权限代码" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="toUpdatePermission(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <FormDialog ref="permissionAddDialog" :submit-fn="addPermission" :after-submit-fn="afterSubmit">
            <permissionForm slot="body" :permissionFormData="permissionFormData"></permissionForm>
        </FormDialog>
        <FormDialog ref="permissionEditDialog" :submit-fn="updatePermission" :after-submit-fn="afterSubmit">
            <permissionForm slot="body" :permissionFormData="permissionFormData"></permissionForm>
        </FormDialog>
    </div>
</template>

<script>
  import permissionForm from '@/client/components/form/permissionForm'
  import FormDialog from '@/client/components/common/FormDialog'

  export default {
    name: 'permissionIndex',
    components: { permissionForm, FormDialog },
    data () {
      return {
        queryForm: {
          permissionName: '',
          permissionCode: '',
          status: ''
        },
        tableData: [],
        isLoading: false,
        permissionFormData: {
          permissionName: null,
          permissionCode: null,
          id: null
        }
      }
    },
    computed: {},
    methods: {
      afterSubmit () {
        this.findPermissionByCond()
      },
      handleClose () {
        return true
      },
      findPermissionByCond () {
        this.isLoading = true
        this.$apis.permission.findPermissionByCond(this.queryForm).then(({ data }) => {
          if (data.type) {
            this.tableData = data.permissions
          } else {
            return Promise.reject()
          }
          this.isLoading = false
        }).catch(err => {
          this.isLoading = false
          this.$message.error(err || '加载异常，请重试')
        })
      },
      toUpdatePermission (index, row) {
        const that = this
        this.$apis.permission.findPermissionById(row.id).then(({ data }) => {
          if (data.type) {
            this.permissionFormData = data.permission
            this.$refs.permissionEditDialog.openDialog()
          } else {
            return Promise.reject('查无此人!')
          }
        }).catch(err => {
          that.$message.error(err || '加载异常，请重试')
        })
      },
      updatePermission () {
        return this.$apis.permission.updatePermission(this.permissionFormData).then((data) => {
          this.permissionFormData = {}
          return Promise.resolve(data)
        }).catch(err => {
          return Promise.reject(err)
        })
      },
      toAddPermission () {
        this.permissionFormData = {}
        this.$refs.permissionAddDialog.openDialog()
      }
      ,
      addPermission () {
        return this.$apis.permission.addPermission(this.permissionFormData).then((data) => {
          this.permissionFormData = {}
          return Promise.resolve(data)
        }).catch(err => {
          return Promise.reject(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
