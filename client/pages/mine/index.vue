<template>
  <view class="profile-page">
    <!-- 背景和头部 -->
    <view class="header-bg">
      <image :src="userInfo.background" mode="aspectFill" class="bg-image" />
    </view>

    <!-- 用户信息 -->
    <view class="user-info">
      <van-image
        round
        width="140rpx"
        height="140rpx"
        :src="avatar"
        class="user-avatar"
      />
      <view class="count-wrapper">
        <view class="count-item">
          <text class="count-num">{{ userInfo.follows ?? 0 }}</text>
          <text class="count-label">关注</text>
        </view>
        <view class="count-item">
          <text class="count-num">{{ userInfo.fans ?? 0 }}</text>
          <text class="count-label">粉丝</text>
        </view>
        <view class="count-item">
          <text class="count-num">{{ userInfo.totalLikes }}</text>
          <text class="count-label">获赞</text>
        </view>
        <view class="count-item">
          <text class="count-num">{{ userInfo.mutualFollow ?? 0 }}</text>
          <text class="count-label">互关</text>
        </view>
      </view>
    </view>
    <TabBar :value="4" />
  </view>
</template>

<script setup lang="ts">
import TabBar from '@/components/tabbar/index.vue';
import { onMounted, reactive } from "vue";
import { getUserInfoApi } from '@/api'
import avatar from '@/static/avatar.png'
interface UserInfo {
  id: number
  videos: any[] // 根据实际视频数据结构替换 any
  username: string
  avatar: string
  createdAt: string
  totalLikes: number
  totalCollects: number
  videoStats: VideoStats
  background: string
}

interface VideoStats {
  totalVideos: number
  totalLikes: number
  totalCollects: number
}
const userInfo = reactive<UserInfo>({
  background: "/static/header-bg.png",
  avatar
} as UserInfo);
const getUserInfo = () => {
	getUserInfoApi()
	.then(res => {
		for (let key in res) {
      userInfo[key] = res[key]
    }
	})
}
onMounted(() => {
	getUserInfo()
})
</script>

<style lang="less" scoped>
.profile-page {
  background: #000;
  min-height: 100%;
}

.header-bg {
  height: 500rpx;
  position: relative;
  .bg-image {
    width: 100%;
    height: 100%;
    filter: blur(20px);
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200rpx;
    background: linear-gradient(transparent, #000);
  }
}

.user-info {
  position: relative;
  z-index: 1;
  margin-top: -80rpx;
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .user-avatar {
    border: 4rpx solid #fff;
    box-shadow: 0 0 20rpx rgba(255, 255, 255, 0.3);
  }
}

.count-wrapper {
  display: flex;
  justify-content: center;
  gap: 40rpx;
  margin-top: 40rpx;
  width: 100%;

  .count-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .count-num {
      color: #fff;
      font-size: 36rpx;
      font-weight: bold;
      line-height: 1.2;
    }
    .count-label {
      color: #888;
      font-size: 24rpx;
      margin-top: 8rpx;
    }
  }
}
</style>