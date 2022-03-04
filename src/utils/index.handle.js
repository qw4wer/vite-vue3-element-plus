import {ref} from 'vue'
import apis from '../apis'
import to from 'await-to-js'
import {ElMessage, ElMessageBox} from 'element-plus'

export default function bind({module, queryForm, formData, dialog}, proxy) {

  const tableData = ref([])
  const isLoading = ref(false)
  const action = ref('add')
  const tableHeight = ref(0)
  const m = module.replace(module[0], module[0].toUpperCase())
  tableHeight.value = parent.window.outerHeight - 250
  const fn = {
    add:apis[module][`add${m}`],
    update:apis[module][`update${m}`],
    findByCond:apis[module][`find${m}ByCond`],
    findById:apis[module][`find${m}ById`],
    del:apis[module][`remove${m}`],
  }


  const findByCond = async() => {
    isLoading.value = true
    const [err, {data}] = await to(fn.findByCond(queryForm.value))

    if (err) {
      ElMessage.error(err.message || '加载异常，请重试')
      proxy.$message("xxxxx")
    } else {
      tableData.value = data[`${module}s`]
    }
    isLoading.value = false
  }

  const toAdd = async() => {
    formData.value = {}
    action.value = 'add'
    proxy.$refs[dialog].openDialog()
  }

  const toUpdate = async(index, row) => {
    const [err, {data}] = await to(fn.findById(row.id))
    if (err) {
      ElMessage.error(err.message || '加载异常，请重试')
    } else {
      if (data.type) {
        formData.value = data[module]
        action.value = 'update'
        proxy.$refs[dialog].openDialog()
      } else {

      }
    }
  }

  const update = async() => {
    const [err, {data}] = await to(fn.update(formData.value))
    if (err) {
      return err
    } else {
      return data
    }
  }

  const add = async() => {
    const [err, {data}] = await to(fn.add(formData.value))
    if (err) {
      return err
    } else {
      return data
    }

  }
  const submitFn = async() => {
    let data
    switch (action.value) {
      case 'add':
        data = await add()
        break
      case 'update':
        data = await update()
        break
    }
    return data
  }

  const clear = () => {
    formData.value = {}
  }

  const toDel = async(index, row) => {
    const [err, type] = await to(ElMessageBox.confirm("是否删除"))
    if (!err) {
      const [err, {data}] = await to(fn.del(row.id))
      if (err) {
        ElMessage.error({
          message:'删除失败',
        })
      } else if (data.type) {
        ElMessage.success({
          message:'删除成功',
        })
        await findByCond()
      }
    }
  }

  return {
    tableData,
    isLoading,
    tableHeight,
    findByCond,
    toAdd,
    add,
    toUpdate,
    update,
    submitFn,
    clear,
    toDel,
  }

}
