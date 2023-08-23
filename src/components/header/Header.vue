<template>
  <el-header>
    <slot></slot>
  </el-header>
</template>

<script>
import { userInfoByIdApi } from "api/users";
import { loginSocket } from "utils/socket";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      messageWs: "",
    };
  },
  created() {
    if (this.token != "") {
      this.userInfoById();
    }
  },
  methods: {
    ...mapMutations({ setUser: "setUser" }),
    //获取用户个人信息
    async userInfoById() {
      try {
        const res = await userInfoByIdApi();
        if (res == undefined) return;
        const userId = res.data.userId
        //开启消息通知websocket
        this.messageWs = loginSocket(true,userId);
        this.messageWs.then((ws) => {
          let that = this;
          //连接成功
          ws.$on("NOTICE_USER_MESSAGE", function (data) {
            console.log(data)
            that.$notify.info({
              type:'info',
              title: data.name,
              message: data.message,
            });
          });
        });
        //保存用户的个人信息
        this.setUser(res.data);
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
  computed: {
    ...mapState(["token"]),
  },
  watch: {
    token: function (newval) {
      if (newval != "") {
        this.userInfoById();
      }
    },
  },
};
</script>

<style>
.el-header {
  padding: 0px 0px !important;
  background-color: #fff;
  color: #333;
  height: 61px !important;
  margin: 0 auto;
  border-bottom: 1px solid #e6e6e6;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.el-popup-parent--hidden {
  overflow: hidden !important;
}

.header-title {
  vertical-align: top;
  line-height: 60px;
  font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
  position: absolute;
  font-size: 22px;
  font-weight: bolder;
  right: 20px;
}

.header-icon {
  width: 16px !important;
  vertical-align: text-bottom !important;
}

.el-menu--horizontal > li.el-menu-item {
  border-bottom: none;
}

.el-menu--horizontal > li.el-menu-item:hover {
  background-color: #ecf5ff !important;
}

.el-menu--horizontal > li.el-menu-item.is-active {
  border-bottom: none;
}
</style>
