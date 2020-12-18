<template>
    <div class="person-blog">
        <div class="left animated fadeIn">
            <div v-loading="loading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 1)"></div>
            <el-card class="left-box-card" v-for="item in tableData" :key="item.articleId">
                <div><a href="javascript:void(0)" @click="articleDetail(item.articleId)">{{item.articleTitle}}</a></div>
                <div>
                    <el-link icon="el-icon-user">作者:{{item.userNickname}}</el-link>&nbsp;|&nbsp;
                    <el-link icon="el-icon-time">发表于:{{item.articleDate}}</el-link>&nbsp;|&nbsp;
                    <el-link icon="el-icon-s-unfold">分类:{{item.sortName}}</el-link>&nbsp;|&nbsp;
                    <el-link icon="el-icon-view">阅读量:{{item.articleViews}}</el-link>&nbsp;|&nbsp;
                    <el-link icon="el-icon-chat-line-round">评论数:{{item.articleCommentCount}}</el-link>&nbsp;|&nbsp;
                    <el-link icon="el-icon-chat-line-round">赞数:{{item.articleLikeCount}}</el-link>
                </div>
                <div v-html="item.articleIntroduce">
                </div>
                <div>
                    <el-tag v-for="(label,i) in item.labelsEntityList" :key="label.labelId" :type="typeClass(i)">
                        {{label.labelName}}
                    </el-tag>
                </div>
            </el-card>
            <div class="pagination" v-if="!loading">
                <el-pagination
                        layout="prev, pager, next"
                        :current-page="query.page"
                        :page-size="query.limit"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>

        </div>
        <div class="right animated fadeIn">
            <el-card class="right-box-card">
                <div slot="header" class="clearfix" style="height: 40px;">
                    <el-avatar :size="40" :src="userCardData.userImg" style="float: left;margin-right: 10px;"></el-avatar><span style="float: left;line-height: 40px">{{userCardData.userName}}的名片</span>
                </div>
                <div class="item" style="display: flex">
                    <dl class="text-align">
                        <dt><span class="count"></span>{{userCardData.userName}}</dt>
                        <dd>昵称</dd>
                    </dl>
                    <dl class="text-align">
                        <dt><span class="count"></span>{{userCardData.allArticlesNumber}}</dt>
                        <dd>文章</dd>
                    </dl>
                    <dl class="text-align">
                        <dt><span class="count"></span>{{userCardData.allArticlesLikeNumber}}</dt>
                        <dd>赞数</dd>
                    </dl>
                    <dl class="text-align">
                        <dt><span class="count"></span>{{userCardData.allArticleViewsNumber}}</dt>
                        <dd>访问</dd>
                    </dl>
                    <dl class="text-align">
                        <dt><span class="count"></span>{{userCardData.allArticlesCommentsNumber}}</dt>
                        <dd>评论</dd>
                    </dl>
                </div>
                <div class="item">
                    <el-button type="info" @click="sendLetter">私信</el-button>
                    <el-button type="danger" @click="follow" v-if="isFollow">关注</el-button>
                    <el-button @click="follow" v-else>已关注</el-button>
                </div>
            </el-card>
            <el-card class="right-box-card">
                <div slot="header" class="clearfix">
                    <i class="el-icon-star-on" style="color: red"></i>&nbsp;<span>最热文章</span>
                </div>
                <div class="item">
                    <el-link :underline="false"  v-for="(item,key) in newTableHotData" :key="key"><i>{{key+1}}</i>{{item.articleIntroduce}}</el-link>
                </div>
            </el-card>
            <el-card class="right-box-card">
                <div slot="header" class="clearfix">
                    <i class="el-icon-star-on" style="color: red"></i>&nbsp;<span>最新文章</span>
                </div>
                <div class="item">
                    <el-link :underline="false" v-for="(item,key) in newTableData" :key="key"><i>{{key+1}}</i>{{item.articleIntroduce}}</el-link>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {articlesListApi,selectHotListApi} from 'api/articles'
    import {userCardInfoById} from 'api/users'
    import {saveSecretMessageApi} from 'api/message'
    import {saveAttentionInfoApi,selectAttentionInfoApi} from 'api/attention'

    export default {
        data() {
            return {
                tableData: [],
                newTableData:[],
                newTableHotData:[],
                userCardData:{},
                query: {
                    page: 1,
                    limit: 10,
                    userId:this.$route.params.id
                },
                pageTotal: 0,
                loading: true,
                isFollow:true
            }
        },
        methods: {
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page', val);
                this.articlesList()
            },
            //获取所有文章
            async articlesList() {
                try {
                    this.loading = true;
                    const res = await articlesListApi(this.query)
                    if(res == undefined) return
                    if(res.data.list.length == 0){
                        this.$message.warning("该用户暂时还没有发表文章o~")
                    }
                    this.tableData = res.data.list;
                    this.pageTotal = res.data.totalCount || 0;
                    this.loading = false;
                    //当前页数为1
                    if(this.query.page == 1){
                        this.newTableData = res.data.list
                    }
                }catch (e) {
                    this.loading = false;
                    this.$message.error(e)
                }
            },
            //查询10条最火文章
            async selectHotList(userId) {
                try {
                    const res = await selectHotListApi(userId);
                    if(res == undefined) return
                    this.newTableHotData = res.data.list
                }catch (e) {
                    this.$message.error(e)
                }
            },
            //获取某用户的名片信息
            async userCardInfo(userId){
                try {
                    const res = await userCardInfoById(userId);
                    if(res == undefined) return;
                    this.userCardData = res.data;
                }catch (e) {
                    this.$message.error(e)
                }
            },
            //添加用户的关注信息
            async saveAttentionInfo(attentionId){
                try{
                    if(this.$store.getters.getUser != null && attentionId == this.$store.getters.getUser.userId){
                        return this.$message.success("不能关注自己o~")
                    }else{
                        const res = await saveAttentionInfoApi(attentionId)
                        if(res == undefined) return;
                        this.isFollow = !this.isFollow;
                        this.$message.success(res.msg);
                    }
                }catch (e) {
                    this.$message.error(e)
                }
            },
            //判断登陆者是不是关注了其它用户
            async selectAttentionInfo(attentionId){
                try{
                    const res = await selectAttentionInfoApi(attentionId)
                    if(res == undefined) return;
                    if(res.data != null){
                        this.isFollow = !this.isFollow;
                    }
                }catch (e) {
                    this.$message.error(e)
                }
            },
            //添加私信(普通用户)
            async saveSecretMessage(){
                try{
                    const res = await saveSecretMessageApi({
                        sendId:this.query.userId
                    })
                    if (res == undefined) return
                    this.$router.push({path:'/chat',query:{id:this.query.userId}})
                }catch (e) {
                    this.$message.error(e)
                }
            },
            typeClass(i) {
                if (i / 2 % 2 == 0) {
                    return ""
                }
                if (i / 2 % 2 == 1) {
                    return "success"
                }
                if ((i - 1) / 2 % 2 == 0) {
                    return "warning"
                }
                if ((i - 1) / 2 % 2 == 1) {
                    return "danger"
                }
            },
            articleDetail(id) {
                this.$router.push({
                    path: "/content/"+id
                })
            },
            //私信别人
            sendLetter(){
                this.saveSecretMessage()
            },
            //关注别人
            follow(){
                this.saveAttentionInfo(this.query.userId)
            },
        },
        created() {
            this.articlesList()
            this.selectHotList(this.query.userId);
            this.userCardInfo(this.query.userId);
            //如果登录了
            if(this.$store.getters.getToken != ''){
                this.selectAttentionInfo(this.query.userId)
            }
        }
    }
