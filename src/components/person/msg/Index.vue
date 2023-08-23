<template>
    <common :data="noReadCommentInfo" @deleteAll="deleteAll">
        <div class="msg-list">
            <ul>
                <li class="msg-read animated fadeInUp" v-for="(item,key) in noReadCommentInfo" :key="key">
                                    <span class="msg-title">
                                        <a target="_blank" :href="['/person-blog/'+user.userId]"
                                           v-for="(user,j) in item.users" :key="j">{{user.userName}}</a>
                                        等{{item.users.length}}人回复了你的评论</span>
                    <a class="btn-rush csdnc-trash" href="javascript:void(0)" @click="deleteAll(item.Ids)"> <i class="el-icon-delete"></i></a>
                    <p class="msg-text clearfix"><span class="bb-span-wrap"><a :href="['/content/'+item.articleId]" target="_blank">{{item.articleTitle}}</a></span><em>{{item.createTime}}</em></p>
                </li>
            </ul>
        </div>
    </common>
</template>

<script>
    import common from 'components/person/msg/common/Common'
    import {getNoReadCommentInfoApi,deleteNoReadCommentInfoApi} from 'api/comments'

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
                    if (res == undefined) return;
                    this.noReadCommentInfo = res.data;
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
            this.getNoReadCommentInfo();
        }
    }
</script>

<style>

</style>
