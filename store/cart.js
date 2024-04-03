export default {
	//开启命名空间
	namespaced: true,

	//模块的state数据
	state: () => ({
		//购物车的数组,用来存储购物车中每个商品的信息对象
		//每个商品的信息对象.都包含以下6个属性
		// {goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	}),

	//模块的mutations 方法
	mutations: {
		addToCart(state, goods) {
			// 遍历state.cart 查看是否有对应商品id
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			// console.log(findResult)
			if (!findResult) {
				//没有则添加
				state.cart.push(goods)
			} else {
				//有则数量+1
				findResult.goods_count++
			}
			// console.log(state.cart)
			//持久化存储
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			//持久化数据 
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		//更新购物车的勾选状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// console.log('findResult', findResult)
			if (findResult) {
				//更新勾选状态
				findResult.goods_state = goods.goods_state
				//持久化存储
				this.commit('m_cart/saveToStorage')
			}

		},
		//更新购物车商品数量
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// console.log('findResult', findResult)
			if (findResult) {
				//更新商品数量
				findResult.goods_count = goods.goods_count
				//持久化存储
				this.commit('m_cart/saveToStorage')
			}
		},
		//根据物品id删除对应商品
		removeGoodsById(state, goods_id) {
			//过滤
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			// console.log('state.cart', state.cart)
			//持久化存储
			this.commit('m_cart/saveToStorage')
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
			// 循环更新购物车中每件商品的勾选状态
			state.cart.forEach(x => x.goods_state = newState)
			//持久化存储
			this.commit('m_cart/saveToStorage')
		}
	},

	// 模块的getters方法
	getters: {
		// 统计购物车的总数量
		total(state) {
			// let c = 0
			// state.cart.forEach(goods => c += goods.goods_count)
			// return c
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		// 勾选商品的总数量
		checkedCount(state) {
			// 先使用filter方法,从购物车中过滤已勾选的商品
			// 再使用reduce方法,将已勾选的商品总数量累加
			//reduce()的返回值就是已勾选的商品的总数量
			return state.cart.filter(x => x.goods_state)
				.reduce((total, item) => total += item.goods_count, 0)
		},
		//已勾选商品的总价格
		checkedGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state)
				.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
				.toFixed(2)
		}
	},

}