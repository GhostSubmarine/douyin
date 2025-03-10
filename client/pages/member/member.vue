<template>
	<view class="container">
		<image class="background-img" src="/static/images/mine/numberback.png" />
		<view class="user-info">
			<image :src="userInfo.pic" />
			<view class="user-content">
				<view class="user-name">{{userInfo.name}}
				<image src="/static/images/mine/viptag.png" v-if="userInfo.is_vip"></image>
				</view>
				<view class="user-banlace">{{userInfo.end_time}}</view>
			</view>
		</view>
		<view class="adimg">
			<image class="adbackgroud" src="/static/images/mine/numberMask.png"/>
			<view class="ad-left">
				<view class="left-title">尊享八大特权</view>
				<view class="left-desc">{{topTitle[0]}}<text>{{topTitle[1]}}</text>{{topTitle[2]}}</view>
			</view>
			<view class="ad-right">
				<image src="/static/images/mine/numberVip.png" />
			</view>
		</view>
		<view class="shops">
			<uv-scroll-list :indicator="false" :current="current" >
				<view class="shop-box" v-for="(item, index) in packageList" :key="index">
					<view class="shop-item " :class="{'acative' : isActive(index)}" @click="clickChange(item)">
						<view class="item-title">{{item.short_name}}</view>
						<view class="item-prict"><view class="text">￥</view>{{item.price}}</view>
						<view class="item-old"><view class="text">￥</view>{{item.price_old}}</view>
						<image class="tip" src="/static/images/mine/tip_experience.png" v-if="item.tip"></image>
					</view>
				</view>
			</uv-scroll-list>
		</view>
		<view class="buy">
			<uv-button @click="toPay" :disabled="iosdisable"><view class="buy-button">{{btnText}}</view></uv-button>
			<view class="agreement">开通会员代表接受 <text @click="investGreement('agreement_vip_charge')">《会员服务协议》</text>
			 与 <text @click="investGreement('agreement_auto_charge')">《自动续费协议》</text></view>
		</view>
		<view class="equity">
			<view class="title"><image src="/static/images/mine/equitytext.png" /></view>
			<view class="lists">
				<uv-grid :border="false"  @click="clickEquity">
					<uv-grid-item v-for="(item,index) in vipRights" :key="index">
						<view class="item-box">
							<image :src="item.icon_big" />
							<view class="box-title">{{item.title}}</view>
						</view>
					</uv-grid-item>
				</uv-grid>
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
				<view class="shop-name">开通<view class="agreement">{{payInfo.short_name}}</view>会员</view>
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
	<uni-popup ref="modalRef">
		<view class="modal">
			<view class='content'><image src="/static/images/show.png"></image></view>
			<view class="close" style="text-align: center;" @click="()=>modalRef.close()">
				<image mode="center" src="/static/images/mine/modal_X.png"></image>
			</view>
			<view class="btn-go" @click="clickEquity(0)"></view>
		</view>
	</uni-popup>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onReady,onLoad } from '@dcloudio/uni-app'
