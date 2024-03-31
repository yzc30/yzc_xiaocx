<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">¥{{goods.goods_price|tofixed}}</view>
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
				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>