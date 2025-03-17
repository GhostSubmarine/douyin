<template>
  <view class="action-bar">
    <!-- 点赞按钮 -->
    <view class="action-item" @click="handleLike">
      <view class="icon-wrapper" :class="{ active: isLiked }">
        <u-icon :name="isLiked ? 'heart-fill' : 'heart'" size="42" :color="isLiked ? '#FE2C55' : '#fff'"></u-icon>
      </view>
      <text class="count">{{ likeCount }}</text>
    </view>

    <!-- 评论按钮 -->
    <view class="action-item" @click="$emit('comment')">
      <view class="icon-wrapper">
        <u-icon name="chat" size="42" color="#fff"></u-icon>
      </view>
      <text class="count">{{ commentCount }}</text>
    </view>

    <!-- 收藏按钮 -->
    <view class="action-item" @click="$emit('collect')">
      <view class="icon-wrapper">
        <u-icon name="star" size="42" color="#fff"></u-icon>
      </view>
      <text class="count">{{ collectCount }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  likeCount: number
  commentCount: number
  collectCount: number
  isLiked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  likeCount: 0,
  commentCount: 0,
  collectCount: 0,
  isLiked: false
})
const emit = defineEmits(['like', 'comment', 'collect'])

const handleLike = () => {
  emit('like', !props.isLiked)
}
</script>

<style lang="less" scoped>
.action-bar {
  position: fixed;
  right: 24rpx;
  bottom: 160rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;

  .action-item {
    margin-bottom: 48rpx;
    text-align: center;

    .icon-wrapper {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8rpx;
      transition: transform 0.2s;

      &.active {
        animation: scaleIcon 0.3s ease;
      }
    }

    .count {
      color: #fff;
      font-size: 24rpx;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
    }
  }
}

@keyframes scaleIcon {
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
