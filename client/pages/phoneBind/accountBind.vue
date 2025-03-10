<template>
	<view class="container">
		<view class="title">
			<image src="/static/images/logo.png"></image>
			<view class="text">有趣</view>
		</view>
		<button class="plogin" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">有趣手机号登录</button>
		<view class="agreement">
			<uv-checkbox-group  v-model="agreement" activeColor="#FF7D36">
				<uv-checkbox activeColor="red" name="1">
					<template #default>
						我已详细阅读并同意<text>《有趣用户协议》</text>和<text>《有趣隐身政策》</text>
					</template>
				</uv-checkbox>
			</uv-checkbox-group>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onReady } from '@dcloudio/uni-app'
import {bindphone, weixinlogin} from '../../api/index'
const agreement = ref([false])

const loginData = ref()

const getPhoneNumber = async (e) =>{
	if(!agreement.value[0]){
		uni.showToast({
			icon: 'none',
			title: '请先阅读并同意《有趣用户协议》以及《有趣隐身政策》'
		})
		return false
	}
	uni.showLoading({
		mask:true
	})
	try{
		const info = await bindphone({...e.detail,...loginData.value}) as any
		uni.setStorageSync('userinfo',info?.user_info)
		uni.setStorageSync('token', info?.user_info.token)
		uni.switchTab({url: '/pages/mine/mine'})
	}catch (e){
		console.log('err ', e)
	}finally{
		uni.hideLoading()
	}
}

onReady(()=>{
	uni.login({
			provider: 'weixin',
			scopes: 'auth_base',
			success: async (loginRes)=>{
				const user = await weixinlogin({code: loginRes.code}) as any
				uni.setStorageSync('userinfo', user?.user_info)
				loginData.value = {...user?.wxjson_data}
			},
		fail: (res) => {
			uni.showToast({
				icon:'none',
				title:'登录失败！'
			})
		}
	})	
})
</script>

<style lang="scss" scoped>
.container{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.title{
		margin-top: 28%;
		display: flex;
		font-size: 60rpx;
		font-family: "YS HelloFont BangBangTi, YS HelloFont BangBangTi";
		font-weight: 400;
		color: #545454;
		line-height: 70rpx;
		image{
			width: 72rpx;
			height: 72rpx;
			margin-right: 8rpx;
		}
	}
	.plogin{
		margin-top: 28%;
		width: 90%;
		height: 88rpx;
		line-height: 88rpx;
		background: #FF7D36;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		opacity: 1;
		color: #FFFFFF;
	}
	.agreement{
		margin-top: 40rpx;
		width: 88%;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28rpx;
		text{
			color: #FF7D36;
		}
		::v-deep .uv-checkbox{
			// justify-content: center;
		}
		::v-deep .uv-checkbox__label-wrap{
			// flex: none;
		}
	}
}
</style>
