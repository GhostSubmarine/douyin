<template>
	<view class="container">
		<rich-text :nodes="agreementData.content"></rich-text>
	</view>
</template>

<script setup>
import { onReady, onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import {agreement} from '../../api/index'
	
	const agreementData = ref({
		title: '',
		content: ''
	})
onLoad(async (option)=>{
	if(option.invest){
		const res = await agreement({file:option.invest}) 
		agreementData.value = {...res}
	}
	uni.setNavigationBarTitle({
	      title: agreementData.value.title
	    });
})
</script>

<style lang="scss" scoped>
.container{
	width: 100%;
	height: 100%;
	padding: 2rpx;
}
</style>
