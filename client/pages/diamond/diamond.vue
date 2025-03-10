<template>
	<view class="container">
		<view class="user-info">
			<image :src="userInfo.pic"/>
			<view class="user-content">
				<view class="user-name">{{userInfo.name}}</view>
				<view class="user-banlace">钻石余额：{{userInfo.k_price}}</view>
			</view>
		</view>
		<view class="title">选择充值挡位 <view style="color: red;" v-if="iosdisable">由于相关规范，iOS功能暂不可用</view></view>
		<view class="diamond-list">
			<uv-grid :border="false"  @click="clickDiamond">
				<uv-grid-item v-for="(item,index) in diamondList" :key="index">
					<view class="diamond-box" :class="{'box-selected': isSelected(item)}">
						<view class="box-first">
							<view class="first-num">{{item.num}}</view>
							<image src="/static/images/mine/balanceimg.png"/>
						</view>
						<view class="box-second">￥ {{item.price}}</view>
						<view class="box-third">{{item.name}}</view>
						<view class="selecteImg" v-if="isSelected(item)">
							<image src="/static/images/mine/diamondEd.png"></image>
						</view>
					</view>
				</uv-grid-item>
			</uv-grid>
		</view>
		<view class="term">
			<!-- <view class="service">充值即代表同意 <view class="agrement" @click="investGreement('agreement_vip_charge')">《充值服务协议》</view> </view> -->
			<view class="tip">
				<text class="first">风险提示:</text>
				 为保障用户财产安全及合法权益,请务必通过官方正规渠道进行充值，切勿相信任何非官方的虚假充值信息或使用非官方认可的充值渠道进行充值,谨防诈骗等不法行为及由此带来的法律风险。 
			</view>
		</view>
		
	</view>
	<uv-popup ref="popupPay" custom-style="height: 44vh;" round="20">
		<view class="popup-pay">
			<view class="title">
				<image src="/static/images/mine/icon_X.png" @click="()=>popupPay.close()"></image>
				<view class="text">确认付款</view>
			</view>
			<view class="shop">
				<view class="shop-name">充值<view class="agreement">{{payInfo.num}}</view>钻石</view>
				<view class="shop-price">￥{{payInfo.price}}</view>
			</view>
			<view class="liner"></view>
			<view class="paycontainer">
				<view class="pay-title">
					<view class="pay-logo">
						<image src="/static/images/mine/wepaylog.png"></image>
						<view class="pay-name">微信</view>
					</view>
					<view class="pay-select"><image src="/static/images/mine/select.png"></image></view>
				</view>
				<view class="pay-tip">点击确认支付即表示您已同意<view class="agreement" @click="investGreement('agreement_vip_charge')">《充值协议》</view></view>
				<button class="pay-button" @click="addOrder">立即支付</button>
			</view>
		</view>
	</uv-popup>
	<uv-popup ref="popupPrice" :overlay="false" :safeAreaInsetBottom="true" custom-style="height: 98rpx;">
		<view class="popup-price" v-if="!iosdisable">
			<view class="money">实付￥ {{payInfo.price}}</view>
			<view class="paying" @click="showPay">去支付</view>
		</view>
		<view class="popup-price" v-else>
			由于相关规范，iOS功能暂不可用
		</view>
	</uv-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onReady,onLoad } from '@dcloudio/uni-app'
import {getUserInfo,diamondpackage, diamondorderadd,diamondorderpay} from '../../api/index'
import route from '@/uni_modules/uv-ui-tools/libs/util/route.js';
const iosdisable = ref(false)
const popupPay = ref(null)
const popupPrice = ref(null)
const userInfo = ref({
            "id": 1275,
            "pic": "/static/images/userinfo.jpg",
            "name": "柚希2",
            "is_vip": 0,
            "end_time": "",
            "k_price": "0.00"
        })
const diamondList = ref([
	 {
	                "id": 6,
	                "name": "充值698元",
	                "price": "698.00",
	                "num": 6980
	            },
	            {
	                "id": 5,
	                "name": "充值288元",
	                "price": "288.00",
	                "num": 2880
	            },
	            {
	                "id": 4,
	                "name": "充值99元",
	                "price": "99.00",
	                "num": 990
	            },
	            {
	                "id": 3,
	                "name": "充值30元",
	                "price": "30.00",
	                "num": 300
	            },
	            {
	                "id": 2,
	                "name": "充值10元",
	                "price": "10.00",
	                "num": 100
	            },
	            {
	                "id": 1,
	                "name": "充值6元",
	                "price": "6.00",
	                "num": 60
	            }
])
const payInfo = ref({})
const clickDiamond = (index: number)=>{
	payInfo.value = diamondList.value[index]
	popupPrice?.value.open('bottom')
}
const isSelected = (item)=>{
	return payInfo.value.id == item.id
}
const showPay = ()=>{
	popupPrice?.value.close()
	popupPay?.value.open('bottom')
}
const investGreement = (name: string)=>{
	route({url:'/pages/mine/agreement',params: {invest:name}})
}
const addOrder = async ()=>{
	const result = await diamondorderadd({ pay_type:4,zid:payInfo.value.id}) as any
	if(result?.order_sn){
		const pays = await diamondorderpay({order_sn: result.order_sn}) as any
		uni.requestPayment({
			provider:'wxpay',
			orderInfo:result.order_sn,
			timeStamp: pays.timeStamp,
			nonceStr:pays.nonceStr,
			package: pays.package
,			signType: pays.signType,
			paySign: pays.paySign,
			success: (res)=>{
				uni.showToast({
					title: '充值成功',
					icon: 'success',
					success: async () => {
						userInfo.value = (await getUserInfo() as any)?.user_info
						popupPay?.value.close()
					},
					fail: ()=>{
						uni.reLaunch({
						  url: '/pages/diamond/diamond' // 指定当前页面的路径
						});	
					}
				})
			},
			fail: (err) => {
				console.log('err',err)
			}
		})
	}
}

