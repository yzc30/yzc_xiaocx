<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<Yzc-my-goods :goods="goods"></Yzc-my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// console.log(this.queryObj)
			this.getGoodsList()
		},
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10,
				},
				//商品列表数据
				goodsList: [],
				//总数量,用来实现分页
				total: 0,
			};
		},
		methods: {
			async getGoodsList(cb) {
				const res = await uni.request({
					url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
					method: "GET",
					data: this.queryObj
				})
				// console.log(res)
				if (res[1].statusCode != 200) {
					uni.$showMsg()
				}
				cb && cb()
				this.goodsList = [...this.goodsList, ...res[1].data.message.goods]
				this.total = res[1].data.message.total
				this.queryObj.pagenum = parseInt(res[1].data.message.pagenum)
				console.log(this.goodsList)

			},
			// 触底事件
			onReachBottom() {
				// console.log(this.total,typeof(this.total))
				// console.log(this.queryObj.pagesize,typeof(this.queryObj.pagesize))
				// console.log(this.queryObj.pagenum,typeof(this.queryObj.pagenum))
				if (this.queryObj.pagesize * this.queryObj.pagenum >= this.total) {
					uni.$showMsg("数据加载完毕!")
				}
				this.queryObj.pagenum++
				this.getGoodsList()
			},
			onPullDownRefresh() {
				// 重置关键数据
				this.queryObj.pagenum = 1
				this.total = 1
				this.goodsList = []

				//重新发起数据请求
				this.getGoodsList(() => uni.stopPullDownRefresh())
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
	}
</script>

<style lang="scss">

</style>