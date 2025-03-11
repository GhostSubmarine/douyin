<template>
	<view class="container" :style="{height: containerHieght}">
		<video 
			:id="'video-'+currentItem.index"
			v-if="show && currentItem.file_type === 2"
			:style="{height: containerHieght,width: '100vw'}"
			:src="currentItem.file"
		></video>
	</view>
</template>

<script setup lang="ts">
	import { ref, toRefs, watch, getCurrentInstance } from 'vue';
	
	interface ImgVideoType {
		file: string			// 文件地址
		file_type: 1 | 2		// 文件类型
		cureent_time?: number	// 视频播放进度
		[key: string]: any
	}
	
	interface PropsType {
		containerHieght: string		// 视频高度
		item: ImgVideoType			// 当前的视频信息
		displayArr: ImgVideoType[]	// 需要显示的数组
		currnetIndex: number		// 当前swiper轮播的index
	}
	const props = defineProps<PropsType>();
	const { displayArr, currnetIndex, item: currentItem } = toRefs(props);
	const _this = getCurrentInstance();
	
	const show = ref<boolean>(false); // 是否渲染video标签
	
	watch(displayArr, (newVal)=> {
		show.value = newVal.map(item=>item.file).includes(props.item.file);
		for(let i = 0; i < newVal.length; i++){
			if(newVal[i].file_type === 2){
				if(currnetIndex.value === newVal[i].index){
					setTimeout(()=>{
						uni.createVideoContext(`video-${currnetIndex.value}`,_this).play();
					},300)
				}else{
					uni.createVideoContext(`video-${newVal[i].index}`,_this).pause();
				}
				
			}
		}
	},{immediate: true});
	
</script>

<style>
</style>