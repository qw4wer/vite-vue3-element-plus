import httpUtils from '../utils/http.utils'

const urls = {
  findPermissionByCond: '/api/permissions/findPermissionByCond',
  addPermission: '/api/permissions/addPermission',
  findPermissionById: '/api/permissions/findPermissionById',
  updatePermission: '/api/permissions/updatePermission'
}

export default {
  findPermissionByCond: (cond) => {
    return httpUtils.post({
      url: urls.findPermissionByCond,
      data: cond
    })
  },
  addPermission: (userForm) => {
    return httpUtils.post({
      url: urls.addPermission,
      data: userForm
    })
  },
  findPermissionById: (id) => {
    return httpUtils.post({
      url: urls.findPermissionById,
      data: { id: id }
    })
  },
  updatePermission: (userForm) => {
    return httpUtils.post({
      url: urls.updatePermission,
      data: userForm
    })
  }

}
