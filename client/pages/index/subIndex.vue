<template>
	<view class="container">
		<view style="height: 6rem;">
			<uv-navbar bgColor="#FF7D36">
				<template v-slot:left>
						<view class="uv-nav-slot">
									开通微信订阅服务
						</view>
				</template>
			</uv-navbar>
		</view>
		<view class="logo">
			<view class="img"><image src="/static/images/logo.png"/></view>
			<view class="name">有趣</view>
		</view>
		<view class="title">
			<view class="big-title">
				<image src="/static/images/title.png"></image>
			</view>
			<view class="sub-title">关注微信服务号！获取专属优惠券让你在交友路上更加游刃有余。</view>
		</view>
		<view class="qr-content">
			<view class="qr-img">
				<image :show-menu-by-longpress="true" src="/static/images/qc-pub.jpg"/>
			</view>
			<button class="btn-submit" :plain="true">
				<image class="btn-img" src="/static/images/triangle.png" />
				<view class="btn-text">长按二维码关注</view>
				<image class="btn-img" src="/static/images/triangle.png"></image>
			</button>
		</view>
	</view>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.container{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	.uv-nav-slot{
		font-size: 34rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 33rpx;
	}
	image{
		width: 100%;
		height: 100%;
	}
	.logo{
		margin-top: 62rpx;
		width: 84%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.img{
			width: 48rpx;
			height: 48rpx;
		}
		.name{
			left: 4rpx;
			font-size: 36rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 800;
			color: #333333;
			line-height: 42rpx;
			
		}
	}
	.title{
		width: 84%;
		margin-top: 64rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		.big-title{
			width: 100%;
			height: 104rpx;
		}
		.sub-title{
			margin-top: 20rpx;
			width: 100%;
			height: 88rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			color: #999999;
			line-height: 38rpx;
		
		}
	}
	.qr-content{
		margin-top: 40rpx;
		width: 100%;
		height: 750rpx;
		background: url('/static/images/qrbg.png');
		background-size: cover;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		padding-top: 28rpx;
		.qr-img{
			width: 460rpx;
			height: 460rpx;
		}
		.btn-submit{
			height: 94rpx;
			width: 80%;
			width: 606rpx;
			height: 94rpx;
			background: #FFF7F2;
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			opacity: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			border: none;
			.btn-img{
				width: 32rpx;
				height: 32rpx;
			}
			.btn-text{
				margin-left: 18rpx;
				margin-right: 18rpx;
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				color: #FF7D36;
				line-height: 38rpx;
				letter-spacing: 2px;
			}
		}
	}
}
</style>
<style>
page{
	background: linear-gradient(to bottom, #FFF9F6, #FFECE2);
}
</style>
