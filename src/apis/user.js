import httpUtils from '../utils/http.utils'

const urls = {
  login: '/api/users/login',
  getRouterAndPermissions: '/api/users/getRouterAndPermissions',
  findUserByCond: '/api/users/findUserByCond',
  addUser: '/api/users/addUser',
  findUserById: '/api/users/findUserById',
  updateUser: '/api/users/updateUser'
}

export default {
  login: (userName, userPwd) => {
    // console.log({userName, userPwd});
    return httpUtils.post({
      url: urls.login,
      data: { userName, userPwd }
    })
  },
  getRouterAndPermissions: (token) => {
    return httpUtils.post({
      url: urls.getRouterAndPermissions,
      data: token
    })
  },
  findUserByCond: (cond) => {
    return httpUtils.post({
      url: urls.findUserByCond,
      data: cond
    })
  },
  addUser: (userForm) => {
    return httpUtils.post({
      url: urls.addUser,
      data: userForm
    })
  },
  findUserById: (id) => {
    return httpUtils.post({
      url: urls.findUserById,
      data: { id: id }
    })
  },
  updateUser: (userForm) => {
    return httpUtils.post({
      url: urls.updateUser,
      data: userForm
    })
  }

}
