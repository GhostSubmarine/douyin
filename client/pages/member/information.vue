<template>
	<view class="container">
		<swiper class="swiper" 
		:current="current" 
		previous-margin="32rpx"
		next-margin="32rpx"
		@animationfinish="(e)=>current = e.detail.current">
			<swiper-item v-for="(item,index) in swiperList" :item-id="index" :key="index">
				<view class="swiper-item">
					<view class="item-box" :class="{'unActive': current !== index}">
						<view class="item-content">
							<view class="item-title">{{item.title}}</view>
							<view class="item-sub_title">{{item.sub_title}}</view>
						</view>
					</view>
					<view class="item-img"><image  :src="item.icon_big" :class="{'unItemImg': current !== index}"/></view>
				</view>
			</swiper-item>
		</swiper>
		<view class="contnet">
			<view class="title">
				<image src="/static/images/mine/infoicon.png" />
				<view class="text">权益说明</view>
			</view>
			<view class="desc">{{context}}</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { computed, ref } from 'vue';
	import { onReady, onLoad } from '@dcloudio/uni-app'
	const current = ref(0)
	
	const swiperList = ref([])
	const context = computed(()=>{
		return swiperList.value[current.value].desc
	})
	onLoad((option)=>{
		current.value = parseInt(option?.index)
		swiperList.value = JSON.parse(option?.vipRights)
		uni.loadFontFace({
		  family: 'MyFont',
		  source: 'url("https://")',
		  success() {
			  console.log('字体文件加载成功..............')
		  },
		  fail(err: any){
			  console.log('字体文件加载失败..............',err)
		  }
		})

	})
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.swiper {
			height: 480rpx;
			margin-top: 52rpx;
			padding-bottom: 0rpx;
		}

		.swiper-item {
			height: 100%;
			width: 96%;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			.item-box {
				width: 100%;
				height: 80%;
				background: #FEF7EF;
				box-shadow: 0rpx 20rpx 40rpx 0rpx rgba(27, 18, 16, 0.16);
				border-radius: 16rpx 16rpx 16rpx 16rpx;
				opacity: 1;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				
				.item-content {
					margin-left: 38rpx;
					height: 68%;
					width: 62%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.item-title {
						font-size: 66rpx;
						font-family: 'MyFont' !important;
						font-weight: 400;
						color: #884231;
						line-height: 77rpx;
					}
					.item-sub_title{
						font-size: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						color: #BA563E;
						letter-spacing: 1px;
					}
				}
			}
			.item-img {
				position: absolute;
				width: 260rpx;
				height: 260rpx;
				left: 65%;
				bottom: -15%;
				
			}
			.unActive {
				width: 100%;
				height: 64%;
			}
			.unItemImg{
				width: 240rpx;
				height: 240rpx;
				left: 68%;
				bottom: -10%;
			}
			image{
				width: 100%;
				height: 100%;
			}
		}

		.contnet {
			height: 100%;
			width: 100%;
			background-image: url('/static/images/mine/infoback.png');
			background-repeat: no-repeat;
			background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;

			.title {
				width: 88%;
				margin-top: 68rpx;
				margin-bottom: 38rpx;
				display: flex;
				align-items: center;

				image {
					width: 4rpx;
					height: 42rpx;
				}

				.text {
					margin-left: 18rpx;
					font-size: 36rpx;
					line-height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 535;
					color: #000000;
					letter-spacing: 2px;
				}
			}
			.desc{
				width: 82%;
				height: 100%;	
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				color: #666666;
				line-height: 35rpx;
				letter-spacing: 1px;
			}
		}
	}
</style>
<style>
	page {
		width: 100%;
		height: 100vh;
		background: linear-gradient(180deg, #FDCDC3 0%, #FDC0AE 24%, #FDBCA8 31%, #FE9365 100%);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		opacity: 1;
	}
</style>