import {getUserInfo,vippackage,viporderadd,viporderpay} from '../../api/index'
import route from '@/uni_modules/uv-ui-tools/libs/util/route.js';
	const popupPay = ref(null)
	const modalRef = ref(null)
	const current = ref(0)
	const userInfo = ref({
		"id": 1275,
		"pic": "/static/images/userinfo.jpg",
		"name": "柚希2",
		"is_vip": 0,
		"end_time": "开通平台vip，享八大特权",
		"k_price": "0.00"
	})
	const packageList = ref([
		{
			id:1,
			price: 6.8,
			price_old: 28,
			short_name: '周卡',
			tip: '一周体验卡',
			top_title: '每天最高可省|21.2元',
		},{
			id:2,
			price: 38,
			price_old: 68,
			short_name: '月卡',
			tip: '',
			top_title: '每月最高可省|110元',
		},{
			id:3,
			price: 128,
			price_old: 238,
			short_name: '年卡',
			tip: '',
			top_title: '每年最高可省|332.2元',
		}
	])
	const vipRights = ref([
		{
			"id": 1,
			"icon_big": "/static/images/mine/Frame1.png",
			"title": "VIP标识",
			"sub_title": "任何场景下，展示您的特殊身份",
			"desc": "您的专属VIP标识无论您再本app的任何界面，都将始终伴随着独特的VIP标识。无论是再聊天、社区互动、平台活动中，您的VIP标识都将让您再人群中脱颖而出，展示您的特殊身份。"
		},
		{
			"id": 2,
			"icon_big": "/static/images/mine/Frame2.png",
			"title": "通话折扣",
			"sub_title": "视频、语音通话享受5折优惠",
			"desc": "与那些引起您兴趣的人进行通话将变得更加经济实惠。视频和语音通话将以原价一半的价格呈现，让您可以更频繁、更贴近地与重要的人交流。这不仅是节省开支的方式，更是与他人建立深入连接的途径。"
		},
		{
			"id": 3,
			"icon_big": "/static/images/mine/Frame3.png",
			"title": "心动值加速",
			"sub_title": "心动值升级1.5倍加速",
			"desc": "您知道心动值是构建联系的重要指标，而作为会员，您将以1.5倍的速度积累心动值。这意味着您的互动将更快地引起对方的关注，并有助于更快地找到那些与您兴趣相投的人，加速您与理想伴侣的互动进程。"
		},
		{
			"id": 4,
			"icon_big": "/static/images/mine/Frame4.png",
			"title": "通话免费",
			"sub_title": "每天视频、语音通话畅聊5人",
			"desc": "每天，您将享有与5位朋友进行免费视频或语音通话的特权。这将为您提供更多亲密互动的机会，让您与心仪的人保持更紧密的联系，无需担心通话时长或费用，让您的亲密互动变得更加轻松自在。"
		},
		{
			"id": 5,
			"icon_big": "/static/images/mine/Frame5.png",
			"title": "优先体验",
			"sub_title": "微信、视频语音通话，快人一步",
			"desc": "您作为会员将在新功能发布时首先体验它们。这意味着您将率先体验到平台的最新创新，感受到独特的功能和体验，以及与其他用户一步领先的机会。这将让您保持在平台发展的最前沿。"
		},
		{
			"id": 6,
			"icon_big": "/static/images/mine/Frame6.png",
			"title": "隐身设置",
			"sub_title": "隐藏自己的在线状态，访问不留足迹",
			"desc": "保护您的隐私是我们的首要任务，因此您可以选择隐身设置。您可以隐藏在线状态，而且在查看他人信息时，不会留下任何访问痕迹。这样，您可以更自由地探索社区，了解其他人，而不必担心被察觉。"
		},
		{
			"id": 7,
			"icon_big": "/static/images/mine/Frame7.png",
			"title": "查看访客记录",
			"sub_title": "了解谁查看了您的资料，交友快人一步",
			"desc": "作为会员，您可以查看谁访问了您的个人信息，展示了对您的兴趣。这将帮助您更好地了解您吸引了哪些人，并为您的社交互动提供更深入的见解，让您能够更有针对性地与其他用户互动。"
		},
		{
			"id": 8,
			"icon_big": "/static/images/mine/Frame8.png",
			"title": "无限搭讪",
			"sub_title": "释放您的搭讪潜力，畅游无限的交流可能性！",
			"desc": "不再局限于数量上的限制，您可以自由、无拘束地发起对话，探索更多有趣的交流机会。让您更轻松地找到与您兴趣相投、合拍度更高的用户。"
		}
	])
	const payInfo = ref({top_title:''})
	const iosdisable = ref(false)
	
const btnText = computed(()=>{
	const system  = uni.getSystemInfoSync()
	if(system.osName == 'ios' ){
		iosdisable.value = true
		return userInfo.value.is_vip == 0 ? '立即开通会员':'立即续费会员';
	}else{
		iosdisable.value=false
		return  userInfo.value.is_vip == 0 ? '立即开通会员':'立即续费会员';
	}
})
const isActive = (index)=>{
	return current.value == index
}
const animationfinish = (e)=>{
	current.value = e.detail.current
}
const topTitle = computed(()=>{
	return payInfo.value.top_title.split('|')
})
const clickChange = (item:any)=>{
	current.value = packageList.value.findIndex(line=>item.id == line.id)
	payInfo.value = item
}
const toPay = ()=>{
	popupPay.value.open('bottom')
}

