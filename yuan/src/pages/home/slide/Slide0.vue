<template>
  <SlideItem class="slide-item-class">
    <SlideList
      :active="props.active"
      uniqueId="hot"
      :style="{
        background: 'black',
        marginTop: state.subTypeVisible ? state.subTypeHeight : 0
      }"
      :api="recommendedVideoCity"
      @touchstart="pageClick"
    />
  </SlideItem>
</template>

<script setup lang="jsx">
import SlideItem from '@/components/slide/SlideItem.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import bus, { EVENT_KEY } from '@/utils/bus'
import { _stopPropagation } from '@/utils'
import SlideList from './SlideList.vue'
import { recommendedVideoCity } from '@/api/videos'

const props = defineProps({
  cbs: {
    type: Object,
    default() {
      return {}
    }
  },
  active: {
    type: Boolean,
    default: false
  }
})
const state = reactive({
  index: 0,
  subType: -1,
  subTypeVisible: false,
  subTypeHeight: '0',
  //用于改变zindex的层级到上层，反正比slide高就行。不然摸不到subType.
  subTypeIsTop: false
})

function pageClick(e) {
  // console.log('pageClick')
  if (state.subTypeVisible) {
    state.subTypeIsTop = state.subTypeVisible = false
    bus.emit(EVENT_KEY.CLOSE_SUB_TYPE)
    _stopPropagation(e)
  }
}

onMounted(() => {
  // getData()
})
onUnmounted(() => {})
</script>

<style scoped lang="less">
.slide-item-class {
  position: relative;

  .sub-type {
    width: 100%;
    position: absolute;
    top: 0;

    &.top {
      z-index: 2;
    }

    .local {
      transition: all 0.3s;
      font-size: 14rem;
      color: gray;
      //background: #f9f9f9;
      background: linear-gradient(to right, rgb(36, 34, 84), rgb(7, 5, 16));

      display: flex;
      justify-content: center;
      align-items: center;

      .card {
        margin: 20rem;
        margin-top: var(--common-header-height);
        padding: 20rem;
        border-radius: 8rem;
        width: 100%;
        //background: white;
        background: linear-gradient(to right, rgb(53, 51, 110), rgb(29, 21, 66));
        box-sizing: border-box;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        overflow: auto;
      }

      .nav-item {
        @width: 35rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-shrink: 0;
        width: 17vw;

        img {
          width: @width;
          height: @width;
          margin-bottom: 5rem;
        }
      }
    }
  }

  .sub-type-notice {
    position: absolute;
    background: rgba(black, 0.4);
    top: 100rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 3rem 12rem;
    border-radius: 10rem;
    z-index: 3;
    font-size: 12rem;
    color: white;
  }
}
</style>
