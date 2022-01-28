import { getField, updateField } from 'vuex-map-fields'


export default {
  namespaced: true,
  state: {
    navMenus: [],
    activePath: '0'
  },
  mutations: {
    updateField,
    updateMenu (state, navMenus) {
      state.navMenus = navMenus
    },
    updateActivePath (state, activePath) {
      state.activePath = activePath
    }
  },
  getters: {
    getField
  },
  actions: {

    initNavMenu ({ commit, state }, payload) {
      const menus = []
      payload.forEach((menu, i) => {
        if (!menu.hide) {
          menus.push(menu)
        }
      })
      commit('updateMenu', menus)
    },
    selectMenu ({ commit, state, dispatch }, payload) {
      dispatch('tabs/addOrSelectTab', payload, { root: true })
    },
    updateActivePath ({ commit }, payload) {
      commit('updateActivePath', payload)
    }

  }

}
