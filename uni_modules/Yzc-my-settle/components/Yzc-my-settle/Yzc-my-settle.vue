<template>
	<view class="my-settle-container">

		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullChecked">
				<text>全选</text>
			</radio>
		</label>

		<view class="amount-box">
			合计:<text class="amount">¥{{checkedGoodsAmount}}</text>
		</view>

		<view class="btn-settle">结算({{checkedCount}})</view>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
	} from 'vuex'
	export default {
		computed: {
			//映射
			...mapGetters('m_cart', ['total', 'checkedCount', 'checkedGoodsAmount']),
			// 是否全选
			isFullChecked() {
				return this.total === this.checkedCount
			}
		},
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullChecked)
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		z-index: 999;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #C00000;
				font-weight: bold;
			}
		}

		.btn-settle {
			background-color: #C00000;
			height: 50px;
			color: white;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
			text-align: center;
		}
	}
</style>