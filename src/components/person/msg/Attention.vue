<template>
    <common :data="whoAttentionMeInfo" @deleteAll="deleteAll">
        <div class="msg-list">
            <ul>
                <li class="msg-read animated fadeInUp" v-for="(item,key) in whoAttentionMeInfo" :key="key">
                                    <span class="msg-title">
                                        <a target="_blank" :href="['/person-blog/'+user.userId]"
                                           v-for="(user,j) in item.users" :key="j">{{user.userName}}</a>
                                        等{{item.users.length}}人关注了你</span>
                    <a class="btn-rush csdnc-trash" href="javascript:void(0)" @click="deleteAll(item.ids)"> <i class="el-icon-delete"></i></a>
                    <p class="msg-text clearfix"><span class="bb-span-wrap"></span><em>{{item.createTime}}</em></p>
                </li>
            </ul>
        </div>
    </common>
</template>

<script>
    import common from 'components/person/msg/common/Common'
    import {getWhoAttentionMeInfoApi,deleteWhoAttentionMeInfoApi} from 'api/attention'

    export default {
        data() {
            return {
                whoAttentionMeInfo: []
            }
        },
        methods: {
            //获取谁关注我信息
            async getWhoAttentionMeInfo() {
                try {
                    const res = await getWhoAttentionMeInfoApi();
                    if (res == undefined) return;
                    this.whoAttentionMeInfo = res.data;
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
                    return deleteWhoAttentionMeInfoApi(Ids)
                }).then(res => {
                    if(res == undefined) return;
                    this.$message.success(res.msg);
                    this.getWhoAttentionMeInfo();
                }).catch((e) => {
                    this.$message.error(e);
                });
            }
        },
        components: {
            common
        },
        created() {
            this.getWhoAttentionMeInfo();
        }
    }
</script>

<style>

</style>
