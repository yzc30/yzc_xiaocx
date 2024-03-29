<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar placeholder="请输入搜索内容" @input="input" :radius="100" cancelButton="none"
				v-model="searchValue"></uni-search-bar>
		</view>
		<!-- 搜索建议内容 -->
		<view class="sugg-list">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-if="kw === ''">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="16" @click="cleanHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in historyList" :key="i" inverted="true"
					@click="kwToInput(item)"></uni-tag>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync("hl") || "[]")
		},
		data() {
			return {
				timer: null,
				kw: '',
				searchResults: [],
				historyList: [],
				searchValue: "",
			};
		},
		methods: {
			input(e) {
				//清除timer对应的延时器
				clearTimeout(this.timer)
				//重新启动一个延时器,并将timerId 赋值给 this.timer
				this.timer = setTimeout(() => {
					//如果500毫秒内,没有触发新的输入事件,则为搜索关键字赋值
					this.kw = e
					// console.log(this.kw)
					this.getSearchResults()
				}, 500)
			},
			async getSearchResults() {
				if (this.kw === '') {
					this.searchResults = []
					return
				}
				const res = await uni.request({
					url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",
					method: "GET",
					data: {
						query: this.kw
					}
				})
				// console.log(res)
				if (res[1].statusCode != 200) {
					uni.$showMsg()
				}
				this.searchResults = res[1].data.message
				// console.log(this.searchResults)
				this.saveSearchHistroy()
			},
			gotoDetail(item) {
				// console.log(item.goods_id)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			saveSearchHistroy() {
				// 搜索已经在历史记录中,提到第一个
				if (this.historyList.includes(this.kw)) {
					this.historyList.splice(this.historyList.indexOf(this.kw), 1);
				}
				this.historyList.unshift(this.kw)
				// 调用uni.setStorageSync(K,V) 将搜索历史记录持久化存储到本地
				uni.setStorageSync("hl", JSON.stringify(this.historyList))
			},
			cleanHistory() {
				this.historyList = [],
					uni.setStorageSync("hl", JSON.stringify(this.historyList))
			},
			kwToInput(item) {
				this.searchValue = item
				this.kw = item
				this.getSearchResults()
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;

			.goods-name {
				//文字不允许换行
				white-space: nowrap;
				//溢出部分隐藏
				overflow: hidden;
				//文本溢出用...代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;

			.history-list {
				display: flex;
				flex-wrap: wrap;

				uni-tag {
					margin-top: 5px;
					margin-right: 5px;
				}
			}
		}
	}
</style>