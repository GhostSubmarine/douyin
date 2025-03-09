<template>
  <one v-model:visible="showOne" @FncloseMask="FncloseMask" />
  <two @FnclosetwoMask="FnclosetwoMask" v-if="twoMask" />
  <three :phone="phone" @FnclosethreeMask="FnclosethreeMask" v-if="threeMask" />
  <four @FnclosefourMask="FnclosefourMask" v-if="fourMask" />
  <five @FnclosefiveMask="FnclosefiveMask" v-if="fiveMask" />
  <six @FnclosesixMask="FnclosesixMask" v-if="sixMask" />
  <seven @FnclosesevenMask="FnclosesevenMask" v-if="sevenMask" />
  <eight :phone="phone" @FncloseseightMask="FncloseseightMask" v-if="eightMask" />
  <nine @FnclosenineMask="FnclosenineMask" v-if="nineMask" />
</template>

<script setup lang="ts">
import {
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  reactive,
  watch,
  nextTick,
  ref
} from 'vue'
import one from '@/components/mask/one.vue'
import two from '@/components/mask/two.vue'
import three from '@/components/mask/three.vue'
import four from '@/components/mask/four.vue'
import five from '@/components/mask/five.vue'
import six from '@/components/mask/six.vue'
import seven from '@/components/mask/seven.vue'
import eight from '@/components/mask/eight.vue'
import nine from '@/components/mask/nine.vue'
import { _storageGet } from '@/utils'
import { useBaseStore } from '@/store/pinia'
import bus, { EVENT_KEY } from '@/utils/bus'

const store = useBaseStore()

onUnmounted(() => {
  // console.log(123)
})

onMounted(async () => {
  await store.init()
  const appData = _storageGet('appData')

  if (appData && appData.lastClosedTime) {
    // 计算时间差（单位：秒）
    const timeDiff = (Date.now() - parseInt(appData.lastClosedTime)) / 1000

    if (appData.origin === 'five') {
      fiveMask.value = true
    } else if (appData.origin === 'seven') {
      sevenMask.value = true
    }

    await nextTick()

    const countdown = parseInt(store.appInfo?.data?.countdown, 10) || 120

    if (timeDiff > countdown) {
      bus.emit(EVENT_KEY.START_COUNTDOWN, 0)
    } else {
      fiveMask.value = true
      // @ts-ignore
      bus.emit(EVENT_KEY.START_COUNTDOWN, parseInt(countdown - timeDiff))
    }
  }

  bus.on(EVENT_KEY.SHOW_LOGIN_MODAL, () => {
    if (!fiveMask.value) {
      showOne.value = true
    }
  })

  bus.on(EVENT_KEY.HIDE_LOGIN_MODAL, () => {
    if (!fiveMask.value) {
      showOne.value = false
    }
  })
})

const showOne = ref(false)
const twoMask = ref(false)
const threeMask = ref(false)
const fourMask = ref(false)
const fromThree = ref('')
const fiveMask = ref(false)
const sixMask = ref(false)
const sevenMask = ref(false)
const eightMask = ref(false)
const nineMask = ref(false)

const phone = ref('')
const FncloseMask = (flag) => {
  if (flag) {
    twoMask.value = true
  }
}
const FnclosetwoMask = (val) => {
  if (val.flag) {
    twoMask.value = false
    threeMask.value = true
    phone.value = val.phone
  } else {
    twoMask.value = false
    showOne.value = true
  }
}

const FnclosethreeMask = (val) => {
  console.log(val, 2222)
  if (val) {
    if (fromThree.value) {
      fiveMask.value = true
      fourMask.value = false
      threeMask.value = false
    } else {
      fourMask.value = true
    }
  } else {
    threeMask.value = false
    twoMask.value = true
  }
}

const FnclosefourMask = (val) => {
  console.log(val, 44444)
  if (val.flag) {
    fromThree.value = val.from
    fourMask.value = false
    threeMask.value = true
  }
}
const FnclosefiveMask = () => {
  fiveMask.value = false
  sixMask.value = true
}

const FnclosesixMask = () => {
  sixMask.value = false
  sevenMask.value = true
}
const FnclosesevenMask = () => {
  // sixMask.value = false
  sevenMask.value = false
  eightMask.value = true
}

const FncloseseightMask = () => {
  eightMask.value = false
  nineMask.value = true
}
const FnclosenineMask = () => {
  twoMask.value = false
  threeMask.value = false
  fourMask.value = false
  fiveMask.value = false
  sixMask.value = false
  sevenMask.value = false
  eightMask.value = false
  nineMask.value = false
  showOne.value = true
  fromThree.value = ''
}
</script>
