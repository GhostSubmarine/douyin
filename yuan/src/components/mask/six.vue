<template>
  <div class="ConfirmDialog">
    <div class="content">
      <div class="main">
        

        <div class="progress-container">
          <!-- 进度条容器 -->
        
          <div @click="FnclosesixMask" class="sub">
            重新提交
            <span v-if="countdown">（{{ countdown }}s）</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ConfirmDialog' })
import { ref, onMounted, onBeforeUnmount } from 'vue'
interface Props {
  title?: string
  subtitle?: string
  subtitleColor?: string
  okText?: string
  cancelText?: string
  cancelTextColor?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  subtitleColor: 'gray',
  okText: '确定',
  cancelText: '取消',
  cancelTextColor: 'gray'
})

const emit = defineEmits<{
  (ev: 'FnclosesixMask'): void
}>()

const countdown = ref(2) // 初始化倒计时为120秒
let timer = null // 用于存储定时器
// 启动倒计时
const startCountdown = () => {
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer) // 倒计时结束，清除定时器
    }
  }, 1000) // 每秒减少一次
}

const progress = ref(0) // 进度条的进度
const gradient = ref('linear-gradient( 90deg, #4659FF 0%, #AE91FF 100%)') // 进度条渐变色

// 更新进度条的函数
const updateProgress = () => {
  let start = Date.now() // 获取开始时间
  let duration = 2000 // 设置动画持续时间为 2 秒

  const interval = setInterval(() => {
    let elapsed = Date.now() - start // 计算已过时间
    let progressPercentage = (elapsed / duration) * 100 // 计算当前进度
    progress.value = Math.min(progressPercentage, 100) // 限制进度最大为 100%

    if (progress.value === 100) {
      clearInterval(interval) // 动画完成后清除定时器
    }
  }, 16) // 每 16 毫秒更新一次（约 60fps）
}

// 在组件挂载时开始进度条动画
onMounted(() => {
  startCountdown()
  updateProgress()
})

// 在组件卸载前清除定时器
onBeforeUnmount(() => {
  clearInterval(timer)
})

const FnclosesixMask = () => {
  if (countdown.value == 0) {
    emit('FnclosesixMask', true)
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

/* 进度条外容器 */
.progress-container {
  // width: 100%;
  // max-width: 400px;
  // margin: 20px auto;
  width: 300rem;
  height: 43rem;
  text-align: center;
  line-height: 43rem;
  margin: 0 auto;
  background: linear-gradient(90deg, #9b9b9b 0%, #b5b5b5 100%);
  border-radius: 30px;
  font-family:
    PingFang HK,
    PingFang HK;
  font-weight: 400;
  font-size: 16rem;
  color: #ffffff;
  position: relative;
  .sub {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
}

/* 进度条底色 */
.progress-bar-background {
  width: 300rem;
  height: 43rem;
  text-align: center;
  line-height: 43rem;
  margin: 0 auto;
  background: linear-gradient(90deg, #9b9b9b 0%, #b5b5b5 100%);
  border-radius: 30px; /* 设置圆角 */
  overflow: hidden; /* 超出部分隐藏，保持圆角 */
}

/* 进度条的前景 */
.progress-bar {
  height: 100%; /* 高度填满容器 */
  border-radius: 30px; /* 设置进度条本身的圆角 */
  transition: width 0.1s ease; /* 动画过渡效果 */
}
.ConfirmDialog {
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 12rem;
  left: 0;
  right: 0;
  background: #000000bb;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  color: black;
  .closeWrap {
    width: 345rem;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 19rem;
    img {
      width: 25rem;
      height: 25rem;
    }
  }
  .content {
    position: relative;
    width: 345rem;
    height: 152rem;
    background: linear-gradient(135deg, #e7e8ff 12%, #f5f7fe 37%, #c6ebff 58%, #e0d5fd 100%);
    border-radius: 10rem;

    .main {
      padding: 35rem 20rem 0;
      .qqLogo {
        margin-bottom: 30rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 14rem;
        color: #333333;
        img {
          width: 23rem;
          height: 23rem;
          margin-right: 10rem;
        }
      }
      // .btn {
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      //   font-family:
      //     PingFang HK,
      //     PingFang HK;
      //   font-weight: 400;
      //   font-size: 16rem;
      //   color: #ffffff;
      //   width: 300rem;
      //   height: 43rem;
      //   margin: 0 auto;
      //   background: linear-gradient( 90deg, #9B9B9B 0%, #B5B5B5 100%);
      //   border-radius: 60px 60px 60px 60px;
      // }
    }

    .footer {
      height: 46rem;
      display: flex;
      border-top: 1px solid whitesmoke;
      font-size: 14rem;

      .cancel,
      .ok {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 49%;
      }

      .ok {
        font-weight: bold;
      }

      .cancel {
        border-right: 1px solid whitesmoke;

        &.gray {
          color: var(--second-text-color);
        }
      }
    }
  }
}
</style>
