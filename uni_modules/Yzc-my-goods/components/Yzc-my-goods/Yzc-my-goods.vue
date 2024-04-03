<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioChangeHandler"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price" v-if="goods.goods_count">
					¥{{goods.goods_price*goods.goods_count|tofixed}}</view>
				<view class="goods-price" v-if="!goods.goods_count">¥{{goods.goods_price|tofixed}}</view>
				<uni-number-box :min="1" :value='goods.goods_count' v-if="showRadio"
					@change="numberChangeHandler"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//商品的信息对象
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic: 'https://img2.baidu.com/it/u=1080228242,3641064450&fm=253&fmt=auto&app=120&f=JPEG?w=380&h=285'
			};
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			//radio 组件的点击事件处理函数
			radioChangeHandler() {
				//通过 this.$emit() 触发外界通过 @绑定的 radio-change 事件
				//同时把商品的id和勾选状态作为参数传递给 radio-change 事件处理函数
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					//商品的最新勾选状态
					goods_state: !this.goods.goods_state
				})

			},
			numberChangeHandler(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					// 商品最新数量
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0ff;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>