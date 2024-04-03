<template>
	<view>
		<!-- 搜索区域 -->
		<view class="search-box">
			<Yzc-my-search @click="gotoSearch"></Yzc-my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image class="nav-img" :src="item.image_src"></image>
			</view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左 -->
					<view class="left-img-box" @click="leftImgBoxClick">
						<image :src="item.product_list[0].image_src"
							style="{width: item.product_list[0].image_width + 'rpx';}" mode="heightFix"></image>
					</view>
					<!-- 右 -->
					<view class="rigth-img-box">
						<navigator class="rigth-img-item" v-for="(item2,i2) in item.product_list" :key="i2"
							v-if="i2!==0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	//导入mixins模块
	import badgeMix from "@/mixins/tabbar-badge.js"
	export default {
		// 将badgeMix混入当前页面进行使用
		mixins: [badgeMix],
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: [],
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const res = await uni.request({
					// url: "https://applet-base-api-t.itheima.net/slides",
					url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
					method: "GET"
				})
				// console.log(res)
				if (res[1].statusCode != 200) {
					uni.$showMsg()
				}
				this.swiperList = res[1].data.message
				// console.log(this.swiperList)
				// uni.$showMsg('数据请求成功')
			},
			async getNavList() {
				const res = await uni.request({
					url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
					method: "GET"
				})
				// console.log(res)
				if (res[1].statusCode != 200) {
					uni.$showMsg()
				}
				this.navList = res[1].data.message
				// console.log(this.navList)
			},
			navClickHandler(item) {
				// console.log(item)
				if (item.name == "分类") {
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			},
			async getFloorList() {
				const res = await uni.request({
					url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
					method: "GET"
				})
				console.log(res)
				if (res[1].statusCode != 200) {
					uni.$showMsg()
				}

				res[1].data.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split("?")[1]
					})
				})
				this.floorList = res[1].data.message
				// console.log(this.floorList)
			},
			leftImgBoxClick() {
				console.log(this.floorList[0].product_list[0].url)
				uni.navigateTo({
					url: this.floorList[0].product_list[0].url,
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			},
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	swiper {
		height: 300rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;


		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.rigth-img-box {
		display: flex;
		flex-wrap: wrap;
		padding: 5rpx;
	}

	.rigth-img-item {
		display: flex;
		width: 200rpx;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 1rpx;
	}

	.floor-img-box {
		display: flex;
		padding: 20rpx;
	}
</style>