<template>
  <div class="chat">
    <div class="left-menu">
      <div class="leftMenu clearTpaErr">
        <div class="chat-list">
          <div
            :class="{
              'active-msg-item': isActive == item.userId,
              'msg-item': true,
            }"
            v-for="(item, key) in messageData"
            :key="key"
            @click="getReplyInfo(item.userId, key)"
          >
            <div class="left">
              <div class="headimg">
                <img :src="item.userImg" />
              </div>
            </div>
            <div class="right">
              <p class="who-name">
                <span class="who-msg">{{ item.userName }}</span
                ><span class="msg-relation">{{
                  item.attention == true ? "已关注" : "陌生人"
                }}</span>
              </p>
              <p class="last-msg">{{ item.content }}</p>
              <div class="time">{{ item.createTime }}</div>
            </div>
          </div>
        </div>
        <div class="blankview" :style="{ display: display }">
          正在努力加载中...
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="rightContent">
        <div class="chat-container">
          <header>
            <div class="chatHeader"><span v-text="userName"></span></div>
          </header>
          <div class="msg-content-box">
            <div class="msg-content">
              <div
                style="
                  height: 100%;
                  width: 100%;
                  padding: 0px;
                  position: relative;
                  overflow: hidden;
                "
              >
                <div
                  style="
                    position: relative;
                    box-sizing: border-box;
                    height: 100%;
                    overflow: auto;
                  "
                  class="scrollContent middle"
                >
                  <div>
                    <div class="chatMsg">
                      <div
                        v-for="item in messagesData"
                        :key="item.secretId"
                        class="msg-item"
                        :class="{
                          'msg-item-right': isActive != item.sendId,
                        }"
                      >
                        <div class="system-prompt">
                          <div class="pure-text">
                            {{ item.createTime }}
                          </div>
                        </div>
                        <div class="text-box">
                          <img
                            :src="
                              isActive != item.sendId
                                ? item.receivedImg
                                : item.sendImg
                            "
                            alt=""
                            class="clearTpaErr"
                          />
                          <div class="msg" v-html="item.messageContent"></div>
                          <div
                            class="is-read"
                            style="line-height: 40px; float: right"
                          >
                            <i
                              :class="{
                                'el-icon-circle-check':
                                  isActive != item.sendId && item.isRead == 1,
                                'el-icon-circle-close':
                                  isActive != item.sendId && item.isRead == 0,
                              }"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="expression-bar">
            <div class="chatToolBar">
              <!-- 这里的stop一定要加 防止事件冒泡 阻止window的click事件点击-->
              <span @click.stop="emojiSwitch" class="emoticon"></span>
              <span class="img-upload"></span>
              <span class="shield"></span>
              <div v-show="emojiShow" class="emoji-panel">
                <i
                  v-for="(emoji, index) in emojiList"
                  :key="index"
                  :class="`em ${emoji}`"
                  @click="selectEmoji(emoji)"
                ></i>
              </div>
            </div>
          </div>
          <div class="send-msg-box">
            <div class="editContent">
              <div class="edit-textarea">
                <div class="Editor">
                  <textarea
                    ref="inputVal"
                    id="messageText"
                    autofocus="autofocus"
                    maxlength="250"
                    @input="descInput"
                    v-model="letterValue"
                  ></textarea>
                </div>
              </div>
              <footer>
                <p>
                  <span>{{ txtVal }}</span
                  >/250
                </p>
                按下Enter发送内容
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import "emoji-awesome/dist/css/google.min.css"; //引入emoji样式
import { selectMessageListApi, selectMessagesListApi } from "api/message";
import { constants } from "@/constants";
import { validEmpty } from "utils/validate";
import { mapState } from "vuex";
import { chatSocket } from "utils/socket";
import emojiList from "@/utils/emoji";
export default {
  data() {
    return {
      messageData: [],
      display: "none",
      isActive: 0,
      txtVal: 0, // 输入字数
      messagesData: [],
      userName: "",
      aisle: "", // 对方频道号
      letterValue: "", // 消息内容
      emojiShow: false, //显示表情
      emojiList: emojiList, //表情列表
      timer: "", //定时器
      chatWs: "", //WebSocket对象
    };
  },
  methods: {
    //获取登陆者用户的所有私信用户(这里写的什么东西需要优化)
    async messageList() {
      try {
        const res = await selectMessageListApi();
        if (res == undefined) return (this.display = "block");
        //所有私信中哪条是给私信者的放在最前面
        let top = res.data.find((item) => {
          return item.userId == this.$route.query.id;
        });
        let index = res.data.findIndex((item) => {
          return item.userId == this.$route.query.id;
        });
        if (index != -1) {
          res.data.splice(index, 1);
          res.data.unshift(top);
        }
        //默认展示第一个用户
        this.isActive = res.data[0].userId;
        this.userName = res.data[0].userName;
        this.messageData = res.data;
      } catch (e) {
        this.display = "block";
        this.$message.error(e);
      }
    },
    //获取私信内容
    async messagesList(sendId) {
      try {
        this.messagesData = []; //点击用户获取信息前进行数据刷新
        const res = await selectMessagesListApi(sendId);
        if (res == undefined) return;
        res.data.forEach((el) => {
          el.messageContent = this.replace_em(el.messageContent);
        });
        this.messagesData = res.data;
        //创建websocket
        this.chatWs = chatSocket(true, this.isActive, this.user.userId);
        this.chatWs.then((ws) => {
          let that = this;
          //连接成功
          ws.$on("CHAT_CONNECT_SUCCESS", function (data) {
            that.aisle = data;
          });

          //推送消息
          ws.$on("PUSH_MSGCONTENT", function (data) {
            data.messageContent = that.replace_em(data.messageContent);
            that.messagesData.push(data);
            //滚动条滑到最底下
            that.$nextTick(() => {
              document.querySelector(".middle").scrollTop =
                that.$el.querySelector(".middle").scrollHeight;
            });
          });

          //增加已读信息
          ws.$on("ADD_IS_READ", (data) => {
            let ids = data;
            if (ids.length > 0) {
              that.messagesData.map((item) => {
                if (ids.indexOf(item.secretId) != -1) {
                  item.isRead = 1;
                }
                return item;
              });
              //通知用户信息
              // that.$notify.info({
              //   title: "消息",
              //   message: "这是一条消息的提示消息",
              // });
            }
          });
        });

        //滚动条滑到最底下
        this.$nextTick(() => {
          document.querySelector(".middle").scrollTop =
            this.$el.querySelector(".middle").scrollHeight;
        });
      } catch (e) {
        this.$message.error(e);
      }
    },
    //运行websocket
    wsStart(content) {
      this.chatWs.then((ws) => {
        ws.send(content);
      });
    },
    //获取私信内容
    getReplyInfo(id, index) {
      //判断是不是第一次获取私信内容,防止重复点击
      if (this.isActive != id) {
        this.isActive = id;
        this.userName = this.messageData[index].userName;
        this.messagesList(id);
      }else{
        //关闭websocket
        // this.chatWs.then((ws) =>{ws.ws.close()});
      }
      this.emojiShow = false;
      //获取焦点
      this.$refs.inputVal.focus();
    },
    // 发送消息
    sendMessage() {
      if (this.letterValue == "" || validEmpty(this.letterValue)) {
        this.$message.error(constants.sendMessageNotNull);
      } else {
        let socketMsg = {
          msg: this.keepTextStyle(this.letterValue),
          data: this.aisle,
        };
        //给websocket发送消息,并绑定用户信息
        this.wsStart(JSON.stringify(socketMsg).trim());
        // this.websocket.send(JSON.stringify(socketMsg).trim());
        //清空发送内容
        this.letterValue = "";
        //清空文字长度
        this.txtVal = 0;
      }
    },
    //处理换行符
    keepTextStyle(val) {
      return (val + "").replace(/\n/g, "");
    },
    //计算teatarea字数
    descInput() {
      this.txtVal = this.letterValue.length;
    },
    // 选择表情
    selectEmoji(emoji) {
      this.emojiShow = false;
      let val = `[${emoji}]`;
      //堆积到输入内容上去
      this.letterValue += val;
      //获取焦点
      this.$refs.inputVal.focus();
    },
    // 表情包显示隐藏
    emojiSwitch() {
      this.emojiShow = !this.emojiShow;
    },
    // 聊天表情转换
    replace_em(str) {
      if (str.includes("[") && str.includes("]")) {
        str = str.replace(
          /\[em-([a-z_]*)\]/g,
          "<span class='em em-$1'/></span>"
        );
      }
      return str;
    },
    //上面四个方法执行完之后在执行某件事
    async afterMethods() {
      await this.messageList();
      await this.messagesList(this.isActive);
    },
  },
  mounted() {
    this.afterMethods();

    // //获取消息列表
    // this.timer = setInterval(() => {
    //   this.messageList();
    // }, 1500);

    //首次进入页面textarea获取焦点
    this.$refs.inputVal.focus();

    document.onkeydown = (e) => {
      let textarea = document.getElementsByTagName("textarea")[0];
      if (
        e.keyCode === 13 &&
        this.$route.name == "chat" &&
        e.target === textarea
      ) {
        this.sendMessage(); //调用查询方法
        return false;
      }
    };

    //监听表情点击
    window.addEventListener("click", () => {
      this.emojiShow = false;
    });
  },

  computed: {
    ...mapState(["user"]),
  },
  destroyed() {
    this.timer && clearInterval(this.timer);

    //关闭websocket
    this.chatWs.then((ws) =>{ws.ws.close()});
  },
};
</script>

