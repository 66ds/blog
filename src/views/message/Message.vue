<template>
  <div class="message">
    <h2>留言互动</h2>
    <div>
      <span class="totalBarrage">{{ barrageTotalWatchCount }}&nbsp;次播放</span>
      <span class="totalBarrage">&nbsp;·&nbsp;</span>
      <span class="totalBarrage">总弹幕数&nbsp;{{ barrageTotalCount }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <!-- <span class="totalBarrage">2022-02-03 01:32:46</span> -->
    </div>

    <div>
      <div ref="videoOuterLayer" class="uncheck" @mouseleave="Leave()" @mousemove="MouseMove()">
        <div id="video" ref="videoBox" @click="CloseMenuOrPlayVideo($event)" @contextmenu.prevent="OpenMenu($event)">
          <!--快捷键层-->
          <!-- <hot-key v-show="showHotKey"></hot-key> -->
          <!--视频信息层-->
          <video-info v-if="showVideoInfo"></video-info>
          <context-menu id="menu" ref="menu"></context-menu>
          <!--弹幕层-->
          <barrage v-if="showBarrage" :barrageList="barrageList" ref="barrage"></barrage>
          <!--Video层-->
          <video id="player" ref="video" :src="src" class="player" preload="auto" @canplay="VideoInit()"
            @timeupdate="TimeUpdate()" @ended="VideoEnd()" />
          <!--消息层-->
          <div>
            <span v-if="message" class="msg">{{ msg }}</span>
          </div>
          <!--控制栏层-->
          <div class="control" v-show="control">
            <control ref="control"></control>
          </div>
        </div>
        <!--发送弹幕组件-->
        <sendBarrage></sendBarrage>
        <webSocket ref="webSocket" />
      </div>
    </div>
    <el-card class="message-box-card animated fadeIn">
      <div class="tips">
        <p>
          <i class="el-icon-info" style="color: red; font-size: 14px"></i>
          留言说明:
        </p>
        <p data-v-0eafe26a="">
          务必填写有效的邮箱地址，否则不会收到回复信息的~
        </p>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
        <el-form-item label="内容" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" maxlength="100" show-word-limit
            :autosize="{ minRows: 4, maxRows: 5 }"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div>
        <div class="commnet-total">
          <span>共{{ totalCount }}条评论</span><span v-if="totalCount == 0">,快来成为第一个评论的吧~</span>
        </div>
        <div class="comment">
          <div v-custom-loading="stayList">
            <ul style="list-style: none" v-for="(item, i) in stayList" :key="i">
              <li class="who">
                <!--                        <span class="page">{{i+1}}.</span>-->
                <span class="user" @click="$router.push('/person-blog/' + item.stayUserId)">{{ item.userName }}</span>
                <span class="sys">{{ item.staySys }}</span>
                <span class="exe">{{ item.stayChrome }}</span>
                <span class="time">{{ item.messageStayTime }}</span>
              </li>
              <li class="write">
                {{ item.messageContent }}
              </li>
              <div style="border-bottom: 1px solid #ececec" v-if="item.stayMessageEntity != null">
                <li class="who" style="padding-left: 40px">
                  <!--                        <span class="page">{{i+1}}.</span>-->
                  <span class="user" @click="
                    $router.push(
                      '/person-blog/' + item.stayMessageEntity.stayUserId
                    )
                    ">{{ item.stayMessageEntity.userName }}</span>
                  <span class="sys">{{ item.stayMessageEntity.staySys }}</span>
                  <span class="exe">{{
                    item.stayMessageEntity.stayChrome
                  }}</span>
                  <span class="time">{{
                    item.stayMessageEntity.messageStayTime
                  }}</span>
                </li>
                <li class="write" style="padding-left: 40px">
                  {{ item.stayMessageEntity.messageContent }}
                </li>
              </div>
            </ul>
          </div>

          <div class="pagination" style="text-align: center">
            <el-pagination layout="prev, pager, next" :current-page="query.page" :page-size="query.limit"
              :total="pageTotal" @current-change="handlePageChange"></el-pagination>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addStayMessageApi, selectStayMessageListApi } from "api/stayMessage";
