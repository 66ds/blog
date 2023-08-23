<template>
  <index-header>
    <div class="header">
      <div class="mNavBtn" @click="$router.push('/')" v-if="!isShow">博客</div>
      <div class="mNavBtn" @click="$router.go(-1)" v-else>
        <i class="el-icon-arrow-left">返回</i>
      </div>
      <div
        class="mNavBtn"
        v-if="user == null"
        @click="$router.push('/login')"
      >
        登录
      </div>
      <el-dropdown
        trigger="hover"
        @command="skip"
        v-if="user != null"
      >
        <span class="el-dropdown-link">
          欢迎你:{{ user.userNickname
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            icon="el-icon-edit"
            :command="`/person-blog/${user.userId}`"
            >我的博客</el-dropdown-item
          >
          <el-dropdown-item
            icon="el-icon-s-grid"
            :command="`/person-catagory/${user.userId}`"
            >我的分类</el-dropdown-item
          >
          <el-dropdown-item
            icon="el-icon-paperclip"
            :command="`/person-labels/${user.userId}`"
            >我的标签</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-user" command="/person-info"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-view" command="/person-msg"
            >我的消息</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-camera">我的关注</el-dropdown-item>
          <el-dropdown-item icon="el-icon-edit-outline" command="admin-manager"
            >后台管理</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-switch-button" command="logOut"
            >安全退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="tip">
      <!-- <i class="el-icon-bell" style="color: red"></i>&nbsp; -->
      <notice :msg="msg" />
    </div>
  </index-header>
</template>

<script>
import IndexHeader from "@/components/common/header/Header.vue";
import Notice from "@/components/common/header/phone/Notice.vue";
import { Partten } from "@/partten";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isShow: true,
      msg: "手机端功能不完善,请到电脑端查看更完善功能",
    };
  },
  components: {
    IndexHeader,
    Notice,
  },
  methods: {
    ...mapMutations({setUser:"setUser", setToken:"setToken"}),
    skip(command) {
      //跳转到后台
      if (command == "admin-manager") {
        window.open(Partten.managerUrl, "_blank");
      }
      //登出
      else if (command == "logOut") {
        // document.getElementsByTagName("body")[0].className="el-popup-parent--hidden";
        this.$confirm("确定登出系统?", "登出系统", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          lockScroll: true,
        })
          .then(() => {
            //清除用户信息
            this.setUser(null);
            //清除后端的token令牌
            this.setToken("");
            this.$message.success("退出成功");
            //刷新当前页
            this.$router.push("/login");
          })
          .catch(() => {});
      } else {
        this.$router.push(command);
      }
    },
  },
  watch: {
    $route(now) {
      //监控路由变换，控制返回按钮的显示
      if (now.path == "/") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped>
.header {
  width: 90%;
  display: flex;
  justify-content: space-between;
}

.header-change {
  background-color: #fff;
}

.header-change li {
  text-align: center;
  line-height: 40px;
  border-bottom: 1px solid #e6e6e6;
}

.mNavBtn {
  line-height: 60px;
  cursor: pointer;
  font-size: 15px;
}
.tip {
  margin-top: 6px !important;
  width: 90%;
  height: 16px;
  margin: 0 auto;
  text-align: center;
  /* background-color: #25a4bb; */
  opacity: 0.7;
}
</style>