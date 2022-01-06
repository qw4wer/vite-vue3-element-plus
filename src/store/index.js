import {createStore} from 'vuex'
import login from './login.store'
import uiStore from './ui'

const store = createStore({
  state() {
    return {
      count:0
    }
  },
  modules:{
    // userStore,
    login,
    ...uiStore
  }
})

export default store
