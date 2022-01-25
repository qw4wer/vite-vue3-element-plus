<template>
  <div>
    <el-dialog
        :title="title"
        :model-value="dialogVisible"
        :width="width"
        :before-close="handleClose">
      <slot name="body" ref="bb">
      </slot>

      <span slot="footer" class="dialog-footer">
            <el-button v-if="errMsgVisible" style="float:left; padding: 12px 5px;"
                       @click="openErrMsgDialog">查看异常</el-button>
            <span style="color: red;font-size: 12px;">{{ operatingState }}</span>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="determine">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog :model-value="errMsgDialogVisible">
      <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="errMsg">
      </el-input>
    </el-dialog>
  </div>
</template>
<script>
import {provide} from "vue";

export default {
  name:'form-dialog',
  mounted() {
  },
  setup() {
    let form
    provide("register", function (fn) {
      form = fn.call();
    });

    function getForm() {
      return form;
    }

    return {
      getForm
    }
  },
  computed:{
    errMsgVisible:function () {
      if (this.errMsg != '') {
        return true
      }
      return false
    }
  },
  props:{
    title:{
      default:'弹窗'
    },
    submitFn:{
      default:Promise.resolve(),
      type:Function
    },
    afterSubmitFn:{
      default:() => {
      },
      type:Function
    },
    width:{
      default:'50%'
    }

  },
  data:function () {
    return {
      dialogVisible:false,
      errMsg:'',
      operatingState:'',
      errMsgDialogVisible:false
    }
  }
  ,
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done()
          })
          .catch(() => {
          })
    }
    ,
    openDialog() {
      this.dialogVisible = true
      this.errMsg = ''
    }
    ,
    determine() {
      if (this.getForm) {
        const {validate, clear} = this.getForm()
        validate().then(d => {
          if (d) {
            this.submitFn().then((data) => {
              if (data.type) {
                this.$nextTick(() => {
                  this.operatingState = '操作成功'
                  this.$message({
                    message:'新建成功',
                    type:'success',
                  })
                  this.dialogVisible = false
                  this.operatingState = ''
                  this.afterSubmitFn()
                  clear()
                })
              } else {
                this.operatingState = '操作失败'
                this.errMsg = data.errMsg
              }
            })
          } else {
            this.operatingState = '有必填项没填写'
          }
        })
      }
    },
    openErrMsgDialog() {
      this.errMsgDialogVisible = true
    }

  }
}
</script>

<style scoped>

</style>
