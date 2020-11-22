<template>
    <div class="archives">
        <el-row :gutter="10">
            <el-col :sm="4" class="archives-left animated fadeInLeft">
                <div>
                    <el-timeline :reverse="reverse">
                        <el-timeline-item
                                v-for="(activity, index) in activities"
                                :key="index"
                                :timestamp="activity.timestamp"
                                :class="{color:id == index}"
                                @click.native="change(index,activity.timestamp)">
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </el-col>
            <el-col :sm="20" class="archives-right animated fadeIn">
                <div v-loading="loading"
                     element-loading-text="加载全部中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 1)"></div>
                <el-card class="archives-right-card" v-for="item in articlesData" :key="item.articleId">
                    <div><a href="javascript:void(0)" @click="articleDetail(item.articleId)">{{item.articleTitle}}</a>
                    </div>
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
    import {articlesTimeListApi, articlesListApi,articleListByTimeApi} from "../../api/articles";

    export default {
        data() {
            return {
                reverse: true,
                activities: [],
                articlesData: [],
                query: {
                    page: 1,
                    limit: 10
                },
                pageTotal: 0,
                loading: true,
                id: null
            }
        },
        methods: {
            async articlesTimeList() {
                const res = await articlesTimeListApi()
                if(res == undefined) return
                if (res.data != null) {
                    this.activities = res.data.map(item => {
                        return {timestamp: item}
                    })
                }
            },
            async articlesList(query) {
                try {
                    this.loading = true;
                    const res = await articlesListApi(query);
                    if(res == undefined) return
                    this.articlesData = res.data.list;
                    this.pageTotal = res.data.totalCount || 0;
                    this.loading = false;
                } catch (e) {
                    this.$message.error(e)
                }
            },
            async articleListByTime(time,query){
                try{
                    this.loading = true;
                    const res = await articleListByTimeApi(time,query);
                    if(res == undefined) return
                    if(res.data.list.length == 0){
                        this.loading = false;
                        return this.$message.warning("该归档下无文章")
                    }
                    this.articlesData = res.data.list;
                    this.pageTotal = res.data.totalCount || 0;
                    this.loading = false;
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
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page', val);
                this.articlesList(this.query)
            },
            articleDetail(id) {
                this.$router.push({
                    path: "/content/" + id
                })
            },
            change(id,time) {
                this.id = id;
                this.$set(this.query,"page",1);
                this.articleListByTime(time,this.query)
            }
        },
        components: {},
        created() {
            this.articlesTimeList()
            this.articlesList(this.query)
        }
    }
</script>

<style>
    .archives {
        width: 65%;
        margin-top: 20px;
    }

    .archives .archives-left {
        position: fixed;
        bottom: 120px;
        top: 100px;
        overflow: auto;
    }


    .archives .color .is-bottom {
        color: #409EFF;
    }

    .archives .archives-left::-webkit-scrollbar {
        width: 0;
    }

    .archives-right-card {
        width: 100%;
        margin-bottom: 20px;
    }

    .archives-right-card > div > div {
        padding: 10px 0;
    }

    .archives-right-card > div > div:nth-child(1) {
        font-size: 20px;
    }

    .archives-right-card > div > div:nth-child(3) {
        line-height: 35px;
        letter-spacing: 1px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .archives .is-bottom:hover {
        color: #409EFF;
        cursor: pointer;
    }


    .archives-right-card > div > div:nth-child(4) > span {
        margin-right: 10px;

    }

    @media screen and (max-width: 900px) and (min-width: 0px) {
        .archives {
            width: 90%;
        }
    }

    @media screen and (min-width: 768px) {
        .archives-right {
            margin-left: 17%;
        }
    }

    @media screen and (max-width: 768px) {
        .archives .archives-left {
            z-index: 999;
            left: 0;
            top: 20%;
            width: 30%;
            background-color: #fff;
            padding: 0;
            overflow: auto;
        }
    }
</style>
