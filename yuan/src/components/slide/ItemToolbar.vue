<script setup lang="ts">
import BaseMusic from '../BaseMusic.vue'
import { _formatNumber, cloneDeep } from '@/utils'
import bus, { EVENT_KEY } from '@/utils/bus'
import { Icon } from '@iconify/vue'
import { useClick } from '@/utils/hooks/useClick'
import { inject } from 'vue'

const props = defineProps({
  isMy: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const position = inject<any>('position')

const emit = defineEmits(['update:item', 'goUserInfo', 'showComments', 'showShare', 'goMusic'])

function _updateItem(props, key, val) {
  const old = cloneDeep(props.item)
  old[key] = val
  emit('update:item', old)
  bus.emit(EVENT_KEY.UPDATE_ITEM, { position: position.value, item: old })
}

function loved() {
  setTimeout(() => {
    _updateItem(props, 'isLoved', !props.item.isLoved)
  }, 100)
  if (!props.item.isLoved) {
    // eslint-disable-next-line vue/no-mutating-props
    props.item.statistics.digg_count++
  } else {
    // eslint-disable-next-line vue/no-mutating-props
    props.item.statistics.digg_count--
  }
}

function collected() {
  setTimeout(() => {
    _updateItem(props, 'isCollect', !props.item.isCollect)
  }, 100)
  if (!props.item.isCollect) {
    // eslint-disable-next-line vue/no-mutating-props
    props.item.statistics.collect_count++
  } else {
    // eslint-disable-next-line vue/no-mutating-props
    props.item.statistics.collect_count--
  }
}

function attention(e) {
  e.currentTarget.classList.add('attention')
  setTimeout(() => {
    _updateItem(props, 'isAttention', true)
  }, 1000)
}

function showComments() {
  if (props.item.plstatus) {
    bus.emit(EVENT_KEY.OPEN_COMMENTS, props.item.aweme_id)
  } else {
    bus.emit(EVENT_KEY.SHOW_LOGIN_MODAL)
  }
}

const vClick = useClick()
</script>

<template>
  <div class="toolbar mb1r">
    <div class="avatar-ctn mb2r">
      <img class="avatar" :src="item.author?.avatar_168x168?.url_list?.[0]" alt="" />
      <transition name="fade">
        <div v-if="!item.isAttention" v-click="attention" class="options">
          <img class="no" src="../../assets/img/icon/add-light.png" alt="" />
          <img class="yes" src="../../assets/img/icon/ok-red.png" alt="" />
        </div>
      </transition>
    </div>
    <div class="love mb2r" v-click="loved">
      <div>
        <img src="../../assets/img/me/10.png" class="love-image" v-if="!item.isLoved" />
        <img src="../../assets/img/me/11.png" class="love-image" v-if="item.isLoved" />
      </div>
      <span>{{ _formatNumber(item.statistics.digg_count) }}</span>
    </div>
    <div class="message mb2r" v-click="showComments">
      <img src="../../assets/img/me/12.png" class="love-image" />
      <!-- <Icon icon="mage:message-dots-round-fill" class="icon" style="color: white" /> -->
      <span>{{ _formatNumber(item.statistics.comment_count) }}</span>
    </div>
    <!--TODO     -->
    <div class="message mb2r" v-click="collected">
      <Icon
        v-if="item.isCollect"
        icon="ic:round-star"
        class="icon"
        style="color: rgb(252, 179, 3)"
      />
      <Icon v-else icon="ic:round-star" class="icon" style="color: white" />
      <span>{{ _formatNumber(item.statistics.collect_count) }}</span>
    </div>
    <!-- <div v-if="!props.isMy" class="share mb2r" v-click="() => bus.emit(EVENT_KEY.SHOW_SHARE)">
      <img src="../../assets/img/icon/share-white-full.png" alt="" class="share-image" />
      <span>{{ _formatNumber(item.statistics.share_count) }}</span>
    </div> -->
    <!-- <div v-else class="share mb2r" v-click="() => bus.emit(EVENT_KEY.SHOW_SHARE)">
      <img src="../../assets/img/icon/menu-white.png" alt="" class="share-image" />
    </div> -->
    <!--    <BaseMusic-->
    <!--        :cover="item.music.cover"-->
    <!--        v-click="$router.push('/home/music')"-->
    <!--    /> -->
    <BaseMusic />
  </div>
</template>

<style scoped lang="less">
.toolbar {
  //width: 40px;
  position: absolute;
  bottom: 0;
  right: 10rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar-ctn {
    position: relative;

    @w: 45rem;

    .avatar {
      width: @w;
      height: @w;
      border: 3rem solid white;
      border-radius: 50%;
    }

    .options {
      position: absolute;
      border-radius: 50%;
      margin: auto;
      left: 0;
      right: 0;
      bottom: -5px;
      background: red;
      //background: black;
      width: 18rem;
      height: 18rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s;

      img {
        position: absolute;
        width: 14rem;
        height: 14rem;
        transition: all 1s;
      }

      .yes {
        opacity: 0;
        transform: rotate(-180deg);
      }

      &.attention {
        background: white;

        .no {
          opacity: 0;
          transform: rotate(180deg);
        }

        .yes {
          opacity: 1;
          transform: rotate(0deg);
        }
      }
    }
  }

  .love,
  .message,
  .share {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @width: 35rem;

    img {
      width: @width;
      height: @width;
    }

    span {
      font-size: 12rem;
    }
  }

  .icon {
    font-size: 32rem;
  }

  .loved {
    background: red;
  }
}
</style>
