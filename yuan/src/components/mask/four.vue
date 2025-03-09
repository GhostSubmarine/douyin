<template>
  <div id="four" class="ConfirmDialog">
    <div class="content">
      <div class="main">
        <div class="qqLogo">
          <img src="@/assets/img/mask/7.png" alt="" />
         
        </div>
        <div @click="FnclosefourMask(true)" class="btn">返回发送</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  (ev: 'FnclosefourMask'): void
}>()

const FnclosefourMask = (flag) => {
  emit('FnclosefourMask', {
    flag,
    from: 'back'
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
