<template>
    <common :data="whoDigMeInfo" @deleteAll="deleteAll">
        <div class="msg-list">
            <ul>
                <li class="msg-read" v-for="(item,key) in whoDigMeInfo" :key="key">
                                    <span class="msg-title">
                                        <a target="_blank" :href="['/person-blog/'+user.userId]"
                                           v-for="(user,j) in item.users" :key="j">{{user.userName}}</a>
                                        等{{item.users.length}}人点赞了你的{{item.alias == 1?'文章':'评论'}}</span>
                    <a class="btn-rush csdnc-trash" href="javascript:void(0)" @click="deleteAll([{alias:item.alias,data:item.ids}])"> <i class="el-icon-delete"></i></a>
                    <p class="msg-text clearfix"><span class="bb-span-wrap"><a :href="['/content/'+item.articleId]" target="_blank">{{item.content}}</a></span><em>{{item.createTime}}</em></p>
                </li>
            </ul>
        </div>
    </common>
</template>

<script>
    import common from 'person/msg/common/common'
    import {getWhoDigMeInfoApi} from 'api/like-article'

    export default {
        data() {
            return {
                whoDigMeInfo: []
            }
        },
        methods: {
            //获取谁点赞我的信息
            async getWhoDigMeInfo() {
                try {
                    const res = await getWhoDigMeInfoApi();
                    if (res == undefined) return;
                    this.whoDigMeInfo = res.data;
                } catch (e) {
                    this.$message.error(e);
                }
            },
            //清空信息(单个和多个)
            deleteAll(Ids){
                // 二次确认删除
                this.$confirm('确定要清空删除吗？', '提示', {
                    type: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    return deleteNoReadCommentInfoApi(Ids)
                }).then(res => {
                    if(res == undefined) return;
                    this.$message.success(res.msg);
                    this.getNoReadCommentInfo();
                }).catch((e) => {
                    this.$message.error(e);
                });
            }
        },
        components: {
            common
        },
        created() {
            this.getWhoDigMeInfo();
        }
    }
</script>

<style>

</style>
