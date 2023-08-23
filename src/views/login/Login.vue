<template>
  <div class="login-wrap">
    <div class="ms-login animated fadeIn">
      <div class="ms-title">欢迎登录</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input
            v-model="param.username"
            placeholder="请输入账号"
            @keyup.enter.native="loginForm()"
            prefix-icon="el-icon-user"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :type="type"
            placeholder="请输入密码"
            v-model="param.password"
            @keyup.enter.native="loginForm()"
            class="pwd-input"
            prefix-icon="el-icon-lock"
          >
            <i
              slot="suffix"
              class="icon-style el-icon-view"
              autocomplete="auto"
              @click="flag = !flag"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="code">
            <el-input v-model="param.code" placeholder="请输入验证码">
            </el-input>
            <img
              :src="imgcode"
              width="130px"
              class="pictrue"
              @click="captchas"
            />
          </div>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="loginForm()" class="btn"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
    <el-dialog
      title="请完成安全校验"
      :visible.sync="dialogVisible"
      width="342px"
      :close-on-click-modal="false"
    >
      <drag-verify-img-chip
        ref="dragVerify"
        :showRefresh="true"
        :imgsrc="imgsrc"
        :barWidth="40"
        :width="302"
        progressBarBg="#1991fa"
        text="请按住滑块拖动"
        handlerIcon="el-icon-d-arrow-right"
        successIcon="el-icon-circle-check"
        refreshIcon="el-icon-refresh-right"
        @refresh="refreshVerify"
        :showTips="false"
        @passcallback="verifySuccess"
        @passfail="verifyFail"
      >
      </drag-verify-img-chip>
    </el-dialog>
  </div>
</template>

<script>
import { userLoginApi } from "api/users";
import { getValidateCode } from "api/code";
import { validPhone } from "utils/validate";
import { constants } from "constants/index";
import dragVerifyImgChip from "vue-drag-verify-img-chip";

export default {
  data: function () {
    return {
      param: {
        username: "",
        password: "",
        code: "",
        key: "",
      },
      rules: {
        username: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error(constants.phoneNotEmpty));
              } else if (!validPhone(value)) {
                callback(new Error(constants.phoneError));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      flag: false,
      imgcode: "", //默认验证码图片
      imgsrc: constants.codeUrl + Math.round(Math.random() * 100), //滑动校验图片(这里使用的是外网链接,取随机100-200的图片)
      dialogVisible: false,
      errNum: 0, //记录错误次数,如果超出次数显示滑窗校验码
    };
  },
  computed: {
    type() {
      return this.flag ? "text" : "password";
    },
  },
  created: function () {
    this.getCode();
    document.onkeydown = (e) => {
      if (this.$route.name === "login") {
        let key = window.event.keyCode;
        if (key === 13) {
          this.loginForm();
        }
      }
    };
  },
  methods: {
    //校验码通过
    verifySuccess() {
      //将校验码隐藏
      this.dialogVisible = false;
      this.refreshVerify();
      this.closeModelToLogin();
    },
    //校验码不通过
    verifyFail() {
      this.$message.error(constants.codeVerifyError);
      //重新刷新校验码
      this.refreshVerify();
      //重新获取验证码
      this.getCode();
    },
    //重新刷新校验码
    refreshVerify() {
      this.$refs.dragVerify.reset();
      //重新刷新
      this.imgsrc = constants.codeUrl + Math.round(Math.random() * 100);
    },
    getCode() {
      getValidateCode().then((res) => {
        this.imgcode = res.data.code;
        this.param.key = res.data.key;
      });
    },
    //关闭滑动进行登录
    closeModelToLogin() {
      userLoginApi(
        this.param.username,
        this.param.password,
        this.param.code,
        this.param.key
      )
        .then((res) => {
          if (res) {
            let data = res.data;
            this.$message({
              message: res.msg,
              type: data != null ? "success" : "error",
              onClose: () => {
                //关闭loading
                if (data) {
                  //设置后端的token令牌
                  this.$store.dispatch("setToken", res.data);
                  import("../../utils/request.js");
                  //跳转到之前的页面
                  this.$router.go(-1);
                }
              },
            });
          }
        })
        .catch((e) => {
          //加载登陆中loading
          // this.$message({
          //   message: "登陆中",
          //   type: "warning",
          //   duration: 0,
          // });
          //错误次数+1
          this.errNum++;
          //重新加载验证码
          this.getCode();
          //提示登录失败
          let data = e === undefined ? {} : e;
          this.$message.error(data || constants.loginError);
          //判断滑块存存在,如果存在重置滑块
          if (this.dialogVisible) this.refreshVerify();
        });
    },
    loginForm() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          //判断次数是否是大于2,如果大于2就显示滑动窗口
          if (this.errNum >= 2) {
            this.dialogVisible = true;
          } else {
            //加载登陆中loading
            this.$message({
              message: "登陆中",
              iconClass: "el-icon-loading",
              duration: 500,
            });
            this.closeModelToLogin();
          }
        } else {
          return false;
        }
      });
    },
    captchas() {
      this.getCode();
    },
  },
  components: {
    dragVerifyImgChip,
  },
};
</script>

<style>
.login-wrap {
  width: 100%;
  height: 100%;
  background-size: 100%;
}

.login-wrap .code {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-wrap .code .pictrue {
  height: 40px;
}

.login-wrap .btn {
  background: linear-gradient(
    90deg,
    rgba(25, 180, 241, 1) 0%,
    rgba(14, 115, 232, 1) 100%
  ) !important;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -210px 0 0 -176px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  box-shadow: 2px 2px 6px #909090;
}

.ms-content {
  padding: 20px 20px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
}

.el-button > span {
  font-size: 5px !important;
}

.icon-style {
  margin-top: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>
