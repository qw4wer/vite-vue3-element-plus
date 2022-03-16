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
          v-model="operatingErrMsg">
      </el-input>
    </el-dialog>
  </div>
</template>
<script>
import {fromDialog} from './index'

export default {
  name:'form-dialog',
  mounted() {
  },
  setup(props) {
    return {...fromDialog(props)}
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
}
</script>

<style scoped>

</style>