<style>
.chat {
  width: 70%;
  /* margin-top: 20px; */
  /* display: -webkit-box;
  display: -ms-flexbox; */
  display: flex;
  border-radius: 8px;
  /* z-index: 99999; */
}

.chat .left-menu {
  width: 320px;
  height: 100%;
  float: left;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  overflow: hidden;
}

.chat .leftMenu {
  width: 100%;
  height: 100%;
  background: #3d3d3d;
  color: #fff;
}

.chat .right-content {
  flex: 1;
  min-width: 480px;
  /* background: rgba(255, 255, 255, 0.3); */
  border: 1px solid #ebebeb;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  background: white;
}

.chat .leftMenu .chat-list {
  height: calc(100% - 72px);
  overflow: auto;
}

.chat .leftMenu .chat-list .msg-item {
  height: 53px;
  background: #3d3d3d;
  padding: 10px 16px;
  border-bottom: 1px solid #2e2e2e;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
}

.chat .leftMenu .blankview {
  color: #bec9d2;
  text-align: center;
}

.chat .leftMenu .chat-list .msg-item:hover {
  background: #2e2e2e;
}

.chat .chatMsg .msg-item .msg:after {
  content: " ";
  position: absolute;
  top: 11px;
  right: 100%;
  border-right: 5px solid #eaeeef;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid transparent;
  width: 0;
  height: 0;
}

