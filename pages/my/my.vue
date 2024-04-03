<template>
	<view>
		My
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

			};
		}
	}
</script>

<style lang="scss">

</style>