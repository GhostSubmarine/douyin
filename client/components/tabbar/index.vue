<template>
	<up-tabbar :value="value" @change="name => value = name" :fixed="true" :placeholder="true"
		:safeAreaInsetBottom="true">
		<up-tabbar-item text="首页" icon="home"></up-tabbar-item>
		<up-tabbar-item text="放映厅" icon="photo"></up-tabbar-item>
		<up-tabbar-item text="直播" icon="play-right"></up-tabbar-item>
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

<style>

</style>