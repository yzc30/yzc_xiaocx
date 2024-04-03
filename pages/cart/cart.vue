<template>
	<view class="cart-container">
		<view class="cart-list">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action ref="swipeAction">
			<block v-for="(goods,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods,i)"
					:ref="'swipeAction'+i">
					<Yzc-my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHandler"
						@num-change="numberChangeHandler"></Yzc-my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<Yzc-my-settle></Yzc-my-settle>
	</view>
</template>

<script>
	//导入mixins模块
	import badgeMix from "@/mixins/tabbar-badge.js"
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		//将badgeMix混入当前页面进行使用
		mixins: [badgeMix],
		computed: {
			//映射
			...mapState('m_cart', ['cart']),
		},
		data() {
			return {
				options: [{
					text: "删除",
					style: {
						backgroundColor: "#C00000"
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChangeHandler(e) {
				// console.log(e)
				this.updateGoodsState(e)
			},
			numberChangeHandler(e) {
				// console.log(e)
				this.updateGoodsCount(e)
			},
			swipeActionClickHandler(goods, i) {
				// console.log(goods)
				// console.log(i)

				// 删除的时候,删除按钮设置为none
				let index = 'swipeAction' + i
				// console.log('this.$refs', this.$refs)
				// console.log('this.$refs[index]', this.$refs[index])
				this.$refs[index][0].is_show = 'none'

				//根据物品id删除对应商品
				this.removeGoodsById(goods.goods_id)

			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}

	.cart-list {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #EFEFEF;

		.cart-title-text {
			margin-left: 10px;
		}
	}
</style>