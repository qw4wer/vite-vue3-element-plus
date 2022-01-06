import {createRouter, createWebHistory} from 'vue-router'
import db from '../utils/localStorage.db.utils'
import store from '../store'
import api from '../apis'
import utils from '../utils/common.utils'
import _ from 'lodash'

const routes = [
  // {
  //   path:'/:pathMatch(.*)*',
  //   name:'NotFound',
  //   component:() => import("@/views/404.vue")
  // },
  {
    path:'/login',
    name:'login',
    component:() => import("@/views/login.vue")
  },
  {
    path:'/',
    name:'index',
    component:() => import('@/views/index.vue'),
  }
]

const indexRouter = [
  {
    path:'',
    name:'index',
    component:() => import('@/views/index.vue'),
    children:[
      {
        path:'home',
        name:'home',
        component:() => import('/src/views/home.vue'),
        meta:{path:'home', title:'home'},
      }
    ]
  },

]

const router = createRouter({
  history:createWebHistory(),
  routes,
})
const whitelist = ['/test']

router.beforeEach((to, from, next) => {
  console.log({to, from})
  // store.dispatch('navigation/init', to.fullPath)
  const token = db.get('token')
  if (whitelist.includes(to.path)) {
    next()
    return
  }
  if (token) {
    // 未拉取菜单
    if (store.state.nav.navMenus.length === 0) {
      api.user.getRouterAndPermissions(token).then(({data}) => {
        const {routers} = data
        store.dispatch('nav/initNavMenu', routers)
        const childrenRouters = utils.filterAndAddRouter(routers)
        _.set(indexRouter, '0.children', _.concat(_.get(indexRouter, '0.children'), childrenRouters))
        indexRouter.forEach(value => {
          router.addRoute(value)
        })
        next({...to})
      })
    } else {
      // 选中tab和导航
      store.dispatch('nav/updateActivePath', to.meta.path)
      store.dispatch('tabs/addOrSelectTab', {...to.meta})
      next()
    }

  } else {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
