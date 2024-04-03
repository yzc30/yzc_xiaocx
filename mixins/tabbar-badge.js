import {
	mapGetters
} from 'vuex'

export default {
	computed: {
		//映射
		...mapGetters('m_cart', ['total'])
	},
	watch: {
		total() {
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			if (this.total !== 0) {
				uni.setTabBarBadge({
					// 索引
					index: 2,
					// 内容
					text: this.total + ''
				})
			}
		}
	}
}