import httpUtils from '../utils/http.utils'

const urls = {
  findRoleByCond:'/api/roles/findRoleByCond',
  addRole:'/api/roles/addRole',
  findRoleById:'/api/roles/findRoleById',
  updateRole:'/api/roles/updateRole'
}

export default {
  findRoleByCond:(cond) => {
    return httpUtils.post({
      url:urls.findRoleByCond,
      data:cond
    })
  },
  addRole:(userForm) => {
    return httpUtils.post({
      url:urls.addRole,
      data:userForm
    })
  },
  findRoleById:(id) => {
    return httpUtils.post({
      url:urls.findRoleById,
      data:{id:id}
    })
  },
  updateRole:(userForm) => {
    return httpUtils.post({
      url:urls.updateRole,
      data:userForm
    })
  }

}
