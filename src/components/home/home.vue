<template>
    <div class="index">
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
        <div class="right animated fadeInRight">
            <el-card class="right-box-card">
            <div slot="header" class="clearfix">
                <i class="el-icon-picture" style="color: orange"></i>&nbsp;<span>{{userCardData.userName}}的名片</span>
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
                <el-button type="info">私信</el-button>
                <el-button type="danger">关注</el-button>
            </div>
            </el-card>
            <el-card class="right-box-card">
                <div slot="header" class="clearfix">
                    <i class="el-icon-paperclip" style="color: #437dff"></i>&nbsp;<span>标签云</span>
                </div>
                <div style="font-size: 20px">
                    <tag-cloud></tag-cloud>
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
                    <i class="el-icon-s-order" style="color: green"></i>&nbsp;<span>文章归档</span>
                </div>
                <div class="item circle">
                    <el-link :underline="false" v-for="(item,key) in newTableTimeData" :key="key">{{item}}</el-link>
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
            <el-card class="right-box-card">
                <div slot="header" class="clearfix">
                    <i class="el-icon-link" style="color: red"></i>&nbsp;<span>友链</span>
                </div>
                <div class="item circle">
                    <el-link :underline="false">小明博客</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                    <el-link :underline="false">2017-8-10</el-link>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import TagCloud from '../common/tagcloud'
    import {articlesListApi,articlesTimeListApi,selectHotListApi} from './../../api/articles'
    import {userCardInfoById} from './../../api/users'
    export default {
        data() {
            return {
                tableData: [],
                newTableData:[],
                newTableTimeData:[],
                newTableHotData:[],
                userCardData:{},
                query: {
                    page: 1,
                    limit: 10
                },
                pageTotal: 0,
                labelId: '',
                loading: true
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
                    //当前页数为1
                    if(this.query.page == 1){
                        this.newTableData = res.data.list
                    }
                    this.tableData = res.data.list;
                    this.pageTotal = res.data.totalCount || 0;
                    this.loading = false;
                }catch (e) {
                    this.$message.error(e)
                }
            },
            //查询10条的文章归档时间
            async articlesTimeList() {
              try{
                  const res = await articlesTimeListApi();
                  if(res == undefined) return
                  this.newTableTimeData = res.data.slice(0,10);
              }catch (e) {
                  this.$message.error(e)
              }
            },
            //查询10条最火文章
            async selectHotList() {
                try {
                    const res = await selectHotListApi();
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
            }
        },
        components: {
            TagCloud
        },
        created() {
            const h = this.$createElement;
            this.$notify({
                title: 'Mr Qian的信息',
                message: h('i', {style: 'color: teal'}, '小白开发网站,请多多指教'),
            });
            this.articlesList()
            this.articlesTimeList();
            this.selectHotList();
            this.userCardInfo(3)//此处的3是管理员的id默认
        }
    }
</script>

<style>
    .index {
        width: 65%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .right {
        width: 30%;
    }

    .left {
        width: 65%;
    }

    .item {
        font-size: 15px;
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .right-box-card {
        width: 100%;
        margin-bottom: 20px;
    }

    .left-box-card {
        width: 100%;
        margin-bottom: 20px;
    }

    .left-box-card > div > div {
        padding: 10px 0;
    }

    .left-box-card > div > div:nth-child(1) {
        font-size: 20px;
    }

    .left-box-card > div > div:nth-child(3) {
        line-height: 35px;
        letter-spacing: 1px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .left-box-card > div > div:nth-child(4) > span {
        margin-right: 10px;
    }

    .el-card {
        background-color: unset;
    }

    .el-card .item .count{
        color: #4a4d52;
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
    }

    .el-card .item .text-align{
        text-align: center;
        flex: 1;
    }

    .el-card .item dd{
        color: #999aaa;
        font-size: 14px;
        line-height: 22px;
        padding: 3px 0;
    }

    .el-card .item .el-link {
        display: block;
        line-height: 2.5;
    }

    .el-card i {
        font-size: 14px;
        color: #437dff;
        font-weight: 700;
        padding: 0 5px 0 0;
    }


    .el-card .item .el-link .el-link--inner {
        clear: both;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    .el-card .circle .el-link {
        display: inline-block;
        width: 50%;
        line-height: 2;
    }




    @media screen and (max-width: 1000px) and (min-width: 0px) {
        .right {
            display: none;
        }

        .index {
            width: 90%;
        }

        .left {
            width: 100%;
            /*padding: 0 20px;*/
        }
    }
</style>
