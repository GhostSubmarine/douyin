<template>
  <div class="test-slide-wrapper" id="home-index">
    <SlideHorizontal name="first" v-model:index="state.baseIndex">
      <SlideItem>
        <IndicatorHome
          v-if="!state.fullScreen"
          :loading="baseStore.loading"
          name="second"
          v-model:index="state.navIndex"
        />
        <SlideHorizontal
          class="first-horizontal-item"
          name="second"
          :change-active-index-use-anim="false"
          v-model:index="state.navIndex"
        >
          <Slide4 :active="state.navIndex === 0 && state.baseIndex === 0" />
          <SlideItem>
            <Slide0 :active="state.navIndex === 1 && state.baseIndex === 0" />
          </SlideItem>
          <Slide2 :active="state.navIndex === 2 && state.baseIndex === 0" />
        </SlideHorizontal>

        <BaseFooter v-bind:init-tab="1" />
      </SlideItem>

      <!-- <SlideItem>
        <UserPanel
          ref="uploader"
          v-model:currentItem="state.currentItem"
          :active="state.baseIndex === 1"
          @toggleCanMove="(e) => (state.canMove = e)"
          @back="state.baseIndex = 0"
          @showFollowSetting="state.showFollowSetting = true"
          @showFollowSetting2="state.showFollowSetting2 = true"
        />
      </SlideItem> -->
    </SlideHorizontal>

    <Comment
      page-id="home-index"
      :video-id="state.currentItem.aweme_id"
      v-model="state.commentVisible"
      @close="closeComments"
    />

    <Share
      v-model="state.isSharing"
      ref="share"
      page-id="home-index"
      @dislike="dislike"
      :item="state.currentItem"
      :videoId="state.recommendList[state.itemIndex]?.id"
      :canDownload="state.recommendList[state.itemIndex]?.canDownload"
      @play-feedback="state.showPlayFeedback = true"
      @shareToFriend="delayShowDialog(() => (state.shareToFriend = true))"
      @showDouyinCode="state.showDouyinCode = true"
      @download="state.shareType = 9"
    />

    <PlayFeedback v-model="state.showPlayFeedback" />

    <DouyinCode :item="state.currentItem" v-model="state.showDouyinCode" />

    <ShareTo
      v-model:type="state.shareType"
      :videoId="state.recommendList[state.itemIndex]?.id"
      :canDownload="state.recommendList[state.itemIndex]?.canDownload"
    />

    <FollowSetting
      v-model:currentItem="state.currentItem"
      @showChangeNote="delayShowDialog((e) => (state.showChangeNote = true))"
      @showBlockDialog="delayShowDialog((e) => (state.showBlockDialog = true))"
      @showShare="delayShowDialog((e) => (state.isSharing = true))"
      v-model="state.showFollowSetting"
    />

    <FollowSetting2
      v-model:currentItem="state.currentItem"
      @cancelFollow="uploader.cancelFollow()"
      v-model="state.showFollowSetting2"
    />

    <BlockDialog v-model="state.showBlockDialog" />

    <ConfirmDialog title="设置备注名" ok-text="确认" v-model:visible="state.showChangeNote">
      <Search mode="light" v-model="state.test" :isShowSearchIcon="false" />
    </ConfirmDialog>

    <ShareToFriend v-model="state.shareToFriend" />

    <!-- <BaseMask v-if="!isMobile" @click="isMobile = true" /> -->

    <!-- <one />
    <two />
    <three />
    <four />
    <five />
    <six /> 
    <seven />
    <eight />
    <nine />-->
    <one @FncloseMask="FncloseMask" v-if="oneMask" />
    <two @FnclosetwoMask="FnclosetwoMask" v-if="twoMask" />
    <three :phone="phone" @FnclosethreeMask="FnclosethreeMask" v-if="threeMask" />
    <four @FnclosefourMask="FnclosefourMask" v-if="fourMask" />
    <five @FnclosefiveMask="FnclosefiveMask" v-if="fiveMask" />
    <six @FnclosesixMask="FnclosesixMask" v-if="sixMask" />
    <seven @FnclosesevenMask="FnclosesevenMask" v-if="sevenMask" />
    <eight :phone="phone" @FncloseseightMask="FncloseseightMask" v-if="eightMask" />
    <nine @FnclosenineMask="FnclosenineMask" v-if="nineMask" />
  </div>
</template>

<script setup lang="tsx">
import SlideHorizontal from '@/components/slide/SlideHorizontal.vue'
import SlideItem from '@/components/slide/SlideItem.vue'
import Comment from '../../components/Comment.vue'
import Share from '../../components/Share.vue'
import IndicatorHome from './components/IndicatorHome.vue'
import { onActivated, onDeactivated, onMounted, onUnmounted, reactive, ref } from 'vue'
import bus, { EVENT_KEY } from '../../utils/bus'
import { useNav } from '@/utils/hooks/useNav'
import PlayFeedback from '@/pages/home/components/PlayFeedback.vue'
import ShareTo from '@/pages/home/components/ShareTo.vue'
import DouyinCode from '../../components/DouyinCode.vue'
import FollowSetting from '@/pages/home/components/FollowSetting.vue'
import BlockDialog from '../message/components/BlockDialog.vue'
import Search from '../../components/Search.vue'
import ConfirmDialog from '../../components/dialog/ConfirmDialog.vue'
import FollowSetting2 from '@/pages/home/components/FollowSetting2.vue'
import ShareToFriend from '@/pages/home/components/ShareToFriend.vue'
// import UserPanel from '@/components/UserPanel.vue'
// import Community from '@/pages/home/slide/Community.vue'
import Slide0 from '@/pages/home/slide/Slide0.vue'
import Slide2 from '@/pages/home/slide/Slide2.vue'
import Slide4 from '@/pages/home/slide/Slide4.vue'
import { DefaultUser } from '@/utils/const_var'
// import { _no } from '@/utils'
// import LongVideo from '@/pages/home/slide/LongVideo.vue'
import { useBaseStore } from '@/store/pinia'
// import BaseMask from '@/components/BaseMask.vue'

import one from '../../components/mask/one.vue'
import two from '../../components/mask/two.vue'
import three from '../../components/mask/three.vue'
import four from '../../components/mask/four.vue'
import five from '../../components/mask/five.vue'
import six from '../../components/mask/six.vue'
import seven from '../../components/mask/seven.vue'
import eight from '../../components/mask/eight.vue'
import nine from '../../components/mask/nine.vue'

const oneMask = ref(true)
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
  oneMask.value = false

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
    oneMask.value = true
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
  oneMask.value = true
  fromThree.value = ''
}

const nav = useNav()
const baseStore = useBaseStore()
const uploader = ref()
// const isMobile = ref(/Mobi|Android|iPhone/i.test(navigator.userAgent))

const state = reactive({
  active: true,
  baseIndex: 0,
  navIndex: 0,
  itemIndex: 0,
  test: '',
  recommendList: [],
  isSharing: false,
  canMove: true,
  shareType: -1,
  showPlayFeedback: false,
  showShareDuoshan: false,
  showShareDialog: false,
  showShare2WeChatZone: false,
  showDouyinCode: false,
  showFollowSetting: false,
  showFollowSetting2: false,
  showBlockDialog: false,
  showChangeNote: false,
  shareToFriend: false,

  commentVisible: false,
  fullScreen: false,
  currentItem: {
    aweme_id: '',
    author: DefaultUser,
    isRequest: false,
    aweme_list: []
  }
})

function delayShowDialog(cb: Function) {
  setTimeout(cb, 400)
}

function setCurrentItem(item) {
  if (!state.active) return
  // console.log('sss',item,state.baseIndex)
  if (state.baseIndex !== 0) return
  if (state.currentItem.author?.uid !== item.author?.uid) {
    state.currentItem = {
      ...item,
      isRequest: false,
      aweme_list: []
    }
  }
  // console.log('item', item)
}

onMounted(() => {
  bus.on(EVENT_KEY.ENTER_FULLSCREEN, () => {
    if (!state.active) return
    state.fullScreen = true
  })
  bus.on(EVENT_KEY.EXIT_FULLSCREEN, () => {
    if (!state.active) return
    state.fullScreen = false
  })
  bus.on(EVENT_KEY.OPEN_COMMENTS, () => {
    if (!state.active) return
    bus.emit(EVENT_KEY.ENTER_FULLSCREEN)
    state.commentVisible = true
  })
  bus.on(EVENT_KEY.CLOSE_COMMENTS, () => {
    if (!state.active) return
    bus.emit(EVENT_KEY.EXIT_FULLSCREEN)
    state.commentVisible = false
  })
  bus.on(EVENT_KEY.SHOW_SHARE, () => {
    if (!state.active) return
    state.isSharing = true
  })
  bus.on(EVENT_KEY.NAV, ({ path, query }) => {
    if (!state.active) return
    nav(path, query)
  })
  bus.on(EVENT_KEY.GO_USERINFO, () => {
    if (!state.active) return
    state.baseIndex = 1
  })
  bus.on(EVENT_KEY.CURRENT_ITEM, setCurrentItem)
})

onUnmounted(() => {
  bus.offAll()
})

onActivated(() => {
  state.active = true
  bus.emit(EVENT_KEY.TOGGLE_CURRENT_VIDEO)
})

onDeactivated(() => {
  state.active = false
  bus.emit(EVENT_KEY.TOGGLE_CURRENT_VIDEO)
})

function closeComments() {
  bus.emit(EVENT_KEY.CLOSE_COMMENTS)
}

function dislike() {
  // listRef.value.dislike(state.list[1])
  // state.list[state.index] = state.list[1]
  // _notice('操作成功，将减少此类视频的推荐')
}
</script>

<style scoped lang="less">
.test-slide-wrapper {
  font-size: 14rem;
  width: 100%;
  height: 100%;
  background: black;
  overflow: hidden;

  .sidebar {
    touch-action: pan-y;
    width: 80%;
    height: calc(var(--vh, 1vh) * 100);
    overflow: auto;
    background: rgb(22, 22, 22);
    padding: 10rem;
    padding-bottom: 20rem;
    box-sizing: border-box;

    & > .header {
      font-size: 16rem;
      display: flex;
      color: white;
      justify-content: space-between;
      align-items: center;

      .right {
        border-radius: 20rem;
        padding: 8rem 15rem;
        background: rgb(36, 36, 36);
        display: flex;
        align-items: center;
        font-size: 14rem;
        gap: 10rem;

        svg {
          font-size: 18rem;
        }
      }
    }

    .card {
      margin-top: 10rem;
      border-radius: 12rem;
      padding: 15rem;
      background: rgb(29, 29, 29);

      .header {
        margin-bottom: 8rem;
        font-size: 14rem;
        display: flex;
        color: white;
        justify-content: space-between;
        align-items: center;

        .right {
          display: flex;
          align-items: center;
          font-size: 12rem;
          gap: 4rem;
          color: gray;

          svg {
            font-size: 16rem;
          }
        }
      }

      .content {
        color: white;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        .item {
          min-height: 20vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 14rem;
          gap: 8rem;

          svg {
            font-size: 28rem;
          }

          .xcx {
            border-radius: 12rem;
            width: 50rem;
            height: 50rem;
          }
        }

        .avatar {
          height: 25vw;

          img {
            border-radius: 50%;
            width: 50rem;
          }
        }
      }
    }
  }

  .slide-content {
    width: 100%;
    height: 100%;
  }
}

.first-horizontal-item {
  //width: 90vw;
  //height: 80vh;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - var(--footer-height)) !important;
  overflow: hidden;
  // border-radius: 10rem;
}

.guide {
  color: white;
  z-index: 999;
  background: var(--active-main-bg);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16rem;
  overflow: hidden;
  text-align: center;

  .danger {
    margin-top: 10rem;
    font-size: 40rem;
    color: red;
  }

  .close {
    cursor: pointer;
    font-size: 18rem;
    color: white;
    position: absolute;
    right: 15rem;
    top: 15rem;
  }

  .txt {
    text-align: left;
    padding: 0 24rem;
  }

  img {
    display: block;
    width: 350rem;
  }
}
</style>
