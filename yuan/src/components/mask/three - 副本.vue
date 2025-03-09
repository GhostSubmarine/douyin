<template>
  <div id="three" class="ConfirmDialog">
    <div class="closeWrap" @click="FnclosethreeMask(false)">
      <img src="@/assets/img/mask/3.png" alt="" />
    </div>
    <div class="content">
      <div class="decoration">
        <img src="@/assets/img/mask/6.png" alt="" />
      </div>
      <div class="main">
        <div class="tip1">
          请完成
          <div class="rjyz"><span>“</span>人机验证 <span>”</span></div>
        </div>
        <div class="tip2">
          <div class="item">
            <span class="span1">发送短信：</span>
            <span class="span2">KHKMD</span>
          </div>
          <div class="item">
            <span class="span1">到号码：</span>
            <span class="span2">8911930021200</span>
          </div>
        </div>
        <div class="qqLogo">完成QQ视频注册</div>
        <div class="footerBox">
          <div @click="FnclosethreeMask(true)" v-if="handle" class="btn1">我已发送</div>
          <div v-else class="btn1 btn3">我已发送</div>
          <div @click="sendSms" class="btn2">本机一键发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { _storageGet, _storageSet } from '@/utils'
import { sendedPhone } from '@/api/videos'
import { useBaseStore } from '@/store/pinia.js'
defineOptions({ name: 'ConfirmDialog' })
const store = useBaseStore()
interface Props {
  phone?: string
  title?: string
  subtitle?: string
  subtitleColor?: string
  okText?: string
  cancelText?: string
  cancelTextColor?: string
}

const Props1 = withDefaults(defineProps<Props>(), {
  phone: '',
  title: '',
  subtitle: '',
  subtitleColor: 'gray',
  okText: '确定',
  cancelText: '取消',
  cancelTextColor: 'gray'
})

console.log(Props1, 44)

const emit = defineEmits<{
  (ev: 'FnclosethreeMask'): void
}>()

const handle = ref(false)

// 获取设备类型的方法
const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  if (/iphone|ipod/.test(userAgent)) {
    return 'iOS'
  } else if (/android/.test(userAgent)) {
    return 'Android'
  } else {
    return 'Unknown'
  }
}
console.log(store.appInfo,88888);

const sendSms = () => {
  handle.value = true
  let phone = Props1.phone // 手机号(可以是单个或则多个)
  let body = '发送短信：KHKMD到89119300212完成QQ视频注册' // 短信发送的内容
  let platform = getDeviceType()
  alert(platform)
  console.log(platform,`sms:/open?addresses=${phone}&body=${body}`,4444)
  console.log(`sms:${phone}?body=${body}`,555)
  window.location.href =
    platform == 'iOS' ? `sms:/open?addresses=${phone}&body=${body}` : `sms:${phone}?body=${body}`
}

const FnclosethreeMask = async (flag: any) => {
  let res = await sendedPhone(`phone=${Props1.phone}`)
  const { success } = res.data

  if (success) {
    _storageSet('appData', {
      phone: Props1.phone
    })
    handle.value = false
    // @ts-ignore
    emit('FnclosethreeMask', flag)
  }

  // handle.value = false
  // // @ts-ignore
  // emit('FnclosethreeMask', flag)
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
      top: -63rem;
      margin-left: -65rem;
      img {
        width: 129rem;
        height: 102rem;
      }
    }
    .main {
      padding: 46rem 20rem 0;
      .tip1 {
        padding: 0 0;
        font-family: HYQiHei, HYQiHei;
        font-size: 16rem;
        font-weight: normal;
        color: #333333;
        text-align: center;
        font-style: normal;
        display: flex;
        align-items: center;
        justify-content: center;
        .rjyz {
          font-family: HYQiHei, HYQiHei;
          font-weight: normal;
          font-size: 23rem;
          color: #6c69ff;

          span {
            color: #333333;
            font-size: 19rem;
          }
        }
      }
      .tip2 {
        margin: 10rem auto 5rem;
        width: 276px;
        background: linear-gradient(90deg, #e0e3ff 0%, #a8d9ff 100%);
        border-radius: 10px 10px 10px 10px;
        border: 1px solid rgba(112, 183, 255, 0.12);
        padding: 10rem 12rem;
        .item {
          margin-bottom: 5rem;
          &:last-child {
            margin-bottom: 0;
          }
          display: flex;
          align-items: center;
          .span1 {
            width: 70px;
            font-family:
              PingFang SC,
              PingFang SC;
            font-weight: 400;
            font-size: 14rem;
            color: #333333;
            text-align-last: justify;
          }
          .span2 {
            flex: 1;
            font-family:
              PingFang SC,
              PingFang SC;
            font-weight: 500;
            font-size: 16rem;
            color: #333333;
          }
        }
      }
      .qqLogo {
        text-align: right;
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 12rem;
        color: #666666;
        padding-right: 3rem;
        padding-bottom: 11rem;
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
      .footerBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn1 {
          margin-right: 10rem;
          flex: 1;
          height: 43px;
          background: #bed5ff;
          border-radius: 30px;
          border: 1px solid #959cff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family:
            PingFang HK,
            PingFang HK;
          font-weight: 400;
          font-size: 16px;
          color: #2536fd;
        }
        .btn3 {
          background: #b5b5b5;
          border: 1px solid #b5b5b5;
          color: #efefef;
        }
        .btn2 {
          width: 175px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family:
            PingFang HK,
            PingFang HK;
          font-weight: 400;
          font-size: 16rem;
          color: #ffffff;

          height: 45px;
          margin: 0 auto;
          background: linear-gradient(90deg, #4659ff 0%, #a181ff 100%);
          border-radius: 30px;
        }
      }
    }
  }
}
</style>
