import {createApp} from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import apis from './apis'
import {ElMessage, ElMessageBox} from 'element-plus'
import router from './router'
import store from './store'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'


library.add(fas)
const app = createApp(App)
app.config.globalProperties.$apis = apis
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm
app.component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(ElMessage)
  .mount('#app')
