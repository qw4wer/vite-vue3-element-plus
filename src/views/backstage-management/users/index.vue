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
        <el-button type="primary" @click="findUserByCond">查询</el-button>
        <el-button type="primary" @click="toAddUser">新建</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="isLoading" :data="tableData" highlight-current-row style="width: 100%"
              :max-height="tableHeight">
      <el-table-column v-if=false prop="id" label="id" width="180"></el-table-column>
      <el-table-column prop="userName" label="账号" width="180"></el-table-column>
      <el-table-column prop="realName" label="中文名" width="180"></el-table-column>
      <el-table-column prop="address" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="toUpdateUser(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <form-dialog ref="userAddDialog" :submit-fn="addUser" :after-submit-fn="afterSubmit">
      <!--            <userForm slot="body" :userFormData="userFormData"></userForm>-->
    </form-dialog>

    <!--        <FormDialog ref="userEditDialog" :submit-fn="updateUser" :after-submit-fn="afterSubmit">-->
    <!--            <userForm slot="body" :userFormData="userFormData"></userForm>-->
    <!--        </FormDialog>-->
  </div>
</template>

<script>

export default {
  name:'index',
  mounted() {
  },
  setup() {

  },
  data() {
    return {
      tableHeight:window.innerHeight - 250,
      currentRow:{},
      queryForm:{
        userName:'',
        realName:'',
        status:''
      },
      tableData:[],
      isLoading:false,
      userFormData:{
        userName:null,
        realName:null,
        id:null
      }
    }
  },
  computed:{},
  methods:{
    afterSubmit() {
      this.findUserByCond()
    },
    findUserByCond() {
      this.isLoading = true
      this.$apis.user.findUserByCond(this.queryForm).then(({data}) => {
        if (data.type) {
          this.tableData = data.users
        } else {
          return Promise.reject()
        }
        this.isLoading = false
      }).catch(err => {
            this.isLoading = false
            this.$message.error(err.message || '加载异常，请重试')
          }
      )
    },
    toUpdateUser(index, row) {

      this.$apis.user.findUserById(row.id).then(({data}) => {
        if (data.type) {
          this.userFormData = data.user
          this.$refs.userEditDialog.openDialog()
        } else {
          return Promise.reject('查无此人!')
        }
      }).catch(err => {
        this.$message.error(err.message || '加载异常，请重试')
      })
    }
    ,
    updateUser() {
      return this.$apis.user.updateUser(this.userFormData).then((data) => {
        this.userFormData = {}
        return Promise.resolve(data)
      }).catch(err => {
        return Promise.reject(err)
      })
    }
    ,
    toAddUser() {
      this.userFormData = {}
      this.$refs.userAddDialog.openDialog()
    }
    ,
    addUser() {
      return this.$apis.user.addUser(this.userFormData).then((data) => {
        this.userFormData = {}
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
