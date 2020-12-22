<template>
    <common :data="whoAttentionInfo">
        <div class="msg-list">
            <ul>
                <li class="msg-read" v-for="(item,key) in whoAttentionInfo" :key="key">
                                    <span class="msg-title">
                                        <a target="_blank" href="https://me.csdn.net/weixin_38751861"
                                           v-for="(user,j) in item.users" :key="j">{{user.userName}}</a>
                                        等{{item.users.length}}人回复了你的评论</span>
                    <a class="btn-rush csdnc-trash" href="#"> <i class="el-icon-delete"></i></a>
                    <p class="msg-text clearfix"><span class="bb-span-wrap"><a
                            href="https://www.csdn.net/apps/download?code=blink_1555313595"
                            target="_blank">{{item.articleTitle}}</a></span><em>{{item.createTime}}</em>
                    </p>
                </li>
            </ul>
        </div>
    </common>
</template>

<script>
    import common from 'person/msg/common/common'
    import {getNoReadCommentInfoApi} from 'api/comments'

    export default {
        data() {
            return {
                whoAttentionInfo: []
            }
        },
        methods: {
            //获取未读评论
            async getWhoAttentionInfo() {
                try {
                    const res = await getNoReadCommentInfoApi();
                    if (res == undefined) return
                    this.whoAttentionInfo = res.data;
                } catch (e) {
                    this.$message.error(e);
                }
            }
        },
        components: {
            common
        },
        created() {
            this.getWhoAttentionInfo();
        }
    }
</script>

<style>

</style>
