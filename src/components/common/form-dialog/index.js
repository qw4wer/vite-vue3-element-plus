import {computed, getCurrentInstance, nextTick, provide, ref} from "vue"
import {useStore} from "vuex"
import to from "await-to-js";

export const fromDialog = (props) => {
  const store = useStore()

  let form
  provide("register", function (fn) {
    form = fn.call();
  });

  const isChange = computed(() => store.state.form.isChange)

  const {title, submitFn, afterSubmitFn, width} = props
  const {proxy} = getCurrentInstance()

  const dialogVisible = ref(false)
  const errMsgDialogVisible = ref(false)
  const operatingState = ref('')
  const operatingErrMsg = ref('')

  const errMsgVisible = computed(errMsgVisible => {
    if (operatingErrMsg.value != '') {
      return true
    }
    return false
  })

  const handleClose = async(done) => {
    const {validate, clear} = form
    console.log(isChange.value)
    if (isChange.value) {
      const [err, data] = await to(proxy.$confirm("确认关闭?"))
      if (data) {
        done()
        dialogVisible.value = false

        clear()
      }
    } else {
      done()
      dialogVisible.value = false
      clear()
    }
  }

  const openDialog = () => {
    dialogVisible.value = true
    operatingErrMsg.value = ''
    operatingState.value = ''
  }

  const determine = async() => {
    const {validate, clear} = form
    if (form) {
      const isValidate = await validate()
      if (isValidate) {
        const data = await submitFn()
        const {type, errMsg} = data
        if (type) {
          await nextTick()
          operatingState.value = '操作成功'
          proxy.$message({
            message:'操作成功',
            type:'success',
          })
          dialogVisible.value = false
          await afterSubmitFn()
          await clear()
        } else {
          operatingState.value = '操作失败'
          operatingErrMsg.value = errMsg
        }
      }
    }
  }

  const openErrMsgDialog = () => {
    errMsgDialogVisible.value = true
  }


  return {
    title,
    width,
    dialogVisible,
    errMsgDialogVisible,
    operatingState,
    operatingErrMsg,
    errMsgVisible,
    handleClose,
    openDialog,
    determine,
    openErrMsgDialog,
    isChange
  }
}