</script>

<style>
    .person-blog {
        width: 65%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .person-blog .right {
        width: 30%;
    }

    .person-blog .left {
        width: 65%;
    }

    .person-blog .item {
        font-size: 15px;
        margin-bottom: 18px;
    }

    .person-blog .clearfix:before,
    .person-blog .clearfix:after {
        display: table;
        content: "";
    }

    .person-blog .clearfix:after {
        clear: both
    }

    .person-blog .right-box-card {
        width: 100%;
        margin-bottom: 20px;
    }

    .person-blog .left-box-card {
        width: 100%;
        margin-bottom: 20px;
    }

    .person-blog .left-box-card > div > div {
        padding: 10px 0;
    }

    .person-blog .left-box-card > div > div:nth-child(1) {
        font-size: 20px;
    }

    .person-blog .left-box-card > div > div:nth-child(3) {
        line-height: 35px;
        letter-spacing: 1px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .person-blog .left-box-card > div > div:nth-child(4) > span {
        margin-right: 10px;
    }

    .person-blog .el-card {
        background-color: unset;
    }

    .person-blog .el-card .item .count{
        color: #4a4d52;
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
    }

    .person-blog .el-card .item dd{
        color: #999aaa;
        font-size: 14px;
        line-height: 22px;
        padding: 3px 0;
    }

    .person-blog .el-card .item .text-align{
        text-align: center;
        flex: 1;
    }

    .person-blog .el-card .item .el-link {
        display: block;
        line-height: 2.5;
    }

    .person-blog .el-card i {
        font-size: 14px;
        color: #437dff;
        font-weight: 700;
        padding: 0 5px 0 0;
    }

    .person-blog .el-card .item .el-link .el-link--inner {
        clear: both;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }


    @media screen and (max-width: 1000px) and (min-width: 0px) {
        .person-blog .right {
            display: none;
        }

        .person-blog {
            width: 90%;
        }

        .person-blog .left {
            width: 100%;
            /*padding: 0 20px;*/
        }
    }
</style>
