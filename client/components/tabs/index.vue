<template>
	<up-tabs :list="list1" @click="click"></up-tabs>
</template>

<script ts setup>
	import { reactive } from 'vue';
	// 创建响应式数据
	const list1 = reactive([{
			name: '关注'
		},
		{
			name: '推荐'
		},
		{
			name: '电影'
		},
		{
			name: '科技'
		},
		{
			name: '音乐'
		},
		{
			name: '美食'
		},
		{
			name: '文化'
		},
		{
			name: '财经'
		},
		{
			name: '手工'
		}
	]);

	// 定义方法  
	const click = (item) => {
		console.log('item', item);
	}
</script>

<style lang="less" scoped>
.u-tabs {
	height: 88rpx;
	background-color: #000000;
}
/deep/.u-tabs__wrapper__nav__item__text {
	color: #FFFFFF!important;
}
/deep/.u-tabs__wrapper__nav__item {
	height: 88rpx!important;
}
</style>