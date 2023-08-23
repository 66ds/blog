<template>
    <common :data="whoDigMeInfo" @deleteAll="deleteAll">
        <div class="msg-list">
            <ul>
                <li class="msg-read animated fadeInUp" v-for="(item,key) in whoDigMeInfo" :key="key">
                                    <span class="msg-title">
                                        <a target="_blank" :href="['/person-blog/'+user.userId]"
                                           v-for="(user,j) in item.users" :key="j">{{user.userName}}</a>
                                        等{{item.users.length}}人点赞了你的{{item.alias == 1?'文章':'评论'}}</span>
                    <a class="btn-rush csdnc-trash" href="javascript:void(0)" @click="deletes(item)"> <i class="el-icon-delete"></i></a>
                    <p class="msg-text clearfix"><span class="bb-span-wrap"><a :href="['/content/'+item.articleId]" target="_blank">{{item.content}}</a></span><em>{{item.createTime}}</em></p>
                </li>
            </ul>
        </div>
    </common>
</template>

<script>
    import common from 'views/person/msg/common/Common'
    import {getWhoDigMeInfoApi,deleteWhoDigMeInfoApi} from 'api/likeArticle'

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
                    return deleteWhoDigMeInfoApi(Ids)
                }).then(res => {
                    if(res == undefined) return;
                    this.$message.success(res.msg);
                    this.getWhoDigMeInfo();
                }).catch((e) => {
                    this.$message.error(e);
                });
            },
            deletes(item){
                let str='{'+item.alias+':['+item.ids+']}'
                let obj=eval("("+str+")");
                this.deleteAll([obj])
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
