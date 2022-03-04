import httpUtils from '../utils/http.utils'

const urls = {
  addRolePermission:'/api/rolePermission/addRolePermission',
  findRolePermissionByUserId:'/api/rolePermission/findRolePermissionByRoleId',
}

export default {
  addRolePermission:(rolePermissionForm) => {
    return httpUtils.post({
      url:urls.addRolePermission,
      data:rolePermissionForm
    })
  },
  findRolePermissionByRoleId:(id) => {
    return httpUtils.post({
      url:urls.findRolePermissionByUserId,
      data:{id:id}
    })
  },

}
