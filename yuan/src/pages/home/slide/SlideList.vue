<template>
  <SlideVerticalInfinite
    ref="listRef"
    v-model:index="state.index"
    v-love="props.uniqueId"
    :id="props.uniqueId"
    :list="state.list"
    :render="render"
    :uniqueId="props.uniqueId"
    :active="props.active"
    :loading="baseStore.loading"
    name="infinite"
    @loadMore="loadMore"
    @refresh="() => getData(true)"
  />
</template>

<script setup lang="jsx">
import SlideVerticalInfinite from '@/components/slide/SlideVerticalInfinite.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import bus, { EVENT_KEY } from '@/utils/bus'
import { useBaseStore } from '@/store/pinia'
import { slideItemRender } from '@/utils'

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
  },
  api: {
    type: Function,
    default: void 0
  },
  index: {
    type: Number,
    default: 0
  },
  list: {
    type: Array,
    default() {
      return []
    }
  },
  uniqueId: {
    type: String,
    default() {
      return 'uniqueId1'
    }
  }
})

const baseStore = useBaseStore()

const p = {
  onShowComments() {
    console.log('onShowComments')
  }
}

const render = slideItemRender({ ...props.cbs, ...p })
const listRef = ref(null)
const state = reactive({
  index: props.index,
  list: props.list,
  totalSize: 0,
  pageSize: 7
})

function loadMore() {
  console.log('load')
  if (!baseStore.loading) {
    // getData()
  }
}

async function getData(refresh = false) {
  if (!refresh && state.totalSize === state.list.length) return
  if (baseStore.loading) return
  baseStore.loading = true
  let res = await props.api({
    start: refresh ? 0 : state.list.length,
    pageSize: state.pageSize
  })
  const { data, success } = res.data
  const response = {
    success: success,
    data: {
      total: data.num,
      list: data.map((item) => {
        return {
          ...item,
          aweme_id: item.vid,
          desc: item.title,
          create_time: item.timestamp,
          _city: res.data.city,
          _address: item.address,
          _distance: `${(Math.random() * 8).toFixed(1)}km`,
          statistics: {
            admire_count: item.admire_count,
            comment_count: item.comments,
            digg_count: item.like,
            collect_count: item.collection,
            play_count: item.play_count,
            share_count: item.share_count
          },
          // 图片处理
          video: {
            play_addr: {
              url_list: [item.video]
            }
          },
          author: {
            nickname: item.nickname,
            avatar_168x168: {
              height: 720,
              uri: '',
              url_list: [item.avatar],
              width: 720
            }
          }
        }
      })
    }
  }

  if (props.uniqueId === 'hot') {
    response.data.list.forEach((item) => {
      item.city = item._city
      // item.address = item._address
      item.distance = item._distance
    })
  }

  // console.log('response: ', response)

  // console.log('getSlide4Data-', refresh, response, state.totalSize, state.list.length)
  baseStore.loading = false
  if (response.success) {
    state.totalSize = response.data.total
    if (refresh) {
      state.list = []
    }

    if (props.uniqueId === 'live') {
      state.list = [response.data.list[0]]
    } else {
      state.list = state.list.concat(response.data.list)
    }
  }
}

// function dislike() {
//   listRef.value.dislike(state.list[1])
//   state.list[state.index] = state.list[1]
//   _notice('操作成功，将减少此类视频的推荐')
// }

// function end() {
//   // _notice('暂时没有更多了')
// }

function click(uniqueId) {
  if (!props.active) return
  if (uniqueId !== props.uniqueId) return
  bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
    uniqueId,
    index: state.index,
    type: EVENT_KEY.ITEM_TOGGLE
  })
}

function updateItem({ position, item }) {
  if (position.uniqueId === props.uniqueId) {
    state.list[position.index] = item
  }
}

function togglePlay() {
  if (!props.active) return
  bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
    uniqueId: props.uniqueId,
    index: state.index,
    type: EVENT_KEY.ITEM_TOGGLE
  })
}

onMounted(() => {
  bus.on(EVENT_KEY.SINGLE_CLICK, click)
  bus.on(EVENT_KEY.UPDATE_ITEM, updateItem)
  bus.on(EVENT_KEY.TOGGLE_CURRENT_VIDEO, togglePlay)
})
onUnmounted(() => {
  bus.off(EVENT_KEY.SINGLE_CLICK, click)
  bus.off(EVENT_KEY.UPDATE_ITEM, updateItem)
  bus.off(EVENT_KEY.TOGGLE_CURRENT_VIDEO, togglePlay)
})
</script>
