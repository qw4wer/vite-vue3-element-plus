import httpUtils from '../utils/http.utils'

const urls = {
  findDirByCond:'/api/dirs/findDirByCond',
  addDir:'/api/dirs/addDir',
  findDirById:'/api/dirs/findDirById',
  updateDir:'/api/dirs/updateDir',
  removeDir:'/api/dirs/removeDir'
}

export default {
  findDirByCond:(cond) => {
    return httpUtils.post({
      url:urls.findDirByCond,
      data:cond
    })
  },
  addDir:(userForm) => {
    return httpUtils.post({
      url:urls.addDir,
      data:userForm
    })
  },
  findDirById:(id) => {
    return httpUtils.post({
      url:urls.findDirById,
      data:{id:id}
    })
  },
  updateDir:(userForm) => {
    return httpUtils.post({
      url:urls.updateDir,
      data:userForm
    })
  },
  removeDir:(id) => {
    return httpUtils.post({
      url:urls.removeDir,
      data:{id:id}
    })
  }

}
