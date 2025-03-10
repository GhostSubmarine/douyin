<template>
	<view class="container">
		<view class="header">
			<image :src="userinfo.pic" />
			<view class="user-info">
				<view class="user-name">{{userinfo.name}}</view>
				<view class="user-id">ID: {{userinfo.user_account_id}}</view>
			</view>
		</view>
		<view class="liner"></view>
		<view class="cell-list">
			<view class="cell-item" v-if="!token" @click="goNavigateTo('/pages/phoneBind/accountBind')">
				<view class="cell-left">
					<image class="item-img" src="/static/images/mine/frame.png" /> 
					<view class="item-title">绑定账号</view>
				</view>
				<image class="cell-right" src="/static/images/mine/Slice.png" />
			</view>
			<view class="cell-item" @click="goNavigateTo('/pages/member/member')">
				<view class="cell-left">
					<image class="item-img" src="/static/images/mine/number.png" /> 
					<view class="item-title">会员充值</view>
					<view class="item-tip" v-if="isIos">由于相关规范，iOS功能暂不可用</view>
				</view>
				<image class="cell-right" src="/static/images/mine/Slice.png" />
			</view>
			<view class="cell-item"  @click="goNavigateTo('/pages/diamond/diamond')">
				<view class="cell-left">
					<image class="item-img" src="/static/images/mine/diamond.png" /> 
					<view class="item-title">钻石充值</view>
					<view class="item-tip" v-if="isIos">由于相关规范，iOS功能暂不可用</view>
				</view>
				<image class="cell-right" src="/static/images/mine/Slice.png"/>
			</view>
			<button class="cell-item"  :plain="true"
				open-type="contact" @contact="handlerContact" session-from="session-from">
				<view class="cell-left">
					<image class="item-img" src="/static/images/mine/contact.png" /> 
					<view class="item-title">客服咨询</view>
				</view>
				<image class="cell-right" src="/static/images/mine/Slice.png"/>
			</button>
			<view class="cell-item"  @click="goNavigateTo('/pages/index/subIndex')">
				<view class="cell-left">
					<image class="item-img" src="/static/images/mine/diamond.png" /> 
					<view class="item-title">订阅服务</view>
				</view>
				<image class="cell-right" src="/static/images/mine/Slice.png"/>
			</view>
		</view>
	</view>
	
</template>

<script lang="ts" setup>
	import { ref, toRefs } from 'vue';
	import { onReady, onShow,onLoad} from '@dcloudio/uni-app'
	import { getUserInfo } from '../../api/index'
	const token = ref(false)
	const userinfo = ref({
		pic: '/static/images/userinfo.jpg',
		name: '爱在西元前',
		user_account_id: 1131636
	})
	const isIos = ref(false)
	
const goNavigateTo = (url:string )=>{
	uni.navigateTo({
		url: url 
	})
}
const handlerContact = (e)=>{
	console.log('handlerContact', e)
}

// onReady(async ()=>{
// 	const system  = uni.getSystemInfoSync()
// 	if(system.osName == 'ios'){
// 		 isIos.value = true
// 	}
// 	token.value = uni.getStorageSync('token')
// 	if(!token.value){
// 		uni.navigateTo({
// 			url:'/pages/phoneBind/accountBind'
// 		})
// 	}
// 	const res = await getUserInfo() as any
// 	userinfo.value = res.user_info
// 	uni.setStorageSync('token', res.user_info.token)
// 	uni.setStorageSync('userinfo', res.user_info)
// })
</script>

<style lang="scss" scoped>
	.container {
		width: 94%;
		height: 100%;
		margin: 0 auto;

		.header {
			width: 100%;
			padding-top: 20rpx;
			padding-bottom: 40rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			image {
				width: 180rpx;
				height: 180rpx;
				border-radius: 8rpx 8rpx 8rpx 8rpx;
				opacity: 1;
			}

			.user-info {
				margin-left: 40rpx;
				width: auto;
				height: 180rpx;
				padding-top: 40rpx;
				padding-bottom: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				font-family: PingFang SC, PingFang SC;

				.user-name {
					font-size: 36rpx;
					color: #1D2541;
					font-weight: bold;
				}

				.user-id {
					font-size: 24rpx;
					font-weight: 500;
					color: #888888;
				}
			}
		}
		.liner {
			width: 100%;
			opacity: 1;
			border: 3rpx solid #EEEEEE;
		}
		.cell-list{
			padding-top: 42rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			.cell-item{
				width: 100%;
				margin-bottom: 78rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				color: #333333;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: none !important; 
				border: none !important; 
				padding: 0 !important;
				border: none;
				
				.cell-left{
					display: flex;
					
					align-items: center;
					.item-img{
						width: 38rpx;
						height: 38rpx;
					}
					.item-title{
						margin-left: 22rpx;
					}
					.item-tip{
						margin-left: 8rpx;
						font-size: 28rpx;
						color: #C3C4CF;
					}
				}
				.cell-right{
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
</style>