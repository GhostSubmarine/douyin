import { defineStore } from 'pinia'
// import { friends, panel } from '@/api/user'
import { recommendedVideo } from '@/api/videos'
import enums from '@/utils/enums'
import resource from '@/assets/data/resource'
import { _storageGet } from '@/utils'

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      bodyHeight: document.body.clientHeight,
      bodyWidth: document.body.clientWidth,
      maskDialog: false,
      maskDialogMode: 'dark',
      version: '17.1.0',
      excludeNames: [],
      judgeValue: 20,
      homeRefresh: 60,
      loading: false,
      routeData: null,
      users: [],
      userinfo: {
        nickname: '',
        desc: '',
        user_age: '',
        signature: '',
        unique_id: '',
        province: '',
        city: '',
        gender: '',
        school: {
          name: '',
          department: null,
          joinTime: null,
          education: null,
          displayType: enums.DISPLAY_TYPE.ALL
        },
        avatar_168x168: {
          url_list: []
        },
        avatar_300x300: {
          url_list: []
        },
        cover_url: [
          {
            url_list: []
          }
        ],
        white_cover_url: [
          {
            url_list: []
          }
        ]
      },
      isLoginModalOpen: false,
      appInfo: {},
      palyTotalTime: 0,
      friends: resource.users,
      message: ''
    }
  },
  getters: {
    selectFriends() {
      return this.friends.all.filter((v) => v.select)
    }
  },
  actions: {
    async init() {
      const r = await recommendedVideo()
      if (r.success) {
        this.appInfo = r
      }

      // const r = await panel()
      // if (r.success) {
      //   this.userinfo = Object.assign(this.userinfo, r.data)
      // }
      // const r2 = await friends()
      // if (r2.success) {
      //   this.users = r2.data
      // }
    },
    setIsLoginModalOpen(val) {
      this.isLoginModalOpen = val
    },
    setUserinfo(val) {
      this.userinfo = val
    },
    setPalyTotalTime() {
      const userBehavior = _storageGet('userBehavior')
      this.palyTotalTime = userBehavior.palyTotalTime
    },
    setMaskDialog(val) {
      this.maskDialog = val.state
      if (val.mode) {
        this.maskDialogMode = val.mode
      }
    },
    updateExcludeNames(val) {
      if (val.type === 'add') {
        if (!this.excludeNames.find((v) => v === val.value)) {
          this.excludeNames.push(val.value)
        }
      } else {
        const resIndex = this.excludeNames.findIndex((v) => v === val.value)
        if (resIndex !== -1) {
          this.excludeNames.splice(resIndex, 1)
        }
      }
      // console.log('store.excludeNames', store.excludeNames,val)
    }
  }
})
