<template>
    <div class="catagory">
        <el-row :gutter="10">
            <el-col :sm="4" class="catagory-left animated fadeInLeft">
                <div>
                    <el-link @click="change(item.sortId)" :underline="false" v-for="(item,i) in sortsData" :key="i" v-text="item.sortName" :class="{color:id == item.sortId}">全部</el-link>
                </div>
            </el-col>
            <el-col :sm="20" class="catagory-right animated fadeIn">
                <div v-loading="loading"
                     element-loading-text="加载全部中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 1)"></div>
                <el-card class="right-catagory-card" v-for="item in articlesData" :key="item.articleId">
                    <div><a href="javascript:void(0)" @click="articleDetail(item.articleId)">{{item.articleTitle}}</a></div>
                    <div>
                        <el-link icon="el-icon-user">作者:Mr Qian</el-link>&nbsp;|&nbsp;
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {sortsListInfo,selectlistBySortId} from "../../api/sorts";
    import {articlesListApi} from './../../api/articles'
    export default {
        data() {
            return {
                sortsData:[],
                articlesData:[],
                query: {
                    page: 1,
                    limit: 10
                },
                pageTotal: 0,
                loading: true,
                id:''
            }
        },
        methods: {
            async sortsList(){
                try{
                    const res = await sortsListInfo();
                    if(res == undefined) return
                    this.sortsData = res.data;
                }catch (e) {
                    this.$message.error(e)
                }
            },
            async articlesList(query){
                try{
                    this.loading = true;
                    const res = await articlesListApi(query);
                    if(res == undefined) return
                    this.articlesData = res.data.list;
                    this.pageTotal = res.data.totalCount || 0;
                    this.loading = false;
                }catch (e) {
                    this.$message.error(e)
                }
            },
            async selectlistBySortId(id,query){
                try{
                    this.loading = true;
                    const res = await selectlistBySortId(id,query);
                    if(res == undefined) return
                    //分类下没文章
                    if(res.data == null){
                        this.loading = false;
                        return this.$message.warning("该分类下无文章")
                    }
                    this.articlesData = res.data.list;
                    this.pageTotal = res.data.totalCount || 0;
                    this.loading = false;
                }catch (e) {
                    this.$message.error(e)
                }
            },
            articleDetail(id){
                this.$router.push({
                    path: "/content/"+id
                })
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page', val);
                this.articlesList(this.query)
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
            change(id){
                this.id = id;
                this.$set(this.query,"page",1);
                this.selectlistBySortId(id,this.query)
            }
        },
        created() {
            this.sortsList();
            this.articlesList(this.query);
        }
    }
</script>

<style>
    .catagory {
        width: 65%;
        margin-top: 20px;
    }

    .catagory .catagory-left {
        position: fixed;
    }

    .catagory .color{
        color:#409EFF;
    }

    .catagory .catagory-left .el-link.el-link--default {
        display: block;
        line-height: 3;
        font-size: 16px;
    }


    .right-catagory-card {
        width: 100%;
        margin-bottom: 20px;
    }

    .right-catagory-card > div > div {
        padding: 10px 0;
    }

    .right-catagory-card > div > div:nth-child(1) {
        font-size: 20px;
    }

    .right-catagory-card > div > div:nth-child(3) {
        line-height: 35px;
        letter-spacing: 1px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .right-catagory-card > div > div:nth-child(4) > span {
        margin-right: 10px;

    }

    @media screen and (max-width: 900px) and (min-width: 0px) {
        .catagory {
            width: 90%;
        }
    }

    @media screen and (min-width: 768px) {
        .catagory-right {
           margin-left: 17%;
        }
    }
    @media screen and (max-width: 768px){
        .catagory .catagory-left {
            z-index: 999;
            left: 0;
            bottom: 200px;
            width: 25%;
            background-color: #fff;
            padding: 0;
            text-align: center;
        }
    }
</style>
