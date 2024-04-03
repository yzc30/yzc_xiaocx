<template>
	<view>
		<!-- <Yzc-my-search  :bgcolor="'#00aa00'"></Yzc-my-search> -->
		<Yzc-my-search @click="gotoSearch"></Yzc-my-search>
		<view class="scroll-view-container">
			<!-- 左侧 scroll-view-->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: this.wh + 'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-view-item',i===active?'active':'']" @click="switchActive(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧 scroll-view-->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: this.wh + 'px'}"
				:scrollTop="scrollTop" :scroll-top="scrollTop">
				<!-- 右边二级 -->
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<!-- 右边三级 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text class="cate-lv3">{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
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
				//当前可用窗口高度
				wh: 0,
				cateList: [],
				active: 0,
				cateLevel2: [],
				scrollTop: 0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			// console.log(sysInfo)
			// console.log(sysInfo.windowHeight)
			this.wh = sysInfo.windowHeight
			this.getCateList()

		},
		methods: {
			async getCateList() {
				const res = await uni.request({
					url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
					method: "GET"
				})
				// console.log(res)
				if (res[1].statusCode != 200) {
					uni.$showMsg()
				}
				this.cateList = res[1].data.message
				// console.log(this.cateList)
				// uni.$showMsg('数据请求成功')
				// 初始化二级分类
				this.cateLevel2 = this.cateList[0].children
			},
			async switchActive(i) {
				this.active = i
				// console.log(this.active)
				this.cateLevel2 = this.cateList[i].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: "/subpkg/goods_list/goods_list?cid=" + item3.cat_id,
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
	.scroll-view-container {
		display: flex;
		height: 100vh;
		width: 100vw;

		.left-scroll-view {
			width: 200rpx;

			.left-scroll-view-item {
				background-color: #F7F7F7;
				line-height: 60px;
				text-align: center;
				font-size: 13px;

				&.active {
					background-color: #FFFFFF;
					position: relative;

					&::before {
						content: "";
						display: block;
						width: 3px;
						height: 30px;
						background-color: #ff0000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}

			}
		}

		.right-scroll-view {
			.cate-lv2 {
				.cate-lv2-title {
					font-size: 12px;
					font-weight: bold;
					text-align: center;
					padding: 15px 0;
				}
			}

			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;

				.cate-lv3-item {
					width: 33.33%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 10px;

					image {
						width: 60px;
						height: 60px;
					}

					text {
						font-size: 12px;

					}
				}
			}
		}

	}
</style>