onReady(async ()=>{
	// const result = await vippackage() as any
	// userInfo.value = result?.user_info
	// packageList.value = result?.package_list
	// vipRights.value = result?.vip_rights
	let item = packageList?.value[current.value]
	payInfo.value = item
})
const addOrder = async ()=>{
	const result = await viporderadd({ pay_type:4,hid:payInfo.value.id}) as any
	if(result?.order_sn){
		const pays = await viporderpay({order_sn: result.order_sn}) as any
		uni.requestPayment({
			provider:'wxpay',
			orderInfo:result.order_sn,
			timeStamp: pays.timeStamp,
			nonceStr:pays.nonceStr,
			package: pays.package,
			signType: pays.signType,
			paySign: pays.paySign,
			success: (res)=>{
				console.log('res',res)
				modalRef.value.open()
				popupPay?.value.close()
				(getUserInfo() as unknown as  Promise<any>).then(res => userInfo.value = res.user_info)
			},
			fail: (err) => {
				console.log('err',err)
			}
		})
	}
}
const clickEquity = (index:number) => {
	route({url:'/pages/member/information', params: {index: index,vipRights:JSON.stringify(vipRights.value)}})
}
const investGreement = (name: string)=>{
	route({url:'/pages/mine/agreement',params: {invest:name}})
}
</script>
<style lang="scss" scoped>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 48rpx;
		position: relative;
		.background-img{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			opacity: 1;
		}
	}

	.user-info {
		width: 94%;
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
			align-items: flex-start;
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			color: #EBCEBC;
			.user-name {
				font-size: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					margin-left: 12rpx;
					width: 62rpx;
					height: 54rpx;
				}
			}

			.user-banlace {
				font-size: 24rpx;
			}
		}
	}

	.adimg {
		margin-top: 40rpx;
		margin-bottom: 52rpx;
		width: 94%;
		height: 260rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		.adbackgroud{
			position: absolute;
			top:0;
			left:0;
			width: 100%;
			height: 100%;
			z-index: -1;
			overflow: hidden;  
		}
		.ad-left {
			margin-bottom: 32rpx;
			padding-left: 20rpx;
			align-self: flex-end;
			width: 64%;
			height: 58%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			font-size: 36rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			color: #D2D3E4;
			white-space: nowrap;

			.left-desc {
				text {
					font-size: 64rpx;
					color: #C3C4CF;
					letter-spacing: 1px;
					background: linear-gradient(180deg, #BDC0E8 19%, #F9FAFE 53%, #696E9E 82%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}

		.ad-right {
			padding-top: 0rpx;
			width: 34%;
			height: 48%;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.shops{
		width: 100%;
		.shop-box{
			width: 100%;
			height: 248rpx;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			overflow: visible;
			.shop-item {
				width: 180rpx;
				height: 200rpx;
				background-image: url('/static/images/mine/vipcardbackgroud.png');
				background-size: contain;
				background-repeat: no-repeat;
				background-clip: unset;
				border-radius: 4rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				position: relative;
				overflow: visible;
				.item-title{
					font-size: 32rpx;
					color: #BBBEEB;
					line-height: 68rpx;
					
				}
				.item-prict{
					font-size: 48rpx;
					background: linear-gradient(180deg, #BDC0E8 0%, #F9FAFE 50%, #696E9E 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					display: flex;
					justify-content: center;
					align-items: flex-end;
					overflow: hidden;
					
					.text{
						font-size: 36rpx;
					}
				}
				.item-old{
					font-size: 28rpx;
					color: #9E9EB4;
					display: flex;
					justify-content: center;
					align-items: flex-end;
					text-decoration: line-through; 
					.text{
						font-size: 20rpx;
						margin-bottom: 2rpx;
					}
				}
				.tip{
					width: 124rpx;
					height: 42rpx;
					position: absolute;
					top: -24rpx;
					left: -18rpx;
				}
			}
			.acative {
				width: 200rpx;
				height: 226rpx;
				background-image: url('/static/images/mine/vipselectbackgroud.png');
				& .item-title{
					font-size: 38rpx;
					color: #EDEDFA;
				}
				& .item-prict{
					font-size: 68rpx;
					background: linear-gradient(180deg, #E1B99F 0%, #FFFAF6 50%, #9F7E6D 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					white-space: nowrap;
					overflow: hidden;
					
					& .text{
						font-size: 46rpx;
						margin-bottom: 4rpx;
					}
				}
				& .tip{
					width: 128rpx;
					height: 44rpx;
					position: absolute;
					top: -24rpx;
					left: -18rpx;
				}
			}
		}
	}
	.buy {
		margin-top: 28rpx;
		width: 96%;
		overflow: visible;
		::v-deep .uv-button {
			width: 100%;
			height: 88rpx;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			border: 2rpx solid;
			border-image: linear-gradient(178deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.08)) 2 2;
			background: url('/static/images/mine/buybtn.png');
			background-size: cover;
			background-repeat: no-repeat;
			background-clip: unset;
			.buy-button{
				font-size: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 38rpx;
				background: linear-gradient(180deg, #E1B99F 0%, #FFFAF6 33%, #9F7E6D 84%, #BD9885 98%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}

		.agreement {
			padding-top: 24rpx;
			width: 100%;
			margin: 0 auto;
			font-size: 20rpx;
			line-height: 24rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			color: #888888;
			white-space: nowrap;
			text-align: center;

			text {
				color: #C3C4CF;
				letter-spacing: 1px;
				background: linear-gradient(180deg, #BDC0E8 19%, #F9FAFE 53%, #696E9E 82%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
	}

	.equity {
		margin-top: 40rpx;
		width: 96%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.title {
			margin-bottom: 20rpx;
			width: 594rpx;
			height: 52rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}

		.lists {
			width: 98%;
			
			.item-box {
				margin-bottom: 42rpx;
				width: 184rpx;
				height: 184rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
				// border-radius: 14rpx;
				// opacity: 0.3;
				// border: 2rpx solid;
				// border-image: linear-gradient(281deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0)) 2 2;
				background-image: url('/static/images/mine/equityback.png');
				background-size: contain;
				background-repeat: no-repeat;
				
				image {
					width: 80rpx;
					height: 80rpx;
				}

				.box-title {
					font-size: 26rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					color: #C3C4CF;
					white-space: nowrap;
					// line-height: 28rpx;
					// -webkit-background-clip: text;
					// -webkit-text-fill-color: transparent;
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
.modal{
	width: 54vh;
	height: 88vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	.content{
		width: 100%;
		height: 80%;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.close{
		position: absolute;
		width: 86rpx;
		height: 86rpx;
		bottom: 204rpx;
		left: 46%;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.btn-go{
		position: absolute;
		height: 118rpx;
		width: 388rpx;
		bottom: 370rpx;
		left: 26%;
		
	}
}

</style>