// onReady(async ()=>{
// 	const data = await diamondpackage() as any
// 	userInfo.value = data.user_info
// 	diamondList.value = data.package_list
// 	let item = data?.package_list[0]
// 	payInfo.value = item
// 	const system  = uni.getSystemInfoSync()
// 	if(system.osName == 'ios'){
// 		iosdisable.value = true
// 	}
// 	popupPrice?.value.open('bottom')
// })
</script>
<style lang="scss" scoped>
.container{
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 48rpx;

	.user-info {
		width: 88%;
		display: flex;
		align-items: center;
	
		image {
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
		}
	
		.user-content {
			margin-left: 24rpx;
			height: 108rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			font-family: PingFang SC, PingFang SC;
			font-weight: 550;
			.user-name {
				font-size: 30rpx;
				color: #333333;
			}
	
			.user-banlace {
				color: #666666;
				font-size: 24rpx;
			}
		}
	}
	
	.title{
		width: 88%;
		margin-top: 38rpx;
		margin-bottom: 28rpx;
		font-size: 34rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		color: #333333;
	}
	.diamond-list{
		width: 90%;
		.diamond-box{
			width: 90%;
			height: 204rpx;
			margin-bottom: 18rpx;
			background: #FFFFFF;
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			// border: 2rpx solid #FF7D36;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			font-family: PingFang SC, PingFang SC;
			.box-first{
				margin-top: 28rpx;
				width: 90%;
				display: flex;
				justify-content: center;
				align-items: center;
				.first-num{
					font-size: 42rpx;
					font-weight: bold;
					color: #151B29;
				}
				image{
					margin-left: 10rpx;
					width: 46rpx;
					height: 42rpx;
				}
			}
			.box-second{
				margin-top: 18rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #D54941;
			
			}
			.box-third{
				font-size: 24rpx;
				font-weight: 500;
				color: #888888;
			}
		}
		.box-selected {
			background: #F7F7F7 linear-gradient(180deg, #FFEFD9 0%, #FCDEB8 100%);
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			opacity: 1;
			border: 2rpx solid #FF7D36;
			position: relative;
			.selecteImg{
				position: absolute;
				width: 100%;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.term{
		margin-top: 40rpx;
		width: 88%;
		font-size: 22rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		color: #999999;
		display: flex;
		flex-direction: column;
		.service{
			width: 100%;
			margin-bottom: 24rpx;
			display: flex;
			.agrement{
				color: #FF7D36;
			}
		}
		.tip{
			width: 100%;
			line-height: 32rpx;
			.first{
				color: #D54941;
			}
		}
	}
}
.popup-pay{
	width: 100%;
	height: 100%;
	// padding-top: 28rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	color: #151B29;
	position: relative;
	.agreement{
		color:#FF7D36;
	}
	.title{
		position: absolute;
		top: 28rpx;
		left: 4%;
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 68rpx;
			height: 68rpx;
		}
		.text{
			font-size: 34rpx;
		}
	}
	.shop{
		width: 88%;
		height: 46%;
		display: flex;
		padding-bottom: 28rpx;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		.shop-name{
			font-size: 30rpx;
			color: #666666;
			display: flex;
		}
		.shop-price{
			margin-top: 16rpx;
			font-size: 52rpx;
		}
	}
	.liner{
		width: 88%;
		border: 2rpx solid #EEEEEE;
	}
	.paycontainer{
		height: 54%;
		width: 88%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding-top: 28rpx;
		padding-bottom: 38rpx;
		.pay-title{
			width: 100%;
			display: flex;
			justify-content: space-between;
			.pay-logo{
				display: flex;
				image{
					width: 44rpx;
					height: 44rpx;
				}
				.pay-name{
					margin-left: 18rpx;
				}
			}
			.pay-select{
				width: 32rpx;
				height: 32rpx;
				image{
					width: 100%;
					height: 100%;
				};
			}
		}
		.pay-tip{
			margin-top: auto;
			margin-bottom: 28rpx;
			width: 100%;
			font-size: 30rpx;
			font-weight: 400;
			color: #999999;
			display: flex;
		}
		.pay-button{
			width: 100%;
			height: 88rpx;
			background: linear-gradient(110deg, #FF5783 0%, #FF7D36 100%);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			color: #FFFFFF;
			font-size: 32rpx;
		}
	}
}
.popup-price{
	width: 100%;
	height: 98rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: PingFang SC, PingFang SC;
	font-weight: 500;
	color: #EEEEEE;
	font-size: 32rpx;
	.money{
		width: 64%;
		height: 100%;
		background-color: #333333;
		display: flex;
		align-items: center;
		padding-left: 48rpx;
	}
	.paying{
		width: 36%;
		height: 100%;
		background: #FF7D36;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
<style>
.page{
	background: #EDEDED;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	opacity: 1;
}
</style>
