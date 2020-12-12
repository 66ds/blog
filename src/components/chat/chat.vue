<template>
    <div class="chat">
        <div class="left-menu">
            <div class="leftMenu clearTpaErr">
                <div class="chat-list">
                    <div class="chatListMenu __vuescroll"
                         style="height: 100%; width: 100%; padding: 0px; position: relative; overflow: hidden;">
                        <div style="position: relative; box-sizing: border-box; height: 100%; overflow: hidden;">
                            <div class="__view"
                                 style="position: relative; box-sizing: border-box; min-width: 100%; min-height: 100%;">
                                <div style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;">
                                    <object type="text/html" tabindex="-1" data="about:blank"
                                            style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;"></object>
                                </div>
                                <div  :class="{'active-msg-item':isActive == item.userId,'msg-item':true}" v-for="(item,key) in messageData" :key="key" @click="getReplyInfo(item.userId,key)">
                                    <div class="left">
                                        <div class="headimg"><img
                                                :src="item.userImg">
                                            <!----></div>
                                    </div>
                                    <div class="right"><p class="who-name">
                                        <span class="who-msg">{{item.userName}}</span><span
                                            class="msg-relation">{{item.attention == true?'已关注':'陌生人'}}</span>
                                    </p>
                                        <p class="last-msg">{{item.content}}</p>
                                        <div class="time">{{item.createTime}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="blankview" :style="{display:display}">正在努力加载中...</div>
            </div>
        </div>
        <div class="right-content">
            <div class="rightContent">
                <div class="chat-container">
                    <header>
                        <div  class="chatHeader"><span v-text="userName"></span></div>
                    </header>
                    <div class="msg-content-box">
                        <div class="msg-content">
                            <div class="historyMenu __vuescroll"
                                 style="height: 100%; width: 100%; padding: 0px; position: relative; overflow: hidden;">
                                <div style="position: relative; box-sizing: border-box; height: 100%;overflow: auto" class="scrollContent middle">
                                        <div class="__view" style="position: relative; box-sizing: border-box; min-width: 100%; min-height: 100%;">
                                            <div class="chatMsg"><!---->
                                                <div class="msg-item" v-for="(item,key) in messagesData" :key="key" :class="{'msg-item-right':isActive != item.sendId,'msg-item':true}">
                                                    <div class="system-prompt">
                                                        <div class="pure-text">{{item.createTime | changeTime('yyyy-MM-dd hh:mm:ss')}}</div>
                                                    </div><!----><!----><!---->
                                                    <div class="text-box"><img :src="isActive != item.sendId?item.receivedImg:item.sendImg" alt=""
                                                                               class="clearTpaErr">
                                                        <div class="msg">{{item.messageContent}}
                                                        </div><!----></div><!----><!----></div>
                                            </div>
                                            <div style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;">
                                                <object type="text/html" tabindex="-1" data="about:blank"
                                                        style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;"></object>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div><!---->
                    </div>
                    <div class="send-msg-box">
                        <div class="editContent">
                            <div  class="edit-textarea">
                                <div  class="Editor"><textarea id="messageText" autofocus="autofocus" maxlength="500" @keyup.enter='sendMessage' v-model="letterValue"></textarea></div>
                            </div>
                            <footer><p><span>0</span>/500
                            </p>按下Enter发送内容
                            </footer>
                        </div>
                    </div>
                </div>
            </div><!----></div>
    </div>
</template>

<script>

    import {selectMessageListApi,selectMessagesListApi} from './../../api/message'

    export default {
        data() {
            return {
               messageData:[],
               display:'none',
               isActive:0,
               messagesData:[],
               userName:'',
               websocket: null, // WebSocket对象
               aisle: "", // 对方频道号
               letterValue: "" // 消息内容
            }
        },
        methods: {
            //获取登陆者用户的所有私信用户
            async messageList() {
                try {
                    const res = await selectMessageListApi();
                    if (res == undefined) return this.display = 'block'
                    //所有私信中哪条是给私信者的放在最前面
                    let top = res.data.find(item =>{
                        return item.userId == this.$route.query.id;
                    })
                    let index = res.data.findIndex(item =>{
                        return item.userId == this.$route.query.id;
                    })
                    if(index != -1){
                        res.data.splice(index,1);
                        res.data.unshift(top)
                    }
                    //默认展示第一个用户
                    this.isActive = res.data[0].userId
                    this.userName = res.data[0].userName
                    this.messagesList(this.isActive)
                    this.messageData = res.data;
                } catch (e) {
                    this.display = 'block'
                    this.$message.error(e)
                }
            },
            //获取私信内容
            async messagesList(sendId){
                try{
                    const res = await selectMessagesListApi(sendId);
                    if (res == undefined) return
                    this.messagesData = res.data
                    //连接websocket进行通信
                    this.conectWebSocket();
                    //滚动条滑到最底下
                    this.$nextTick(()=>{
                        document.querySelector('.middle').scrollTop = this.$el.querySelector('.middle').scrollHeight;
                    })
                }catch (e){
                   this.$message.error(e)
                }
            },
            //获取私信内容
            getReplyInfo(id,index){
                this.isActive = id;
                this.userName = this.messageData[index].userName
                this.messagesList(id)
            },
            //连接websocket
            conectWebSocket(){
                if ("WebSocket" in window) {
                    this.websocket = new WebSocket("ws://127.0.0.1:12000/websocket/"+this.isActive+"/"+this.$store.getters.getUser.userId+"/");
                } else {
                    this.$message.error("不支持建立socket连接");
                }
                //连接发生错误的回调方法
                this.websocket.onerror = () =>{

                };
                //连接成功建立的回调方法
                this.websocket.onopen = () => {

                };
                //接收到消息的回调方法
                this.websocket.onmessage = (event)=> {
                    let object = JSON.parse(event.data);
                    if (object.type == 0) {
                        // 提示连接成功
                        this.aisle = object.aisle
                    }
                    if (object.type == 1) {
                        //重新显示私信内容
                       this.messagesList(this.isActive);
                        //重新获取登陆者用户的所有私信用户(这里为了获取最新的消息)
                       this.messageList();
                    }
                };
                //连接关闭的回调方法
                this.websocket.onclose = () =>{};
                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                window.onbeforeunload = () =>{
                    this.websocket.close();
                };
            },
            // 发送消息
            sendMessage() {
                let socketMsg = { msg: this.keepTextStyle(this.letterValue), aisle: this.aisle };
                this.websocket.send(JSON.stringify(socketMsg));
                //清空发送内容
                this.letterValue = ''
            },
            //处理换行符
            keepTextStyle(val){
                return  (val + '').replace(/\n/g,"")
            }

        },
        created() {
            this.messageList();
        },
        filters: {
            changeTime(dateTime, fmt) {
                var dateTime = new Date(dateTime);
                var o = {
                    "M+": dateTime.getMonth() + 1,               //月份
                    "d+": dateTime.getDate(),                    //日
                    "h+": dateTime.getHours(),                   //小时
                    "m+": dateTime.getMinutes(),                 //分
                    "s+": dateTime.getSeconds(),                 //秒
                    "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度
                    "S": dateTime.getMilliseconds()             //毫秒
                };

                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp(`(${k})`).test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;

            }
        }
    }
</script>

<style>
    .chat {
        width: 65%;
        margin-top: 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-radius: 8px;
    }

    .chat .left-menu {
        width: 320px;
        height: 100%;
        float: left;
    }

    .chat .leftMenu{
        width: 100%;
        height: 100%;
        background: #3d3d3d;
        color: #fff;
    }

    .chat .right-content {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        min-width: 480px;
        background: rgba(255, 255, 255, 0.3);
        border: 1px solid #ebebeb;
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

    .chat .leftMenu .chat-list .msg-item:hover{
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
        background: -webkit-gradient(linear, left bottom, left top, from(#4e4e4e), to(#464646));
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

    .chat .rightContent .chat-container, .rightContent {
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
        height: calc(100vh - 425px);
        position: relative;
    }

    .chat .rightContent .chat-container .msg-content-box .msg-content {
        height: 100%;
        border-bottom: 1px solid #ebebeb;
        overflow: auto;
    }

    .scrollContent::-webkit-scrollbar {
        width: 0 !important;
    }

    .chat .chatMsg {
        width: 100%;
        padding-top:10px;
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

    .chat .chatMsg .msg-item-right .msg-err, .chat .chatMsg .msg-item-right img {
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
        -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
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

</style>
