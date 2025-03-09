<template>
  <div id="two" class="ConfirmDialog">
    <div class="closeWrap" @click="FnclosetwoMask(false)">
      <img src="@/assets/img/mask/3.png" alt="" />
    </div>
    <div class="content">
      <div class="decoration">
        <img src="@/assets/img/mask/4.png" alt="" />
      </div>
      <div class="main">
        
        <div class="phone">
          <input id="myInput" placeholder="请输入手机号" type="number" v-model="phone" />
        </div>
        <div @click="FnclosetwoMask(true)" class="btn">立即注册</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
  (ev: 'FnclosetwoMask'): void
}>()

const phone = ref('')

const FnclosetwoMask = (flag) => {
  if (flag) {
    if (!phone.value) {
      alert('请输入手机号')
      return
    }
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(phone.value)) {
      alert('请输入正确手机号')
      return
    }
  }

  emit('FnclosetwoMask', {
    flag,
    phone: phone.value
  })
}
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
  .content {
    position: relative;
    width: 345rem;
    height: 250rem;
    background: linear-gradient(135deg, #e7e8ff 12%, #f5f7fe 37%, #c6ebff 58%, #e0d5fd 100%);
    border-radius: 10rem;
    .decoration {
      position: absolute;
      left: 50%;
      top: -100rem;
      margin-left: -132rem;
      img {
        width: 263rem;
        height: 151rem;
      }
    }
    .main {
      padding: 50rem 20rem 0;
      .tip1 {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 14rem;
        color: #333333;
        text-align: center;
        line-height: 1;
      }
      .phone {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin: 0 auto 18rem;
        width: 300rem;
        height: 40rem;
        background: linear-gradient(90deg, #e0e3ff 0%, #a8d9ff 100%);
        border-radius: 10px 10px 10px 10px;
        border: 1px solid rgba(112, 183, 255, 0.12);
        input {
          display: block;
          border: none;
          resize: none;
          outline: none;
          width: 90%;
          margin: 0 auto;
          height: 95%;
          background: none;
        }

        #myInput::placeholder {
          font-family:
            PingFang HK,
            PingFang HK;
          font-weight: 400;
          font-size: 14rem;
          color: #666ebe;
        }

        #myInput::-webkit-input-placeholder {
          font-family:
            PingFang HK,
            PingFang HK;
          font-weight: 400;
          font-size: 14rem;
          color: #666ebe;
        }

        #myInput:-moz-placeholder {
          font-family:
            PingFang HK,
            PingFang HK;
          font-weight: 400;
          font-size: 14rem;
          color: #666ebe;
        }

        #myInput:-ms-input-placeholder {
          font-family:
            PingFang HK,
            PingFang HK;
          font-weight: 400;
          font-size: 14rem;
          color: #666ebe;
        }
      }

      .qqLogo {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 14rem;
        color: #333333;
        margin: 5rem 0 16rem;
        img {
          width: 55rem;
          height: 43rem;
          margin-right: 6rem;
        }
        .day {
          font-family: HYQiHei, HYQiHei;
          font-weight: normal;
          font-size: 21rem;
          color: #6c69ff;
        }
        .desc {
          font-family: HYQiHei, HYQiHei;
          font-weight: normal;
          font-size: 16rem;
          margin-left: 18rem;
          color: #333333;
        }
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family:
          PingFang HK,
          PingFang HK;
        font-weight: 400;
        font-size: 16rem;
        color: #ffffff;
        width: 300rem;
        height: 43rem;
        margin: 0 auto;
        background: linear-gradient(90deg, #4659ff 0%, #a181ff 100%);
        border-radius: 60px 60px 60px 60px;
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
