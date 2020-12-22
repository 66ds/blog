<template>
    <div class="msg-content view animated fadeIn">
        <div class="msg-all">
            <div class="msg-message" v-if="noReadCommentInfo.length == 0">
                <p>空空如也</p>
            </div>
            <div class="msg-info clearfix msg-info-wrap" v-if="noReadCommentInfo.length>0"><a>清空所有消息</a></div>
            <div class="msg-list" v-if="noReadCommentInfo.length>0">
                <ul>
                    <li class="msg-read" v-for="(item,key) in noReadCommentInfo" :key="key">
                                    <span class="msg-title">
                                        <a target="_blank" href="https://me.csdn.net/weixin_38751861"
                                           v-for="(user,j) in item.users" :key="j">{{user.userName}}</a>
                                        等{{item.users.length}}人回复了你的评论</span>
                        <a class="btn-rush csdnc-trash" href="#"> <i class="el-icon-delete"></i></a>
                        <p class="msg-text clearfix"><span class="bb-span-wrap"><a
                                href="https://www.csdn.net/apps/download?code=blink_1555313595"
                                target="_blank">{{item.articleTitle}}</a></span><em>{{item.createTime}}</em>
                        </p></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {getNoReadCommentInfoApi} from 'api/comments'

    export default {
        data() {
            return {
                noReadCommentInfo: []
            }
        },
        methods: {
            //获取未读评论
            async getNoReadCommentInfo() {
                try {
                    const res = await getNoReadCommentInfoApi();
                    if (res == undefined) return
                    this.noReadCommentInfo = res.data;
                    console.log(this.noReadCommentInfo)
                } catch (e) {
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

</style>
