<template>
	<template>
		<view class="waterfall">
			<uv-waterfall ref="waterfall" v-model="state.list" :columnGap="state.columnGap" :add-time="10" @changeList="changeList">
				<!-- 第一列数据 -->
				<template v-slot:list1>
					<!-- 为了磨平部分平台的BUG，必须套一层view -->
					<view>
						<view v-for="(item, index) in state.list1" :key="item.id" class="waterfall-item">
							<view class="waterfall-item__image" :style="[imageStyle(item)]" @click="playVideo(item)">
								<image :src="item.thumb" mode="aspectFill"></image>
							</view>
							<view class="waterfall-item__ft">
								<view class="waterfall-item__ft__remark">{{item.remark}}</view>
								<view class="waterfall-item__ft__info">
									<view class="waterfall-item__ft__info_left">
										<image :src="item.user_info?.pic"></image>
										<view class="waterfall-item__ft__username">{{item.user_info?.name}}</view>
									</view>
									<view class="waterfall-item__ft__info_right">
										<image src="/static/images/home/heart.png"></image>
										<!-- <image src="/static/images/home/redheart.png"></image> -->
										<view class="value">{{item.likes}}</view>
									</view>
								</view>
							</view>
							<image class="play" src="/static/images/home/play.png" @click="playVideo(item)"></image>
						</view>
					</view>
				</template>
				<!-- 第二列数据 -->
				<template v-slot:list2>
					<!-- 为了磨平部分平台的BUG，必须套一层view -->
					<view>
						<view v-for="(item, index) in state.list2" :key="item.id" class="waterfall-item">
							<view :style="[imageStyle(item)]" @click="playVideo(item)">
								<image :src="item.thumb" mode="aspectFill" ></image>
							</view>
							<view class="waterfall-item__ft">
								<view class="waterfall-item__ft__remark">{{item.remark}}</view>
								<view class="waterfall-item__ft__info">
									<view class="waterfall-item__ft__info_left">
										<image :src="item.user_info?.pic"></image>
										<view class="waterfall-item__ft__username">{{item.user_info?.name}}</view>
									</view>
									<view class="waterfall-item__ft__info_right">
										<image src="/static/images/home/heart.png"></image>
										<!-- <image src="/static/images/home/redheart.png"></image> -->
										<view class="value">{{item.likes}}</view>
									</view>
								</view>
							</view>
							<image class="play" src="/static/images/home/play.png" @click="playVideo(item)"></image>
						</view>
					</view>
				</template>
			</uv-waterfall>
			<uv-load-more :status="loadStatus"></uv-load-more>
		</view>
	</template>

</template>
<script lang="ts" setup>
import { onReady,onPullDownRefresh,onReachBottom } from '@dcloudio/uni-app'
import { ref, reactive, computed } from 'vue';
import { homeList } from '../../api/index'
import route from '@/uni_modules/uv-ui-tools/libs/util/route.js';
	const waterfall = ref(null)
	const loadStatus = ref('loadmore')
	const page = ref(1)
	const state = reactive({
		list: [], // 瀑布流全部数据
		list1: [], // 瀑布流第一列数据
		list2: [], // 瀑布流第二列数据
		leftGap: 10,
		rightGap: 10,
		columnGap: 10
	});
	const changeList = (e) => {
		state[e.name].push(e.value)
	}
	const imageStyle = computed((item) => {
		return item => {
			const v = uni.upx2px(750) - state.leftGap - state.rightGap - state.columnGap;
			const w = v / 2;
			const rate = w / item.width;
			const h = rate * 180;
			return {
				width: w + 'px',
				height: h + 'px'
			}
		}
	})
	const playVideo = (item:any)=>{
		route({url:'/pages/video/video',params: item})
	}

	onPullDownRefresh(async () =>{
				state.list = [];
				waterfall?.value.clear();
				state.list1 = [];
				state.list2 = [];
				state.list = (await homeList({page: page.value}) as any).list
				uni.showToast({
					icon: 'success',
					title: '刷新成功'
				})
				uni.stopPullDownRefresh();
	})
	onReachBottom(async ()=>{
		if(loadStatus.value == 'loadmore') {
			loadStatus.value = 'loading';
			page.value += 1
			const res = await homeList({page: page.value}) as any
			state.list.push.apply(state.list, res.list);
			loadStatus.value = 'loadmore';
		}	
	})
	onReady(async () => {
		const res = await homeList({page: page.value}) as any
		state.list = res.list
	})
</script>

<style lang="scss" scoped>
	$show-lines: 1;
	@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
	.waterfall{
		width: 96%;
		margin: 0 auto;
	}
	.waterfall-item {
		// width: 48%;
		position: relative;
		overflow: hidden;
		margin-top: 10px;
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		.play{
			width: 38rpx;
			height: 38rpx;
			position: absolute;
			top: 8rpx;
			right: 8rpx;
		}
	}

	.waterfall-item__ft {
		background: #F9FBFE;
		display: flex;
		flex-direction: column;
		font-size: 36rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		padding-top: 12rpx;
		padding-bottom: 12rpx;
		
		.waterfall-item__ft__remark{
			width: 94%;
			margin: 0 auto;
			color: #151B29;
			font-size: 32rpx;
			line-height: 38rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.waterfall-item__ft__info{
			width: 94%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 12rpx;
			
			.waterfall-item__ft__info_left{
				display: flex;
				align-items: center;
				image{
					width: 26rpx;
					height: 26rpx;
					border-radius: 4rpx;
				}
				.waterfall-item__ft__username{
					margin-left: 8rpx;
					font-size: 24rpx;
					color: #0C3F7A;
					white-space: nowrap;
				}
			}
			.waterfall-item__ft__info_right{
				display: flex;
				align-items: center;
				image{
					width: 26rpx;
					height: 26rpx;
					border-radius: 4rpx;
				}
				.value{
					margin-left: 8rpx;
					font-size: 26rpx;
					color: #666666;
				}
			}
		}
	}
</style>