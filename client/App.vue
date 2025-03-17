<script>
import { login } from "@/api";
export default {
  methods: {
    async autoLogin() {
      try {
        // 使用测试账号或从本地存储获取凭证
        const res = await login.account({
          username: "ghostsubmarine",
          password: "LiXin123..",
        });
        console.log("自动登录成功:", res);
        uni.setStorageSync("token", res.token);
      } catch (error) {
        console.error("自动登录失败:", error);
      }
    },
  },
  onLaunch: function () {
		this.autoLogin()
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，注意不能引入至uni.scss，同时给style标签加入lang="scss"属性 */
@import "@/uni_modules/uview-plus/index.scss";

uni-page-body {
  height: 100%;
}
</style>
