import {getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs, watch} from 'vue'
import to from 'await-to-js'

export default function userRole(props) {
  const {proxy} = getCurrentInstance()
  const roleData = ref([])
  const tableHeight = ref(parent.window.outerHeight)
  const tableRef = ref({})
  let selectRow = reactive([])

  const {id} = toRefs(props)

  const loadRoleData = async(userId) => {
    const [err, {data}] = await to(proxy.$apis.userRole.findUserRoleByUserId(userId))
    if (!err) {
      const {userRoleVO:{has, roles}} = data
      roleData.value = roles
      await nextTick()
      const {toggleRowSelection} = tableRef.value
      for (const i in roles)
        if (has.indexOf(roles[i].id) != -1) {
          toggleRowSelection(roles[i], undefined)
        }
    }
  }
  const saveUserRole = async() => {
    const roleIds = []
    selectRow.forEach(value => {
      roleIds.push(value.id)
    })
    const form = {
      roleIds:roleIds,
      userId:id.value
    };
    const [err, {data}] = await to(proxy.$apis.userRole.addUserRole(form))
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
    await loadRoleData(id.value)
  })
  watch(props, async() => {
    selectRow = reactive([])
    await loadRoleData(id.value)
  })

  return {
    roleData,
    loadRoleData,
    tableHeight,
    tableRef,
    saveUserRole,
    selectionChange,
  }
}
