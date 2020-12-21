<template>
    <div class="person-message">
        <div class="content el-row animated fadeIn">
            <div class="left_box">
                <ul class="aside" style="list-style: none">
                    <li class="list"><a href="https://i.csdn.net/#/msg/index" class="zl"><span>评论</span></a></li>
                    <li class="list router-link-active"><a  href="https://i.csdn.net/#/msg/attention" class="zl"><span>关注</span></a> <!----> <!----></li>
                    <li class="list"><a href="https://i.csdn.net/#/msg/like" class="zl"><span>点赞</span></a></li>
                    <li class="list"><a href="https://im.csdn.net/chat" target="_blank" class="zl"><span>私信</span></a></li>
                    <li class="list"><a href="https://i.csdn.net/#/msg/notice" class="zl"><span>系统通知</span></a></li>
                </ul>
            </div>
            <div class="view-container">
                <div class="msg-content view">
                    <div class="msg-all">
                        <!--<div class="msg-message">-->
                        <!--&lt;!&ndash;<svg aria-hidden="true" class="icon csdnc-monkey">&ndash;&gt;-->
                        <!--&lt;!&ndash;<use xlink:href="#csdnc-monkey-pixel"></use>&ndash;&gt;-->
                        <!--&lt;!&ndash;</svg>&ndash;&gt;-->
                        <!--&lt;!&ndash;<p>空空如也</p>&ndash;&gt;-->
                        <!---->
                        <!--</div>-->
                        <div class="msg-info clearfix msg-info-wrap"><a>清空所有消息</a></div>
                        <div class="msg-list">
                            <ul>
                                <li class="msg-read" v-for="(item,key) in noReadCommentInfo" :key="key">
                                    <span class="msg-title">
                                        <a target="_blank" href="https://me.csdn.net/weixin_38751861" v-for="(user,j) in item.users" :key="j">{{user.userName}}</a>
                                        等{{item.users.length}}人回复了你的评论</span>
                                    <a class="btn-rush csdnc-trash" href="#"> <i class="el-icon-delete"></i></a>
                                    <p class="msg-text clearfix"><span class="bb-span-wrap"><a
                                            href="https://www.csdn.net/apps/download?code=blink_1555313595"
                                            target="_blank">{{item.articleTitle}}</a></span><em>{{item.createTime}}</em>
                                    </p></li>
                            </ul>
                        </div>
                        <div class="page-box">
                            <div class="pagination">
                                <el-pagination
                                        layout="prev, pager, next"
                                        :current-page="query.page"
                                        :page-size="query.limit"
                                        :total="pageTotal"
                                        @current-change="handlePageChange"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getNoReadCommentInfoApi} from '../../api/comments'
    export default {
        data() {
            return {
                query: {
                    page: 1,
                    limit: 10
                },
                pageTotal: 0,
                noReadCommentInfo:[]
            }
        },
        methods: {
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page', val)
            },
            //获取未读评论
            async getNoReadCommentInfo(){
                try {
                    const res = await getNoReadCommentInfoApi();
                    if(res == undefined) return
                    this.noReadCommentInfo = res.data;
                    console.log(this.noReadCommentInfo)
                }catch (e) {
                    this.$message.error(e);
                }
            }
        },
        components: {},
        created() {
            this.getNoReadCommentInfo();
        }
    }
</script>

<style>
    .person-message {
        width: 65%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .person-message .left_box {
        width: 159px;
        float: left;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }

    .person-message .left_box .aside {
        background: #fff;
        border: 1px solid #EBEEF5;
        padding-top: 16px;
        border-radius: 2px;
        background-color: unset;
    }

    .person-message .left_box .aside li {
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        color: #4d4d4d;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0 auto 16px;
        position: relative;
        border-radius: 17.5px;
        text-align: center;
    }


    .person-message .left_box .aside li .zl {
        font-size: 14px;
        color: #4d4d4d;
        display: inline-block;
        height: 35px;
        line-height: 35px;
        width: 100%;
        font-family: PingFangSC-Regular, PingFang SC !important;
        font-weight: 400;
    }

    .person-message .left_box .aside li .zl:hover {
        color: #409EFF;
    }

    .person-message .view-container {
        border: 1px solid #EBEEF5;
        position: relative;
        margin-left: 168px;
        padding: 24px 16px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        min-height: 480px;
        background-color: unset;
    }

    .person-message .msg-message {
        padding-top: 80px;
        text-align: center;
        color: #656565;
    }

    .person-message .msg-info-wrap {
        margin-bottom: 8px;
    }


    .person-message .msg-info a {
        display: inline-block;
        color: #4a90e2;
        float: right;
        cursor: pointer;
    }

    .person-message .clearfix {
        display: block;
        overflow: hidden;
        zoom: 1;
    }

    .person-message .msg-list {
        padding: 0 0 0 15px;
        min-height: 370px;
    }

    .person-message .msg-list ul {
        font-size: 14px;
        list-style: none;
    }

    .person-message .msg-list ul li {
        position: relative;
        padding: 16px 0;
        border-bottom: 1px solid #e0e0e0;
    }

    .person-message .msg-message p {
        font-size: 14px;
    }


    .person-message .msg-type {
        display: inline-block;
        height: 20px;
        line-height: 18px;
        padding: 0 5px;
        color: #4d4d4d;
        font-size: 12px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        vertical-align: top;
    }

    .person-message .msg-list ul li .msg-title {
        width: 80%;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
        color: #4d4d4d;
    }

    .person-message .msg-list ul li .msg-title a {
        display: inline-block;
        margin-right: 8px;
    }

    .person-message .msg-list .msg-read a, .msg-list .msg-unread a {
        color: #3399ea;
    }

    .person-message .msg-list .btn-rush {
        color: #999 !important;
    }

    .person-message .btn-rush {
        position: absolute;
        right: 0;
        top: 20px;
        color: #999;
    }

    .person-message .msg-list ul li .msg-text {
        display: block;
        margin-top: 8px;
        padding: 0;
        color: #4d4d4d;
    }

    .person-message .msg-list ul li .msg-text span {
        width: 80%;
        position: relative;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .person-message .msg-list ul li .msg-text span a {
        color: #4d4d4d;
    }

    .person-message .msg-list ul li .msg-text em, .msg-list ul li .msg-text span {
        display: inline-block;
    }

    .person-message .msg-list em {
        display: inline-block;
        font-style: normal;
        color: #ccc;
        float: right;
    }

    .person-message .page-box {
        width: 100%;
        margin: 32px 0 20px;
        text-align: center;
    }

    @media screen and (max-width: 768px) and (min-width: 0px) {
        .person-message {
            width: 100%;
            padding: 0 20px;
        }

        .person-message .left_box {
            z-index: 999;
            left: 0;
            top: 20%;
            width: 30%;
            background-color: #fff;
            padding: 0;
            position: fixed;
        }

        .person-message .view-container {
            width: 100%;
            margin-left: 0px;
            padding: 0px;
        }
    }


</style>
