import httpUtils from '../utils/http.utils'

const urls = {
  findRouterByCond:'/api/routers/findRouterByCond',
  addRouter:'/api/routes/addRouter',
  findRouterById:'/api/routes/findRouterById',
  updateRouter:'/api/routers/updateRouter'
}

export default {
  findRouterByCond:(cond) => {
    return httpUtils.post({
      url:urls.findRouterByCond,
      data:cond
    })
  },
  addRouter:(userForm) => {
    return httpUtils.post({
      url:urls.addRouter,
      data:userForm
    })
  },
  findRouterById:(id) => {
    return httpUtils.post({
      url:urls.findRouterById,
      data:{id:id}
    })
  },
  updateRouter:(userForm) => {
    return httpUtils.post({
      url:urls.updateRouter,
      data:userForm
    })
  }

}
