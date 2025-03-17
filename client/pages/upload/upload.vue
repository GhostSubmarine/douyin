<template>
	<view class="container">
		<!-- 视频选择区域 -->
		<view class="video-select">
			<view class="upload-area" @click="chooseVideo">
				<view class="upload-icon">
					<view class="plus-line horizontal"></view>
					<view class="plus-line vertical"></view>
				</view>
				<text class="upload-text">上传视频</text>
				<text class="video-tip">支持mp4格式，时长3分钟内</text>
				<video v-if="videoPath" :src="videoPath" class="preview-video"></video>
			</view>
		</view>

		<!-- 视频描述区域 -->
		<view class="video-info">
			<view class="info-item">
				<text class="info-label">标题</text>
				<input v-model="title" class="info-input" placeholder="添加标题..." />
			</view>
			<view class="divider"></view>
			<view class="info-item">
				<text class="info-label">描述</text>
				<textarea v-model="description" class="info-textarea" placeholder="添加描述..." />
			</view>
		</view>

		<!-- 上传按钮 -->
		<view class="fixed-footer">
			<view class="upload-btn" @click="uploadVideo" :class="{ disabled: !videoPath }">
				立即发布
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		uploadVideoApi
	} from '@/api';
	// 定义响应式变量
	const videoPath = ref('');
	const title = ref('');
	const description = ref('');
	const video = ref < File > (null)
	// 选择视频方法
	const chooseVideo = () => {
		uni.chooseVideo({
			sourceType: ['album', 'camera'],
			maxDuration: 60,
			camera: 'back',
			success: (res) => {
				videoPath.value = res.tempFilePath;
				video.value = res.tempFile
			},
		});
	};

	// 上传视频方法
	const uploadVideo = () => {
		if (!videoPath.value) {
			uni.showToast({
				title: '请选择视频',
				icon: 'none',
			});
			return;
		}
		const formData = new FormData()
		formData.append('title', title.value)
		formData.append('video', video.value)
		formData.append('description', description.value)
		uploadVideoApi(formData)
			.then(res => {
				uni.showToast({
					icon: 'success',
					title: '上传成功'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/index/index'
					})
				})
			})
	};
</script>

<style scoped lang="less">
	.container {
		background-color: #000;
		min-height: 100vh;
		padding: 40rpx;
		color: #fff;
	}

	.upload-area {
		height: 600rpx;
		background: #1a1a1a;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;

		.upload-icon {
			width: 120rpx;
			height: 120rpx;
			border: 4rpx solid #fff;
			border-radius: 50%;
			position: relative;
			margin-bottom: 30rpx;

			.plus-line {
				background: #fff;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);

				&.horizontal {
					width: 60rpx;
					height: 4rpx;
				}

				&.vertical {
					width: 4rpx;
					height: 60rpx;
				}
			}
		}

		.upload-text {
			font-size: 34rpx;
			margin-bottom: 20rpx;
		}

		.video-tip {
			color: #666;
			font-size: 24rpx;
		}

		.preview-video {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	.video-info {
		margin-top: 60rpx;
		background: #1a1a1a;
		border-radius: 20rpx;
		padding: 30rpx;

		.info-item {
			padding: 20rpx 0;
		}

		.info-label {
			font-size: 32rpx;
			color: #888;
			margin-bottom: 20rpx;
			display: block;
		}

		.info-input,
		.info-textarea {
			width: 100%;
			font-size: 34rpx;
			color: #fff;
			background: transparent;
			border: none;
		}

		.divider {
			height: 2rpx;
			background: #333;
			margin: 20rpx 0;
		}
	}

	.fixed-footer {
		position: fixed;
		bottom: 80rpx;
		left: 40rpx;
		right: 40rpx;

		.upload-btn {
			background: #FE2C55;
			height: 96rpx;
			border-radius: 48rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 36rpx;
			font-weight: bold;

			&.disabled {
				background: #666;
				opacity: 0.7;
			}
		}
	}
</style>