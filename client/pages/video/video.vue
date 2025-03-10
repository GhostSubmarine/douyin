<template>
	<view class="playvideo">
		<image class="player" mode="aspectFill" :src="videoInfo.video_thumb"></image>
		<view class="information" @click="shearBtn">
			<image class="info-pic" :src="userinfo.pic"></image>
			<view class="info-box">
				<image src="/static/images/home/fullheart.png"></image>
				<view class="text">{{videoInfo.like}}</view>
			</view>
			<view class="info-box">
				<image src="/static/images/home/comment.png"></image>
				<view class="text">{{videoInfo.comments_count}}</view>
			</view>
			<view class="info-box">
				<image src="/static/images/home/gift.png"></image>
				<view class="text">{{videoInfo.gifts_count}}</view>
			</view>
			<view class="info-box">
				<image src="/static/images/home/share.png"></image>
				<view class="text">分享</view>
			</view>
		</view>
		<view class="userinfo">
			<view class="username">@{{userinfo.name}}</view>
			<view class="remark">{{videoInfo.remark}}</view>
		</view>
	</view>
	<uv-modal ref="modal" title="温馨提示" 
	content='想要了解更多精彩内容？立即切换至我们的互趣APP体验吧！' 
	cancelText="考虑一下"
	cancelColor="#111111"
	confirmText="下载APP"
	confirmColor="#FF7D36"
	align ="center"
	:showCancelButton="true"
	@cancel="cancel"
	@confirm="confirm"></uv-modal>
</template>

<script lang="ts" setup>
	import { onReady,onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue';
	import { getVideo } from '../../api/index'
	
	const modal = ref(null)

	const videoInfo = ref({})
	const userinfo = ref({})
	onLoad(async (option )=>{
		const res = await getVideo({id: option?.id}) as any
		videoInfo.value = res
		userinfo.value = res?.user_info
	})
	
	onReady(() => {
		// console.log('onReady')
	})
	
	const endvideo = ()=>{
		console.log('播放结束')
	}
	const shearBtn = ()=>{
		if(userinfo.value?.point){
			modal.value.open()
		}
	}
	const confirm = ()=>{
		uni.navigateTo({
			url:'/pages/index/download'
		})
	}
	const cancel = ()=>{
		modal.value.close()
	}
</script>

<style lang="scss" scoped>
.playvideo{
	width: 100%;
	height: 100%;
	position: relative;
	.player{
		width: 100%;
		height: 100vh;
	}
	.information{
		width: 42rpx;
		height: 48vh;
		position: absolute;
		bottom: 13%;
		right: 38rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		image{
			width: 78rpx;
			height: 78rpx;
			border-color: #fff;
		}
		.info-pic{
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}
		.info-box{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 46rpx;
			text-shadow: 0px 0px 2px rgba(0,0,0,0.35);
		}
	}
	.userinfo{
		position: absolute;
		width: 76%;
		top: 84vh;
		left: 2vh;
		font-family: PingFang SC, PingFang SC;
		.username{
			font-size: 34rpx;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 38rpx;
			margin-bottom: 18rpx;
		}
		.remark{
			font-size: 30rpx;
			font-weight: 400;
			color: #EEEEEE;
			line-height: 38rpx;
			display: -webkit-box;
			-webkit-line-clamp: 2; /* 显示两行 */
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>