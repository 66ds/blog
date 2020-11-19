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

        </div>
        <div class="right animated fadeInRight">
            <el-card class="right-box-card">
                <div slot="header" class="clearfix">
                    <i class="el-icon-picture" style="color: orange"></i>&nbsp;<span>楼主名片</span>
                </div>
                <div class="text item">
                    网名:我是一颗小蔡
                </div>
                <div class="text item">
                    职业:IT工程师
                </div>
                <div class="text item">
                    现居:江苏省苏州市吴中区
                </div>
                <div class="text item">
                    Email:1532498760@qq.com
                </div>
                <div class="text item">
                    QQ:1532498760
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
                <div class="text item">
                    <el-link :underline="false"><i>1</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                    <el-link :underline="false"><i>2</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                    <el-link :underline="false"><i>3</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                    <el-link :underline="false"><i>4</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                    <el-link :underline="false"><i>5</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                    <el-link :underline="false"><i>6</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                </div>
            </el-card>
            <el-card class="right-box-card">
                <div slot="header" class="clearfix">
                    <i class="el-icon-s-order" style="color: green"></i>&nbsp;<span>文章归档</span>
                </div>
                <div class="text item circle">
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
                    <el-link :underline="false">2017-8-10</el-link>
                </div>
            </el-card>
            <el-card class="right-box-card">
                <div slot="header" class="clearfix">
                    <i class="el-icon-star-on" style="color: red"></i>&nbsp;<span>最新文章</span>
                </div>
                <div class="text item">
                    <el-link :underline="false"><i>1</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                    <el-link :underline="false"><i>2</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                    <el-link :underline="false"><i>3</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                    <el-link :underline="false"><i>4</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                    <el-link :underline="false"><i>5</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                    <el-link :underline="false"><i>6</i>无下划线无下划线无下划线无下划线无下划线</el-link>
                </div>
            </el-card>
            <el-card class="right-box-card">
                <div slot="header" class="clearfix">
                    <i class="el-icon-link" style="color: red"></i>&nbsp;<span>友链</span>
                </div>
                <div class="text item circle">
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
    import {articlesListApi} from './../../api/articles'

    export default {
        data() {
            return {
                tableData: [],
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
                this.loading = true;
                const res = await articlesListApi(this.query)
                this.tableData = res.data.list;
                this.pageTotal = res.data.totalCount || 0;
                this.loading = false;
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

    .text {
        font-size: 15px;
    }

    .item {
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
