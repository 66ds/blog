<template>
  <index-header>
    <div class="header">
      <el-menu
        router
        :default-active="this.$route.path"
        class="el-menu-demo animated fadeIn"
        mode="horizontal"
        active-text-color="#409eff"
      >
        <el-menu-item index="/"
          ><i class="el-icon-s-home header-icon"></i>首页
        </el-menu-item>
        <el-menu-item index="/labels"
          ><i class="el-icon-paperclip header-icon"></i> 标签
        </el-menu-item>
        <el-menu-item index="/catagory"
          ><i class="el-icon-s-grid header-icon"></i>分类
        </el-menu-item>
        <el-menu-item index="/archives"
          ><i class="el-icon-delete header-icon"></i>归档
        </el-menu-item>
        <el-menu-item index="/message"
          ><i class="el-icon-document header-icon"></i>留言板
        </el-menu-item>
        <el-menu-item index="/link"
          ><i class="el-icon-share header-icon"></i>友链
        </el-menu-item>
        <el-menu-item index="/music"
          ><i class="el-icon-headset header-icon"></i>音乐站
        </el-menu-item>
        <el-menu-item index="/about"
          ><i class="el-icon-user header-icon"></i>关于
        </el-menu-item>
        <el-menu-item index="/login" v-if="user == null"
          ><i class="el-icon-key header-icon"></i>登录
        </el-menu-item>
        <el-dropdown
          trigger="hover"
          @command="skip"
          v-if="user != null"
        >
          <span class="el-dropdown-link">
            欢迎你:{{ user.userNickname
            }}
            <i class="el-icon-arrow-down el-icon--right" ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
             <el-dropdown-item icon="el-icon-view" command=""
              >消息通知&nbsp; <i style="color:red">0</i></el-dropdown-item
            >
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
            <el-dropdown-item
              icon="el-icon-edit-outline"
              command="admin-manager"
              >后台管理</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-switch-button" command="logOut"
              >安全退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <div
          style="float: right;"
          v-if="user != null"
          @click="$router.push('/person-info')"
        >
          <el-avatar
            :size="57"
            alt="修改个人信息"
            fit="cover"
            style="cursor: pointer"
            :src="user.userProfilePhoto"
          ></el-avatar>
        </div>
      </el-menu>
    </div>
  </index-header>
</template>

<script>
import IndexHeader from "components/common/header/Header.vue";
import { mapState,mapMutations } from "vuex";
import { Partten } from "@/partten";
export default {
  data() {
    return {};
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
            //清楚用户信息
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
  components: {
    IndexHeader,
  },
  computed:{
    ...mapState(['user'])
  }
};
</script>

<style>
.header {
  width: 70%;
  margin: 0 auto;
  position: relative;
}

.el-dropdown-link {
  cursor: pointer;
  line-height: 60px;
  margin-left: 20px;
  color: #909399;
}
.el-icon-arrow-down {
  font-size: 15px;
}


</style>