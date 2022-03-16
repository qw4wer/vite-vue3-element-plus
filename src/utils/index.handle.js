import {computed, nextTick, ref, watch} from 'vue'
import apis from '../apis'
import to from 'await-to-js'
import {useStore} from 'vuex'

export default function bind({module, queryForm, formData, dialog}, proxy) {

  const tableData = ref([])
  const isLoading = ref(false)
  const action = ref('add')
  const tableHeight = ref(0)
  const m = module.replace(module[0], module[0].toUpperCase())
  const store = useStore()
  const _formData = JSON.parse(JSON.stringify(formData.value))

  const newFormData = computed(() => {
    return JSON.stringify(formData.value)
  })

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
      proxy.$message.error(err.message || '加载异常，请重试')
    } else {
      tableData.value = data[`${module}s`]
    }
    isLoading.value = false
  }

  const toAdd = async() => {
    action.value = 'add'
    proxy.$refs[dialog].openDialog()
  }

  const toUpdate = async(index, row) => {
    const [err, {data}] = await to(fn.findById(row.id))
    if (err) {
      proxy.$message.error(err.message || '加载异常，请重试')
    } else {
      if (data.type) {
        formData.value = data[module]
        action.value = 'update'
        proxy.$refs[dialog].openDialog()
        await nextTick()
        await store.dispatch('form/resetFormChange')
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

  const clear = async() => {
    formData.value = {}
    await nextTick()
    await store.dispatch('form/resetFormChange')
  }

  const toDel = async(index, row) => {
    const [err, type] = await to(proxy.$confirm("是否删除"))
    if (!err) {
      const [err, {data}] = await to(fn.del(row.id))
      if (err) {
        proxy.$message.error({
          message:'删除失败',
        })
      } else if (data.type) {
        proxy.$message.success({
          message:'删除成功',
        })
        await findByCond()
      }
    }
  }


  watch(newFormData, async(newData, oldData) => {
    const f1 = JSON.parse(newData)
    const f2 = JSON.parse(oldData)
    if (f1 != f2) {
      await store.dispatch('form/setFormChange', true)
    }
  }, {
    deep:true
  })

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
