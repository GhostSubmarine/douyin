<template>
  <div v-if="visible" id="one" class="ConfirmDialog">
    <div class="closeWrap" @click.stop="closeMask(false)">
      <img src="@/assets/img/mask/3.png" alt="" />
    </div>
   
  </div>
</template>

<script setup lang="ts">
import { useBaseStore } from '@/store/pinia'
import { watch } from 'vue'
defineOptions({ name: 'ConfirmDialog' })

const store = useBaseStore()

interface Props {
  title?: string
  subtitle?: string
  subtitleColor?: string
  okText?: string
  cancelText?: string
  cancelTextColor?: string
}

withDefaults(defineProps<Props>(), {
  show: false,
  title: '',
  subtitle: '',
  subtitleColor: 'gray',
  okText: '确定',
  cancelText: '取消',
  cancelTextColor: 'gray'
})

const visible = defineModel<boolean>('visible', { type: Boolean, default: false })

const emit = defineEmits<{
  (ev: 'FncloseMask', data?): void
}>()

watch(
  () => visible.value,
  (value) => {
    store.setIsLoginModalOpen(value)
  }
)

const closeMask = (flag: boolean) => {
  visible.value = false
  emit('FncloseMask', flag)
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
      top: -90rem;
      margin-left: -105rem;
      img {
        width: 210px;
        height: 143px;
      }
    }
    .main {
      padding: 50rem 20rem 0;
      .tip1 {
        padding: 12rem 0;
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 14rem;
        color: #333333;
        text-align: center;
        font-style: normal;
      }
      .tip2 {
        font-family: HYQiHei, HYQiHei;
        font-weight: normal;
        font-size: 21rem;
        color: #333333;
        text-align: center;
        font-style: normal;
      }
      .qqLogo {
        margin: 20rem 0;
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
          width: 27rem;
          height: 27rem;
          margin-right: 6rem;
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
