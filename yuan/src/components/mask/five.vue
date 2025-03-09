<template>
  <div id="five" class="ConfirmDialog">
    <div class="content">
      <div class="decoration">
        <img src="@/assets/img/mask/8.png" alt="" />
      </div>
      <div class="main">
      
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bus, { EVENT_KEY } from '@/utils/bus'
import { ref, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import { _storageGet, _storageSet } from '@/utils'
import { useBaseStore } from '@/store/pinia'

const store = useBaseStore()

defineOptions({ name: 'ConfirmDialog' })

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
  (ev: 'FnclosefiveMask'): void
}>()

// const countdown = ref(120) // 初始化倒计时为120秒
const countdown = ref(parseInt(store.appInfo?.data?.countdown, 10) || 120) // 初始化倒计时为120秒
let timer = null // 用于存储定时器
// 启动倒计时
const startCountdown = () => {
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer) // 倒计时结束，清除定时器
      emit('FnclosefiveMask', true)
    }
  }, 1000) // 每秒减少一次
}

const unload = () => {
  const now = Date.now()
  const appData = _storageGet('appData')

  if (!appData.lastClosedTime) {
    _storageSet('appData', {
      ...appData,
      origin: 'five',
      lastClosedTime: now
    })
  }
}

// 在组件挂载时启动倒计时
onMounted(() => {
  unload()
  bus.on(EVENT_KEY.START_COUNTDOWN, (count) => {
    countdown.value = count
  })
  window.addEventListener('beforeunload', unload)

  startCountdown()
})

onUnmounted(() => {
  // bus.off(EVENT_KEY.START_COUNTDOWN)
})

// 在组件卸载前清除定时器
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', unload)
  clearInterval(timer)
})
</script>

<style scoped lang="less">
@import '../../assets/less/index';

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
  .loader {
    display: flex;
    font-size: 21px; /* 根据需要调整字体大小 */
    white-space: nowrap; /* 防止小黑点换行 */
  }

  .loader span {
    display: flex;
    animation: blink 1.4s infinite; /* 应用动画 */
  }

  /* 定义动画 */
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    } /* 完全不透明 */
    50% {
      opacity: 0.2;
    } /* 完全透明 */
  }

  /* 为每个小黑点指定不同的动画延迟 */
  .loader span:nth-child(1) {
    animation-delay: 0s;
  }
  .loader span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .loader span:nth-child(3) {
    animation-delay: 0.4s;
  }
  .content {
    position: relative;
    width: 345rem;
    height: 355rem;
    background: linear-gradient(135deg, #e7e8ff 12%, #f5f7fe 37%, #c6ebff 58%, #e0d5fd 100%);
    border-radius: 10rem;
    .decoration {
      position: absolute;
      left: 50%;
      top: -72rem;
      margin-left: -72rem;
      img {
        width: 144px;
        height: 108px;
      }
    }
    .main {
      padding: 40rem 20rem 0;
      .tip1 {
        padding: 5rem 0 0;
        font-family: TencentSans;
        font-weight: bold;
        font-size: 21px;
        color: #6c69ff;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding-left: 20px;
      }
      .tip2 {
        font-family: HYQiHei, HYQiHei;
        font-weight: bold;
        font-size: 32px;
        color: #5760ff;
        background: url('../../assets//img/mask/9.png') no-repeat;
        background-size: cover;
        width: 117px;
        height: 117px;
        margin: 8px auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .qqLogo {
        margin: -8px auto 26px;
        width: 232px;
        align-items: center;
        justify-content: center;
        padding: 5px 0 5px 15px;
        background: linear-gradient(90deg, #e0e3ff 0%, #a8d9ff 100%);
        border-radius: 40px 40px 40px 40px;
        border: 1px solid rgba(112, 183, 255, 0.12);

        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #333333;
      }
      .wait {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #333333;
      }
      .not {
        margin-top: 10px;
        display: flex;
        align-items: center;
        width: 300px;
        height: 30px;
        background: rgba(255, 148, 136, 0.3);
        border-radius: 10px 10px 10px 10px;
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #ff4141;

        img {
          margin: 0 5px 0 15px;
          width: 17px;
          height: 17px;
        }
      }
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
