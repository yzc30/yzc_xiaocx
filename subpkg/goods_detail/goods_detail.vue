<template>
	<view class="goods_detail" v-if="goods_info.goods_name">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box">
			<view class="price">¥{{goods_info.goods_price}}</view>
			<view class="goods-info-body">
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递,免运费</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: [],
				options: [{
					icon: 'shop',
					text: '店铺',
					info: 0,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsInfo(goods_id)

		},
		methods: {
			async getGoodsInfo(goods_id) {
				const res = await uni.request({
					url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
					method: "GET",
					data: {
						goods_id: goods_id
					}
				})
				console.log(res)
				if (res[1].data.meta.status != 200) {
					uni.$showMsg()
					return
				}
				res[1].data.message.goods_introduce = res[1].data.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"')
				this.goods_info = res[1].data.message
				console.log(this.goods_info)
			},
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e) {
				console.log(e)
				if (e.content.text === "购物车") {
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}
			},
			buttonClick(e) {
				console.log(e)
			}
		},

	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #C00000;
			font-size: 18px;
			margin: 10px 0;

		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #EFEFEF;
				color: gray;

			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	.goods-carts {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.goods_detail {
		padding-bottom: 40px;
	}
</style>