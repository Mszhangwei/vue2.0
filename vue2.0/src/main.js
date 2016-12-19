import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/style.css'
import {api} from './assets/js/common'

Vue.use(MintUI)

//开启debug模式
Vue.config.debug = true;
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
//Vue.http.options.headers={'Accept':'application/vnd.zlm.v2+json'}
Vue.http.interceptors.push((request, next) => {
     request.headers.set('Accept', 'application/vnd.zlm.v2+json')
	 next((response) => {
		console.log(response.status)
		return response
	})
})

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
router,
render: h => h(App)
}).$mount('#app')	
