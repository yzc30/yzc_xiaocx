// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

uni.$showMsg = function(title = '数据请求失败!', duration = 1500) {
	uni.showToast({
		title: title,
		duration: duration,
		icon: 'none',
	})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif