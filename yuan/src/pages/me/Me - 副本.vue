<template>
  <div class="Me">
    <BaseFooter v-bind:init-tab="5" />
    <div class="topbgCont">
      <img class="imgbg" src="@/assets/img/me/bg.png" alt="" />
      <!-- <img class="topbg" src="@/assets/img/me/mask.png" alt="" /> -->
      <div class="topbg">
        <div class="qq">
          <img src="@/assets/img/me/deco.png" alt="" />
          <div class="word">QQ视频</div>
        </div>
        <div class="info">
          <div class="photo">
            <img src="@/assets/img/me/header.png" alt="" />
          </div>
          <div class="name">
            <div class="top">去登录</div>
            <div class="ids">暂未登录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="navs">
      <div class="item">
        <img src="@/assets/img/me/2.png" alt="" />
        <div>关注</div>
      </div>
      <div class="item">
        <img src="@/assets/img/me/3.png" alt="" />
        <div>收藏</div>
      </div>
      <div class="item">
        <img src="@/assets/img/me/1.png" alt="" />
        <div>喜欢</div>
      </div>
      <div class="item">
        <img src="@/assets/img/me/4.png" alt="" />
        <div>消息</div>
      </div>
    </div>
    <div class="content" style="margin-bottom: 100px;">
      
      <div class="row">
        <div class="left">
          <img src="@/assets/img/me/5.png" alt="" />
          <span>关于我们</span>
        </div>
        <div class="right">
          <img class="narrows" src="@/assets/img/me/9.png" alt="" />
          <!-- <dy-back direction="right"></dy-back> -->
        </div>
      </div>
      <div class="row" >
        <div class="left">
          <img src="@/assets/img/me/6.png" alt="" />
          <span>联系我们</span>
        </div>
        <div class="right">
          <img class="narrows" src="@/assets/img/me/9.png" alt="" />
          <!-- <dy-back direction="right"></dy-back> -->
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/me/7.png" alt="" />
          <span>意见反馈</span>
        </div>
        <div class="right">
          <img class="narrows" src="@/assets/img/me/9.png" alt="" />
          <!-- <dy-back direction="right"></dy-back> -->
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/me/8.png" alt="" />
          <span>系统设置</span>
        </div>
        <div class="right">
          <img class="narrows" src="@/assets/img/me/9.png" alt="" />
          <!-- <dy-back direction="right"></dy-back> -->
        </div>
      </div>
    </div>

    <LoginView />
  </div>
</template>
<script>
import { nextTick } from 'vue'
import { mapState } from 'pinia'
import bus, { EVENT_KEY } from '../../utils/bus'
import { _checkImgUrl, _formatNumber, _getUserDouyinId, _no, _stopPropagation } from '@/utils'
import { likeVideo, myVideo, privateVideo } from '@/api/videos'
import { useBaseStore } from '@/store/pinia'
import { userCollect } from '@/api/user'
import LoginView from '@/pages/home/components/LoaginView.vue'

export default {
  name: 'Me',
  components: {
    LoginView
  },
  data() {
    return {
      previewImg: '',
      contentIndex: 0,
      baseActiveIndex: 0,
      tabContents: [],
      isShowStarCount: false,
      floatFixed: false,
      floatShowName: false,
      isScroll: false,
      isMoreFunction: false,
      refs: {
        header: null,
        headerHeight: 0,
        descHeight: 0,
        videoSlideHeight: 0,
        maxSlideHeight: 0
      },
      videoItemHeight: 0,
      startLocationY: 0,
      fixedLocationY: 0,
      lastMoveYDistance: 0,
      canTransformY: 0,
      startTime: 0,
      floatHeight: 46,
      videos: {
        my: {
          list: [],
          total: -1,
          pageNo: 0
        },
        private: {
          list: [],
          total: -1,
          pageNo: 0
        },
        like: {
          list: [],
          total: -1,
          pageNo: 0
        },
        collect: {
          video: {
            list: [],
            total: -1
          },
          music: {
            list: [],
            total: -1
          }
        }
      },
      pageSize: 15,
      initSlideHeight: 0,
      loadings: {
        loading0: false,
        loading1: false,
        loading2: false,
        loading3: false
      },
      tempScroll: false,
      acceleration: 1.2,
      sprint: 15,
      canScroll: true
    }
  },
  computed: {
    videoSlideRowListStyle() {
      return {
        height:
          this.refs.videoSlideHeight !== 0
            ? this.refs.videoSlideHeight + 'px'
            : 'calc(var(--vh, 1vh) * 100 - 146rem)'
      }
    },
    SlideItemStyle() {
      if (this.tempScroll || this.isScroll) return { overflow: 'auto' }
      return { overflow: 'hidden' }
    },
    ...mapState(useBaseStore, ['userinfo', 'bodyHeight', 'bodyWidth'])
  },
  watch: {
    contentIndex(newVal, oldVal) {
      this.changeIndex(newVal, oldVal)
    }
  },
  mounted() {
    setTimeout(() => {
      bus.emit(EVENT_KEY.SHOW_LOGIN_MODAL)
    }, 2000)
    nextTick(() => {
      this.refs.header = this.$refs.header
      // this.refs.headerHeight = this.$refs.header.offsetHeight
      // this.refs.descHeight = this.$refs.desc.offsetHeight
      // this.refs.maxSlideHeight = this.$refs.videoSlideRowList.wrapperHeight
      // this.initSlideHeight = this.bodyHeight - 50 - this.refs.descHeight - 50
      // this.canTransformY = this.refs.descHeight - this.floatHeight
      // this.changeIndex(0, null)
    })
    this.videoItemHeight = (this.bodyWidth / 3) * 1.2 + 2
    bus.on('baseSlide-moved', () => (this.canScroll = false))
    bus.on('baseSlide-end', () => (this.canScroll = true))
  },
  methods: {
    _no,
    _getUserDouyinId,
    _checkImgUrl,
    _formatNumber,
    $nav(path) {
      this.$router.push(path)
    },
    setLoadingFalse() {
      this.loadings.loading0 = false
      this.loadings.loading1 = false
      this.loadings.loading2 = false
      this.loadings.loading3 = false
    },
    click(e) {
      if (this.baseActiveIndex === 0) return
      if (this.baseActiveIndex === 1) {
        this.baseActiveIndex = 0
        _stopPropagation(e)
      }
    },
    async getScrollAreaHeight(index = this.contentIndex) {
      let scrollAreaHeight = 0
      if (index === 3) {
        nextTick(async () => {
          scrollAreaHeight = this.$refs.collect.clientHeight + 60 + 40
        })
      } else {
        scrollAreaHeight =
          Math.ceil(this.videos[Object.keys(this.videos)[index]].list.length / 3) *
          this.videoItemHeight
        switch (index) {
          case 0:
            scrollAreaHeight += 60
            break
          case 1:
            scrollAreaHeight += 60 + 40
            break
          case 2:
            scrollAreaHeight += 60 + 40
            break
        }
      }
      return scrollAreaHeight
    },
    async changeIndex(newVal, oldVal) {
      // debugger
      if (this.loadings['loading' + newVal]) return
      let videoOb = this.videos[Object.keys(this.videos)[newVal]]
      if (newVal === 3) {
        if (videoOb.video.total === -1) {
          this.loadings['loading' + newVal] = true
          let res = await userCollect()
          console.log('res', res)
          if (res.success) this.videos.collect = res.data
        }
      } else {
        if (videoOb.total === -1) {
          this.loadings['loading' + newVal] = true
          let res
          switch (newVal) {
            case 0:
              res = await myVideo({
                pageNo: this.videos.my.pageNo,
                pageSize: this.pageSize
              })
              if (res.success) this.videos.my = res.data
              break
            case 1:
              res = await privateVideo({
                pageNo: this.videos.private.pageNo,
                pageSize: this.pageSize
              })
              if (res.success) this.videos.private = res.data
              break
            case 2:
              res = await likeVideo({
                pageNo: this.videos.like.pageNo,
                pageSize: this.pageSize
              })
              if (res.success) this.videos.like = res.data
              break
          }
        }
      }
      this.setLoadingFalse()
      let scrollAreaHeight = await this.getScrollAreaHeight(newVal)

      if (oldVal !== null) {
        let transformY = this.getTransform(this.$refs.scroll)
        let screenSlideHeight = this.initSlideHeight + Math.abs(transformY)
        if (this.isScroll) {
          this.refs.videoSlideHeight = this.refs.maxSlideHeight
        } else {
          if (scrollAreaHeight > screenSlideHeight) {
            this.refs.videoSlideHeight = this.refs.maxSlideHeight
          } else {
            this.refs.videoSlideHeight = screenSlideHeight
          }
        }
      } else {
        if (scrollAreaHeight < this.refs.maxSlideHeight) {
          this.refs.videoSlideHeight = scrollAreaHeight
        } else {
          this.refs.videoSlideHeight = this.refs.maxSlideHeight
        }
      }
    },
    async loadMoreData() {
      if (this.loadings['loading' + this.contentIndex]) return
      console.log('到底了')
      let videoOb = this.videos[Object.keys(this.videos)[this.contentIndex]]

      if (this.contentIndex !== 3 && videoOb.total > videoOb.list.length) {
        videoOb.pageNo++
        this.loadings['loading' + this.contentIndex] = true
        let res
        switch (this.contentIndex) {
          case 0:
            res = await myVideo({
              pageNo: videoOb.pageNo,
              pageSize: this.pageSize
            })
            break
          case 1:
            res = await privateVideo({
              pageNo: videoOb.pageNo,
              pageSize: this.pageSize
            })
            break
          case 2:
            res = await likeVideo({
              pageNo: videoOb.pageNo,
              pageSize: this.pageSize
            })
            break
          case 3:
            res = await userCollect({
              pageNo: videoOb.pageNo,
              pageSize: this.pageSize
            })
            break
        }
        this.loadings['loading' + this.contentIndex] = false
        if (res.success) {
          videoOb.list = videoOb.list.concat(res.data.list)
        }
      }
    },
    touchStart(e) {
      this.$refs.scroll.style.transition = 'none'
      this.fixedLocationY = this.startLocationY = e.touches[0].pageY
      this.startTime = Date.now()
    },
    move() {
      // (!this.isScroll) && e.preventDefault();
    },
    async scroll() {
      if (this.isScroll) {
        let SlideItems = document.querySelectorAll('.SlideItem')
        let SlideItem = SlideItems[this.contentIndex]
        if (SlideItem.scrollHeight - SlideItem.clientHeight < SlideItem.scrollTop + 60) {
          this.loadMoreData()
        }
      }
    },
    async touchMove(e) {
      if (!this.canScroll) return
      let moveDistance = e.touches[0].pageY - this.startLocationY
      let pageMoveDistance = this.lastMoveYDistance + moveDistance * this.acceleration
      // console.log('move-pageMoveDistance', pageMoveDistance)
      // console.log('move-moveDistance', moveDistance)
      //手指往上划，是负

      if (this.isScroll) {
        let SlideItems = document.querySelectorAll('.SlideItem')
        let SlideItem = SlideItems[this.contentIndex]
        if (SlideItem.scrollTop === 0) {
          this.tempScroll = this.isScroll = false
          this.startLocationY = e.touches[0].pageY
          this.lastMoveYDistance = -this.canTransformY
        }
      } else {
        //手指往下划，页面向上动
        if (moveDistance > 0) {
          if (pageMoveDistance > 0) {
            this.$refs.scroll.style.transform = `translate3d(0,0,0)`
            if (pageMoveDistance < 400) {
              this.refs.header.style.transition = 'all 0s'
              this.refs.header.style.height = this.refs.headerHeight + pageMoveDistance / 2 + 'px'
            }
          } else {
            let scrollAreaHeight = await this.getScrollAreaHeight()
            //如果可滚动区的高度大于posterHeight，并且移动超过30，就直接滚到顶
            if (this.refs.videoSlideHeight > scrollAreaHeight && Math.abs(moveDistance) > 20) {
              this.$refs.scroll.style.transition = 'all .2s'
              this.$refs.scroll.style.transform = `translate3d(0,0,0)`
              let SlideItems = document.querySelectorAll('.SlideItem')
              SlideItems.forEach((SlideItem) => {
                SlideItem.scrollTop = 0
              })
              this.floatShowName = this.floatFixed = this.isScroll = false
              this.lastMoveYDistance = 0
              this.startLocationY = e.touches[0].pageY
              this.changeIndex(this.contentIndex, this.contentIndex)
              return
            }
            if (Math.abs(pageMoveDistance) < this.canTransformY) {
              let SlideItems = document.querySelectorAll('.SlideItem')
              SlideItems.forEach((SlideItem) => {
                SlideItem.scrollTop = 0
              })
              this.tempScroll = false
            }
            this.floatFixed = Math.abs(pageMoveDistance) > 100
            this.floatShowName = Math.abs(pageMoveDistance) > 150
            this.$refs.scroll.style.transform = `translate3d(0,${pageMoveDistance}px,0)`
          }
        } else {
          //手指往上划，页面向下动
          if (Math.abs(pageMoveDistance) < this.canTransformY) {
            if (this.refs.videoSlideHeight < this.refs.maxSlideHeight) {
              let endTransformY =
                Math.abs(this.canTransformY) -
                (this.refs.maxSlideHeight - this.refs.videoSlideHeight)
              let moveTransformY =
                Math.abs(pageMoveDistance) < Math.abs(endTransformY)
                  ? pageMoveDistance
                  : -endTransformY
              this.$refs.scroll.style.transform = `translate3d(0,${moveTransformY}px,0)`

              this.startLocationY = e.touches[0].pageY
              this.lastMoveYDistance = moveTransformY

              this.floatFixed = Math.abs(moveTransformY) > 100
              this.floatShowName = Math.abs(moveTransformY) > 150
            } else {
              this.floatFixed = Math.abs(pageMoveDistance) > 100
              this.floatShowName = Math.abs(pageMoveDistance) > 150
              this.$refs.scroll.style.transform = `translate3d(0,${pageMoveDistance}px,0)`
            }
          } else {
            this.refs.header.style.height = this.refs.headerHeight + 'px'
            this.$refs.scroll.style.transform = `translate3d(0,${-this.canTransformY}px,0)`
            let SlideItems = document.querySelectorAll('.SlideItem')
            let SlideItem = SlideItems[this.contentIndex]

            if (!this.isScroll) {
              this.tempScroll = true
              SlideItem.scrollTop =
                Math.abs(pageMoveDistance) - this.refs.descHeight + this.floatHeight
            }
            if (SlideItem.scrollHeight - SlideItem.clientHeight < SlideItem.scrollTop + 60) {
              this.loadMoreData()
            }
          }
        }
      }
    },
    async touchEnd(e) {
      if (!this.canScroll) return
      let moveDistance = e.changedTouches[0].pageY - this.startLocationY
      let pageMoveDistance = this.lastMoveYDistance + moveDistance * this.acceleration

      // console.log('end-pageMoveDistance', pageMoveDistance)
      // console.log('end-moveDistance', moveDistance)

      if (this.isScroll) {
        this.tempScroll = false
        this.lastMoveYDistance = -this.canTransformY
      } else {
        let endTime = Date.now()
        let gapTime = endTime - this.startTime

        // console.log('end-gapTime', gapTime)
        let endTransformY =
          Math.abs(this.canTransformY) - (this.refs.maxSlideHeight - this.refs.videoSlideHeight)

        //手指往下划，页面向上动
        if (moveDistance >= 0) {
          if (pageMoveDistance > 0) {
            this.refs.header.style.transition = 'all .3s'
            this.refs.header.style.height = this.refs.headerHeight + 'px'
            this.lastMoveYDistance = 0
            this.floatShowName = this.floatFixed = this.isScroll = this.tempScroll = false
          } else {
            //猛的划一下
            if (Math.abs(moveDistance) > 100 && gapTime > 100 && gapTime < 150) {
              this.floatShowName = this.floatFixed = this.isScroll = false

              //用cancelAnimationFrame快速滚动到顶部，要比transition = 'all .3s'快
              this.$refs.scroll.style.transition = 'none'
              let transformY = this.getTransform(this.$refs.scroll)
              //当前的transformY
              // console.log('transformY', transformY)
              let timer
              cancelAnimationFrame(timer)
              let fn = () => {
                //说明没到顶
                if (transformY < 0) {
                  transformY = transformY + 40
                  this.$refs.scroll.style.transform = `translate3d(0,${transformY > 0 ? 0 : transformY}px,0)`
                  timer = requestAnimationFrame(fn)
                } else {
                  //transformY === 0说明，本来就在顶部，然后猛的一划,这里要判断下
                  if (transformY !== 0) {
                    if (_css(this.refs.header, 'height') < 400) {
                      this.refs.header.style.transition = 'none'
                      this.refs.header.style.height = _css(this.refs.header, 'height') + 10 + 'px'
                      timer = requestAnimationFrame(fn)
                    } else {
                      this.refs.header.style.transition = 'all .6s'
                      this.refs.header.style.height = this.refs.headerHeight + 'px'
                      this.lastMoveYDistance = 0
                      cancelAnimationFrame(timer)
                    }
                  } else {
                    //快速动画结束
                    this.lastMoveYDistance = 0
                    cancelAnimationFrame(timer)
                  }
                }
              }
              timer = requestAnimationFrame(fn)
            } else if (Math.abs(moveDistance) > 100 && gapTime > 150 && gapTime < 300) {
              //   //用cancelAnimationFrame快速滚动到顶部，要比transition = 'all .3s'快
              this.$refs.scroll.style.transition = 'all .3s'
              this.$refs.scroll.style.transform = `translate3d(0,0,0)`
              this.lastMoveYDistance = 0
              this.floatShowName = this.floatFixed = this.isScroll = false
              let SlideItems = document.querySelectorAll('.SlideItem')
              SlideItems.forEach((SlideItem) => {
                SlideItem.scrollTop = 0
              })
              this.tempScroll = this.isScroll = false
            } else {
              this.lastMoveYDistance = pageMoveDistance
            }
          }
        } else {
          if (Math.abs(moveDistance) > 100 && gapTime < 250) {
            //往下划
            this.$refs.scroll.style.transition = 'all .3s'
            if (this.refs.videoSlideHeight < this.refs.maxSlideHeight) {
              this.$refs.scroll.style.transform = `translate3d(0,${-endTransformY}px,0)`
              // this.floatShowName = this.floatFixed = true
              this.floatFixed = Math.abs(endTransformY) > 100
              this.floatShowName = Math.abs(endTransformY) > 150
              this.lastMoveYDistance = -endTransformY
            } else {
              this.$refs.scroll.style.transform = `translate3d(0,${-this.canTransformY}px,0)`
              this.floatShowName = this.floatFixed = this.isScroll = true
              this.tempScroll = false
              this.lastMoveYDistance = -this.canTransformY
            }
          } else {
            //手指往上划，页面向下动
            if (Math.abs(pageMoveDistance) < this.canTransformY) {
              if (this.refs.videoSlideHeight < this.refs.maxSlideHeight) {
                this.lastMoveYDistance =
                  Math.abs(pageMoveDistance) < Math.abs(endTransformY)
                    ? pageMoveDistance
                    : -endTransformY
              } else {
                let endDistance = pageMoveDistance
                if (Math.abs(moveDistance) > 20) {
                  if (moveDistance > 0) {
                    endDistance += this.sprint
                  } else {
                    endDistance -= this.sprint
                  }
                }
                this.lastMoveYDistance = endDistance
                this.$refs.scroll.style.transition = 'all .3s'
                this.$refs.scroll.style.transform = `translate3d(0,${endDistance}px,0)`
              }
            } else {
              this.isScroll = true
              this.tempScroll = false
              this.lastMoveYDistance = -this.canTransformY
            }
          }
        }
      }
    },
    getTransform(el) {
      let transform = el.style.transform
      if (!transform) return 0
      // console.log('transform',transform)
      let transformY = transform.substring(
        transform.indexOf('0px') + 5,
        transform.lastIndexOf('0px') - 4
      )
      // console.log('transformY',transformY)
      //当前的transformY
      transformY = parseInt(transformY)
      return transformY
    },
    filterAge(age) {
      let date = new Date(age)
      return new Date().getFullYear() - date.getFullYear()
    }
  }
}
</script>

<style scoped lang="less">
@import 'Me';
</style>