import BarrageHotKey from "components/video/BarrageHotKey.vue";
import BarrageControl from "components/video/BarrageControl.vue";
import BarrageMain from "components/video/BarrageMain.vue";
import BarrageSend from "components/video/BarrageSend.vue";
import BarrageMenu from "components/video/BarrageMenu.vue";
import BarrageVideoInfo from "components/video/BarrageVideoInfo.vue";
import WebSocket from "components/video/BarrageSocket";
export default {
  data() {
    return {
      query: {
        page: 1,
        limit: 10,
      },
      commentDesc: "",
      pageTotal: 0,
      totalCount: 0,
      stayList: [],
      ruleForm: {
        desc: "",
      },
      rules: {
        desc: [{ required: true, message: "请填写内容", trigger: "blur" }],
      },
      hls: null,
      msg: "", //消息内容
      message: false,
      control: false,
      showBarrage: true,
      showVideoInfo: false,
      showHotKey: false,
      currentTime: 0,
      barrageList: [],
      src: "https://live-s3m.mediav.com/nativevideo/db730c404c171d9c9e8ed599c99fc730-bit_cloud768.mp4",
      original: false, //是否为原始分辨率
      defaultRes: 720, //默认分辨率(之后可调整)
      maxRes: 1080, //最大分辨率
      currentRes: 720, //当前分辨率
      barrageHistoryList: [],
      barrageTotalCount: 0,
      barrageOnlineCount: 0,
      barrageTotalWatchCount: 0,
      barrageContentStyle: {
        backgroundColor: "",
      },
      pause: true,
      temp: 0,
    };
  },
  computed: {
    //参数
    params() {
      return Object.assign(
        {
          type: "mp4",
          resource: {},
        },
        this.options
      );
    },
    //播放器设置
    playerConfig: {
      get() {
        let config = localStorage.getItem("player-config");
        return JSON.parse(config);
      },
      set(val) {
        let config = JSON.parse(localStorage.getItem("player-config"));
        config[val.key] = val.value;
        localStorage.setItem("player-config", JSON.stringify(config));
      },
    },
  },
  methods: {
    goToGitee() {
      window.open("https://gitee.com/MonkeyBrothers/barrage", "_blank");
    },
    changBackGroundColor() { },
    VideoInit() {
      let video = this.$refs.video;
      this.$refs.control.Init(video.duration);
    },
    //更新进度时间
    TimeUpdate() {
      let video = this.$refs.video;
      if (video === undefined) {
        return;
      }
      this.currentTime = video.currentTime;
      let loaded = 0;
      if (video.buffered.length) {
        loaded = video.buffered.end(video.buffered.length - 1);
      }
      this.$refs.control.TimeUpdate(video.currentTime, loaded);
      if (this.$refs.barrage) {
        this.$refs.barrage.TimeUpdate(video.currentTime);
      }

      const number = parseInt(this.currentTime);
      if (this.temp !== parseInt(this.currentTime)) {
        this.$refs.webSocket.clientBarrageMsgRollingSend();
        this.temp = number;
      }
    },
    VideoEnd() {
      this.$refs.control.VideoEnd();
      this.Clearbarrage();
    },
    ChangeVideoProgress(currTime) {
      this.$refs.video.currentTime = currTime;
    },
    //显示消息
    ShowMessage(msg) {
      this.msg = msg;
      this.message = true;
      //定时隐藏
      setTimeout(() => {
        this.message = false;
      }, 3000);
    },
    //清除弹幕
    Clearbarrage() {
      if (this.$refs.barrage) {
        this.$refs.barrage.Clearbarrage();
      }
    },
    //暂停弹幕
    PauseBarrage() {
      if (this.$refs.barrage) {
        this.$refs.barrage.Pause();
        this.pause = true;
      }
    },
    //开始弹幕
    StartBarrage() {
      if (this.$refs.barrage) {
        this.$refs.barrage.Start();
        this.pause = false;
      }
    },

    //发送弹幕
    Send({ text, color, type }, selfFlag) {
      if (this.showBarrage) {
        let currentTime = this.$refs.video.currentTime;
        this.Draw({ text, color, type }, selfFlag);
        this.$refs.webSocket.clientBarrageSend({
          text,
          color,
          type,
          currentTime,
        });
        this.ShowMessage("发送成功");
      }
    },
    //绘制弹幕
    Draw({ text, color, type }, selfFlag) {
      this.$refs.barrage.DrawBarrage({ text, color, type }, selfFlag);
    },
    //设置弹幕不透明度
    SetOpaque(opacity) {
      this.$refs.barrage.SetOpaque(opacity);
    },
    //开启或关闭弹幕
    ShowBarrage(val) {
      this.showBarrage = val;
    },
    //显示/隐藏控制栏
    Leave() {
      if (!this.$refs.video.paused) {
        this.$refs.control.ShowMenu("");
        this.control = false;
      }
    },
    MouseMove() {
      if (!this.control) {
        this.control = true;
        if (!this.$refs.video.paused) {
          setTimeout(() => {
            this.$refs.control.ShowMenu("");
            this.control = false;
          }, 3000);
        }
      }
    },
    //开启右键菜单
    OpenMenu(e) {
      if (e.target.id === "menu") {
        return;
      }
      this.$refs.menu.OpenMenu(e);
    },
    //关闭右键菜单或者控制视频播放
    CloseMenuOrPlayVideo(e) {
      let id = e.target.id;
      if (id !== "menu") {
        //如果menu打开就关闭menu，否则进行播放暂停
        if (this.$refs.menu.MenuIsShow()) {
          this.$refs.menu.CloseMenu();
        } else {
          if (id === "barrage" || id === "player") {
            this.$refs.control.PlayOrPause();
          }
        }
      }
    },

    //初始化配置
    InitConfig() {
      let config = localStorage.getItem("player-config");
      if (!config) {
        localStorage.setItem(
          "player-config",
          JSON.stringify({
            volume: 80,
            barrage: true,
          })
        );
      }
    },
    //读取配置
    ReadConfig() {
      this.$refs.video.volume = this.playerConfig.volume / 100;
    },
    //获取最大分辨率
    getMaxRes() {
      let resource = this.params.resource;
      if (resource.res1080) return 1080;
      if (resource.res720) return 720;
      if (resource.res480) return 480;
      if (resource.res360) return 360;
    },
    //获取默认的分辨率
    getDefaultRes(res) {
      this.maxRes = this.getMaxRes();
      this.currentRes = this.maxRes >= res ? res : this.maxRes;
      return "res" + this.currentRes;
    },
    //设置分辨率
    SetRes(res) {
      if (this.original) return;
      if (this.currentRes === res) return;
      this.currentRes = res;
      if (this.params.type === "hls") {
        //this.LoadHls(this.params.resource['https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Winston_Recall.mp4']);
      } else {
        if (this.original) {
          // this.$refs.video.src = 'https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Winston_Recall.mp4';
        } else {
          // let res = this.getDefaultRes(this.defaultRes);
          //this.$refs.video.src = 'https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Winston_Recall.mp4'
        }
      }
    },
    LoadHls(src) {
      if (this.hls != null) {
        this.hls.stopLoad();
        this.hls.destroy();
      }
      this.hls = new Hls();
      this.hls.loadSource(src);
      this.hls.attachMedia(this.$refs.video);
      this.hls.on(Hls.Events.ERROR, () => {
        console.log("加载失败");
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加留言
          this.addStayMessage(this.ruleForm.desc);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //公共模块 添加留言并重新刷新留言
    async addStayMessage(content) {
      try {
        const res = await addStayMessageApi(content, 0);
        if (res == undefined) return;
        this.$message.success(res.msg);
        //删除上面textarea内容
        this.ruleForm.desc = "";
        //重新文章下的所有评论
        this.$set(this.query, "page", 1);
        this.selectStayMessageList(this.query);
      } catch (e) {
        this.$message.error(e);
      }
    },
    //获取所有留言列表
    async selectStayMessageList(query) {
      try {
        const res = await selectStayMessageListApi(query);
        if (res == undefined) return;
        //遍历数据展示在留言列表上
        this.stayList = res.data.list;
        this.totalCount = res.data.totalCount || 0;
        this.pageTotal = res.data.totalCount || 0;
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "page", val);
      this.selectStayMessageList(this.query);
    },
  },
  mounted() {
    if (this.params.resource.original) this.original = true;
    if (this.params.type === "hls") {
      if (this.original) {
        this.LoadHls(this.params.resource.original);
      } else {
        //let res = 'https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Winston_Recall.mp4';
        // this.LoadHls(this.params.resource[res]);
      }
    } else {
      if (this.original) {
        // this.$refs.video.src = 'https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Winston_Recall.mp4';
      } else {
        //  let res = this.getDefaultRes(this.defaultRes);
        // this.$refs.video.src = 'https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Winston_Recall.mp4'
      }
    }
    this.control = true;
  },
  created() {
    //获取文章下的所有评论
    this.selectStayMessageList(this.query);
    this.InitConfig();
  },
  beforeDestroy() {
    if (this.hls != null) {
      this.hls.stopLoad();
      this.hls.destroy();
    }
  },
  components: {
    control: BarrageControl,
    barrage: BarrageMain,
    sendBarrage: BarrageSend,
    "context-menu": BarrageMenu,
    "video-info": BarrageVideoInfo,
    "hot-key": BarrageHotKey,
    "webSocket": WebSocket
  },
};
</script>

<style lang="scss" scoped>
.message {
  width: 70%;

  h2 {
    color: #555;
    width: 100%;
    text-align: center;
    margin: 5px 0;
    font-size: 17px;
  }

  .totalBarrage {
    margin-bottom: 18px;
    display: inline-block;
    height: 16px;
    line-height: 1.5;
    font-size: 12px;
  }

  .uncheck {
    width: 100%;
    /**禁止文字选中 */
    -moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    #video {
      height: 100%;
      width: 100%;
      position: relative;
      padding-bottom: 56.25%;
    }

    /**镜像翻转 */
    .player-mirror {
      will-change: transform;
      transform: rotateY(180deg);
      -webkit-transform: rotateY(180deg);
      /* Safari and Chrome */
      -moz-transform: rotateY(180deg);
      /* Firefox */
    }

    .player {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: black;
    }

    .control {
      z-index: 20;
      width: 100%;
      height: 50px;
      background: linear-gradient(rgba(0, 0, 0, 0), #000);
      bottom: 0 !important;
      transition: opacity 1s;
      position: absolute;
      -moz-transition: opacity 1s;
      /* Firefox 4 */
      -webkit-transition: opacity 1s;
      /* Safari 和 Chrome */
      -o-transition: opacity 1s;
      /* Opera */
    }
  }

  .el-form-item__content {
    line-height: 0px !important;
  }

  .commnet-total {
    color: #303133;
    line-height: 36px;
    margin-left: 70px;
  }

  .tips {
    line-height: 2;
    padding: 10px 0 20px;
    border-bottom: 1px solid #ccc;
    margin: 0 0 20px;
  }

  .comment {
    ul {
      padding-left: 70px;
    }

    .who {
      margin-top: 5px;
      line-height: 30px;
      display: flex;
      align-items: center;

      .page {
        margin-right: 10px;
      }

      .user {
        color: #1abc9c;
        margin-right: 10px;
        cursor: pointer;
      }

      .time,
      .exe,
      .sys {
        text-align: center;
        font-size: 12px;
        padding: 0 10px;
        margin-right: 10px;
      }
    }

    .write {
      padding: 10px 0;
      line-height: 18px;
      letter-spacing: 1px;
    }
  }

  .el-form .form-top {
    display: flex;
  }

  .commnet-total {
    color: #303133;
    line-height: 36px;
    margin-left: 70px;
  }

  .el-form .form-top .el-form-item {
    flex: 1;
  }

  .el-form-item__content {
    line-height: 0px !important;
  }
}

.message .ul,
.el-pager {
  padding-left: 0px !important;
}

@media screen and (max-width: 1000px) and (min-width: 0px) {
  .message {
    width: 100%;
    padding: 0 20px;
  }

  .message .form-top {
    flex-direction: column;
  }

  .message .commnet-total {
    margin-left: 0px;
  }

  .message .comment ul {
    padding-left: 0px;
  }

  .message .el-form-item__label {
    text-align: left;
  }

  .message img {
    width: 100%;
  }
}</style>
