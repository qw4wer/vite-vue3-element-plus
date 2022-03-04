import httpUtils from '../utils/http.utils'

const urls = {
  addUserRole:'/api/userRoles/addUserRole',
  findUserRoleByUserId:'/api/userRoles/findUserRoleByUserId',
}

export default {
  addUserRole:(userRoleForm) => {
    return httpUtils.post({
      url:urls.addUserRole,
      data:userRoleForm
    })
  },
  findUserRoleByUserId:(id) => {
    return httpUtils.post({
      url:urls.findUserRoleByUserId,
      data:{id:id}
    })
  },

}
