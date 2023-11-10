import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
//導入路由器
import router from './router/router.js' 

//ElementUI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//Echart
import  * as echarts from "echarts"

//FontAwesome 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//Pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//axios
import axios from 'axios'
// import VueAxios from 'vue-axios'

//創建vue實例
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

//註冊插件
app.use(router)
app.use(pinia)

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.echarts = echarts

// app.use(VueAxios, axios)

app.component('font-awesome-icon', FontAwesomeIcon)
//掛載容器
app.mount('#app')


