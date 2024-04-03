// 导入模块
import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'

// 将Vuex安装为Vue的插件
Vue.use(Vuex)

//创建store 实例对象
const store = new Vuex.Store({
	modules: {
		//挂载store模块
		// 购物车模块中cart数组的访问路径是m_cart/cart
		m_cart: moduleCart,
	}
})

//向外共享store实例对象
export default store