import {getField, updateField} from 'vuex-map-fields'
import common from '../../utils/common.utils'
import router from "../../router";

export default {
  namespaced:true,
  state:{
    activePath:'/home',
    items:[
      {
        title:'主页',
        path:'/home',
        icon:'home.ico',
        hasClose:false
      }
    ]

  },
  mutations:{
    updateField,
    removeItem(state, targetName) {
      const tabs = state.items
      let activePath = state.activePath
      if (activePath === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.path === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activePath = nextTab.name
            }
          }
        })
      }

      state.activePath = activePath
      state.items = tabs.filter(tab => tab.path !== targetName)
    },
    addItem(state, item) {
      state.items.push(item)
      state.activePath = item.path
    },
    selectItem(state, path) {
      state.activePath = path
    }

  },
  getters:{
    getField
  },
  actions:{
    removeTab({commit, state}, payload) {
      commit('removeItem', payload)
    },
    addTab({commit, state}, payload) {
      commit('addItem', payload)
    },
    selectTab({commit, state}, payload) {
      router.push(payload.props.name)
    },
    addOrSelectTab({commit, state}, payload) {
      const arr = common.flatObjByPath(state.items, 'path')

      const {path, title} = payload
      if (arr.includes(`/${path}`)) {
        commit('selectItem', `/${path}`)
      } else {
        commit('addItem', {
          title:title,
          path:`/${path}`,
          name:path
        })
      }
    }
  }
}
