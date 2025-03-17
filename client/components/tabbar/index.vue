<template>
	<up-tabbar :value="value" @change="changeValue" :fixed="true" :placeholder="true"
		:safeAreaInsetBottom="true">
		<up-tabbar-item text="首页" icon="home"></up-tabbar-item>
		<up-tabbar-item text="朋友" icon="chat"></up-tabbar-item>
		<up-tabbar-item text="上传" icon="camera"></up-tabbar-item>
		<up-tabbar-item text="消息" icon="bell"></up-tabbar-item>
		<up-tabbar-item text="我的" icon="account"></up-tabbar-item>
	</up-tabbar>
</template>

<script setup lang="ts">
interface Props {
  value: number
}
import { ref } from 'vue'
const props = withDefaults(defineProps<Props>(), {
  value: 0
})
const changeValue = (name: number) => {
	switch(name) {
		case 0:
			uni.navigateTo({
				url: '/pages/index/index'
			})
			break
		case 1:
			uni.navigateTo({
				url: '/pages/upload/upload'
			})
			break
		case 2:
			uni.navigateTo({
				url: '/pages/upload/upload'
			})
			break
		case 3:
			uni.navigateTo({
				url: '/pages/upload/upload'
			})
			break
		case 4:
			uni.navigateTo({
				url: '/pages/mine/index'
			})
			break
	}
}
</script>

<style lang="less" scoped>
/deep/.u-tabbar__content__item-wrapper {
	height: 100rpx;
	background-color: #000000;
}
/deep/.u-tabbar {
	background-color: #000000;
}
</style>