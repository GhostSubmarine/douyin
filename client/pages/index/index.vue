<template>
	<view class="container" :style="{height: '100%'}">
		<Tabs />
		<swiper class="swiper" :vertical="true" :style="{height: 'calc(100% - 188rpx)'}" @change="changeSwiper">
			<swiper-item v-for="item,index in videoSrcArr" :key="index">
				<view class="swiper-item">
					<y-video-player :item="item" :currnetIndex="currnetSwiper" :displayArr="displayArr"
						:containerHieght="'100%'">
					</y-video-player>
				</view>
			</swiper-item>
		</swiper>
		<TabBar />
	</view>
</template>
<script lang="ts" setup>
	import TabBar from '@/components/tabbar/index.vue';
	import Tabs from '@/components/tabs/index.vue';
	import { ref, watch, reactive } from 'vue';
	import yVideoPlayer from '@/uni_modules/y-video-player/components/y-video-player/y-video-player.vue';
	interface ImgVideoType {
		file : string            // 文件地址
		file_type : 1 | 2        // 文件类型
		cureent_time ?: number   // 视频播放进度
		[key : string] : any
	}
	// swiper当前所在位置
	const currnetSwiper = ref<number>(0);
	// 当前需要显示的数据
	const displayArr = ref<ImgVideoType[]>([]);

	const videoSrcArr = ref<ImgVideoType[]>([
		{
			file: '/static/28637069901-1-16.mp4',
			file_type: 2,
			cureent_time: 0,
		},
		{
			file: '/static/28637069901-1-16.mp4',
			file_type: 2,
			cureent_time: 0,
		},
		{
			file: '/static/28637069901-1-16.mp4',
			file_type: 2,
			cureent_time: 33,
		},
		{
			file: '/static/28637069901-1-16.mp4',
			file_type: 2,
			cureent_time: 0,
		},
		{
			file: '/static/28637069901-1-16.mp4',
			file_type: 2,
			cureent_time: 6,
		},
		{
			file: '/static/28637069901-1-16.mp4',
			file_type: 2,
			cureent_time: 18,
		},
		{
			file: '/static/28637069901-1-16.mp4',
			file_type: 2,
			cureent_time: 14,
		},
	])
	videoSrcArr.value = videoSrcArr.value.map((item, index) => {
		return {
			...item,
			index
		}
	})
	/**swpier切换事件*/
	const changeSwiper = (e : any) : void => {
		currnetSwiper.value = e.detail.current;
	}

	/**
	 * 决定提前渲染多少个视频
	 * @param {number} index 数组下标
	 * @param {array} array 需要切割的数组
	*/
	function sliceArrayByIndex<T>(index : number, array : T[]) : T[] {
		// 如果数组长度小于5位，直接返回整个数组
		if (array.length < 5) {
			return array;
		}
		// 计算新数组的起始位置，确保不会小于0，同时尽量保证能够取到5个元素
		let start = index - 2;
		if (start < 0) {
			start = 0;
		} else if (index + 2 >= array.length) {
			start = array.length - 5; // 调整起始位置以确保数组长度为5
		}
		// 计算新数组的结束位置，确保不会超出数组长度
		let end = start + 5;
		return array.slice(start, end);
	}
	watch(currnetSwiper, (newVal) => {
		displayArr.value = sliceArrayByIndex<ImgVideoType>(newVal, videoSrcArr.value);
		console.log(displayArr.value)
	}, { immediate: true })
</script>

<style lang="less" scoped>
	.swiper-item {
		height: 100%;
	}
</style>