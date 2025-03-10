<script>
	export default {
		onLoad:function(option){
			const launchOptions = uni.getLaunchOptionsSync();
			console.log('携带的参数：', launchOptions.query);
			console.log('加载的参数：', option);
			if(launchOptions?.token){
				uni.setStorageSync('token',launchOptions.token)
			}
			if(option?.token){
				uni.setStorageSync('token',option.token)
			}
		},
		onLaunch: function() {
			
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
