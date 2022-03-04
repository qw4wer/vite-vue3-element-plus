import {getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs, watch} from 'vue'
import to from 'await-to-js'

export default function rolePermission(props) {
  const {proxy} = getCurrentInstance()
  const roleData = ref([])
  const tableHeight = ref(parent.window.outerHeight)
  const tableRef = ref({})
  let selectRow = reactive([])
  const {id} = toRefs(props)

  const loadPermissionData = async(userId) => {
    const [err, {data}] = await to(proxy.$apis.rolePermission.findRolePermissionByRoleId(userId))
    if (!err) {
      const {rolePermissionVO:{has, roles}} = data
      roleData.value = roles
      await nextTick()
      const {toggleRowSelection} = tableRef.value
      for (const i in roles)
        if (has.indexOf(roles[i].id) != -1) {
          toggleRowSelection(roles[i], undefined)
        }
    }
  }
  const saveRolePermission = async() => {
    const permissionIds = []
    selectRow.forEach(value => {
      permissionIds.push(value.id)
    })
    const form = {
      permissionIds:permissionIds,
      roleId:id.value
    };
    const [err, {data}] = await to(proxy.$apis.rolePermission.addRolePermission(form))
    if (!err) {
      if (data.type) {
        proxy.$message({
          type:'success',
          message:'保存成功'
        })
      }
    }
  }

  const selectionChange = (selection) => {
    selectRow = selection
  }

  onMounted(async() => {
    await loadPermissionData(id.value)
  })
  watch(props, async() => {
    selectRow = reactive([])
    await loadPermissionData(id.value)
  })

  return {
    roleData,
    tableHeight,
    tableRef,
    saveRolePermission,
    selectionChange,
  }
}
