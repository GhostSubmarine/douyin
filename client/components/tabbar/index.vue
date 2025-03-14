<template>
	<up-tabbar :value="value" @change="name => value = name" :fixed="true" :placeholder="true"
		:safeAreaInsetBottom="true">
		<up-tabbar-item text="首页" icon="home"></up-tabbar-item>
		<up-tabbar-item text="朋友" icon="chat"></up-tabbar-item>
		<up-tabbar-item text="上传" icon="camera"></up-tabbar-item>
		<up-tabbar-item text="消息" icon="bell"></up-tabbar-item>
		<up-tabbar-item text="我的" icon="account"></up-tabbar-item>
	</up-tabbar>
</template>

<script>
	export default {
		name: "tabbar",
		data() {
			return {
				value: 0
			};
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