.chat .expression-bar {
  height: 34px;
  padding: 0 24px;
}

.chat .leftMenu .chat-list .active-msg-item {
  background: #2e2e2e;
}

.chat .leftMenu .chat-list .msg-item .left {
  width: 56px;
  display: inline-block;
}

.chat .leftMenu .chat-list .msg-item .left .headimg {
  width: 40px;
  height: 40px;
  position: relative;
  top: 50%;
  margin-top: -20px;
}

.chat .leftMenu .chat-list .msg-item .left .headimg img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.chat .leftMenu .chat-list .msg-item .right {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  font-weight: 400;
  font-size: 14px;
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.chat .leftMenu .chat-list .msg-item .right .who-name {
  margin-bottom: 4px;
  display: inline-block;
  font-size: 14px;
}

.chat .leftMenu .chat-list .msg-item .right .who-name .who-msg {
  display: inline-block;
  max-width: 134px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 18px;
  line-height: 18px;
  color: white;
}

.chat .leftMenu .chat-list .msg-item .right .who-name .msg-relation {
  color: #9f9f9f;
  margin-left: 8px;
  display: inline-block;
  height: 18px;
  line-height: 18px;
  padding: 0 8px;
  border-radius: 9px;
  font-size: 11px;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#4e4e4e),
    to(#464646)
  );
  background: linear-gradient(1turn, #4e4e4e, #464646);
  vertical-align: top;
}

.chat .leftMenu .chat-list .msg-item .right .last-msg {
  color: #999;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  margin-top: 10px;
}

.chat .leftMenu .chat-list .msg-item .right .time {
  position: absolute;
  right: 0;
  top: 0;
  color: #999;
  font-size: 12px;
  line-height: 20px;
}

.chat .right-content {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-width: 480px;
}

.chat .rightContent {
  height: 100%;
}

.chat .chatToolBar {
  height: 100%;
  position: relative;
}

.chat .chatToolBar > span {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 15px;
  cursor: pointer;
  background: url(../../assets/chat/talk.png);
  background-size: 164px 56px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.chat .chatToolBar > .emoticon {
  background-position: 0 1px;
}

.chat .chatToolBar > .shield {
  background-position: 92px 1px;
}

.chat .chatToolBar > .img-upload {
  background-position: 128px 1px;
}

.chat .rightContent .chat-container,
.rightContent {
  height: 100%;
}

.chat .chat-container header {
  height: 64px;
  border-bottom: 1px solid #ebebeb;
  padding-left: 24px;
  line-height: 64px;
  color: #3d3d3d;
  font-size: 16px;
}

.chat .chatHeader {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 20px;
}

.chat .chatHeader span {
  cursor: pointer;
}

.chat .rightContent .chat-container .msg-content-box {
  height: calc(100vh - 443px);
  position: relative;
}

.chat .rightContent .chat-container .msg-content-box .msg-content {
  height: 100%;
  border-bottom: 1px solid #ebebeb;
}

.scrollContent::-webkit-scrollbar {
  width: 0 !important;
}

.chat .chatMsg {
  width: 100%;
  padding-top: 10px;
  padding-left: 24px;
  box-sizing: border-box;
}

.chat .chatMsg .msg-item {
  overflow: hidden;
  padding: 8px 0;
}

.chat .chatMsg .msg-item .system-prompt {
  text-align: center;
  font-size: 12px;
  color: #999;
}

.chat .chatMsg .msg-item .system-prompt .pure-text {
  padding-bottom: 8px;
}

.chat .chatMsg .msg-item img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: block;
  float: left;
  cursor: pointer;
}

.chat .chatMsg .msg-item-right .msg-err,
.chat .chatMsg .msg-item-right img {
  float: right;
}

.chat .chatMsg .msg-item .msg {
  float: left;
  line-height: 24px;
  padding: 8px 16px;
  max-width: 424px;
  font-size: 14px;
  color: #8b4513;
  background: #f5f6f7;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-left: 8px;
  word-break: break-word;
  position: relative;
  white-space: pre-wrap;
}

.chat .chatMsg .msg-item-right .msg {
  float: right;
  color: #fff;
  background: #5cacde;
  margin-right: 8px;
}

.chat .clearTpaErr {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.chat .chatMsg .msg-item-right .msg:after {
  content: " ";
  position: absolute;
  top: 11px;
  left: 100%;
  border-left: 5px solid #5cacde;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid transparent;
  width: 0;
  height: 0;
}

.chat .rightContent .chat-container .send-msg-box {
  height: 146px;
}

.chat .editContent {
  height: 100%;
}

.chat .editContent .edit-textarea {
  height: calc(100% - 40px);
  padding: 8px;
}

.chat .Editor {
  width: 100%;
  height: 100%;
}

.chat .Editor #messageText {
  position: relative;
  margin-right: 2px;
  font: 14px/1.5 Helvetica, Arial, Tahoma, 微软雅黑;
  width: 100%;
  height: 106px;
  outline: none;
  background: #fff;
  border: 0 none;
  overflow-y: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  resize: none;
  vertical-align: middle;
  display: inline-block;
}

.chat .editContent footer {
  height: 40px;
  text-align: right;
  padding: 0 24px;
  line-height: 40px;
  font-size: 12px;
  color: #ccc;
}

.chat .editContent footer p {
  float: left;
}

.chat .emoji-panel {
  position: absolute;
  bottom: 100%;
  /* left: 5px; */
  width: 390px;
  padding-bottom: 10px;
  border: 1px solid #ececec;
  margin-bottom: 5px;
  background-color: #ffffff;
  box-shadow: 1px 0 16px 0 rgba(0, 0, 0, 0.05);
}

.chat .chatToolBar .em {
  width: 28px;
  height: 28px;
  padding: 4px;
  margin-top: 10px;
  margin-left: 10px;
  box-sizing: border-box;
}

.chat .chatToolBar .em:hover {
  background-color: #ececec;
  cursor: pointer;
}
</style>
