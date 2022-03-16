import {getField, updateField} from 'vuex-map-fields'

export default {
  namespaced:true,
  state:{
    isChange:false
  },
  mutations:{
    updateField,
    setFormChange(state, isChange) {
      state.isChange = isChange
    }
  },
  getters:{
    getField
  },
  actions:{
    setFormChange({commit}, payload) {
      commit('setFormChange', payload)
    },
    resetFormChange({commit}) {
      commit('setFormChange', false)
    }
  }
}
