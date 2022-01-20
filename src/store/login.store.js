import {getField, updateField} from 'vuex-map-fields'

import api from '../apis'
import db from '../utils/localStorage.db.utils'

export default {
  namespaced:true,
  state:{
    userName:'',
    userPwd:'',
    loginIng:false,
    isLogin:false,
    message:''
  },
  mutations:{
    updateField,
    startLogin(state) {
      state.loginIng = true
    },
    endLogin(state) {
      state.loginIng = false
    },
    loginIn(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    },
    showMessage(state, message) {
      state.message = message
    }

  },
  getters:{
    getField
  },
  actions:{
    login({commit, state, dispatch}, $router) {
      commit('startLogin')

      console.log('userStore login...')
      api.user.login(state.userName, state.userPwd).then(({data}) => {
        const {type, token} = data
        if (type) {
          console.log('login success')
          commit('loginIn')
          commit('showMessage', '登录成功')
          console.log(token)

          db.set('token', token)

          setTimeout(() => {
            $router.push('/home')
          }, 1000)
        } else {
          commit('showMessage', '登录失败，用户名或密码错误')
        }
      }).finally(() => {
        commit('endLogin')
      })

    }

  }

}
