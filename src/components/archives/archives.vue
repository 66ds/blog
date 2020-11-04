<template>
    <div class="archives">
        <el-row :gutter="10">
            <el-col :sm="4" class="archives-left animated fadeInLeft">
                <div>
                    <el-timeline :reverse="reverse">
                        <el-timeline-item
                                v-for="(activity, index) in activities"
                                :key="index"
                                :timestamp="activity.timestamp">
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </el-col>
            <el-col :sm="20" class="archives-right animated fadeInRight">
                <el-card class="archives-right-card">
                    <div><a href="www.baidu.com">Java设计模式</a></div>
                    <div>
                        <el-link icon="el-icon-user">作者:Mr Qian</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-time">发表于:2020-9-7</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-s-unfold">分类:小数</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-view">阅读量:900</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-chat-line-round">评论数:0</el-link>
                    </div>
                    <div>
                        爱斯达克了解到看来大家都加端口连接阿达阿达dasdnhasldjasd大大大克拉拉我达瓦大环境案沙迪克敬爱的啊dasdjaskldjkldjlasdjldjaldasdasdada实打实的对话框
                    </div>
                    <div>
                        <el-tag>标签一</el-tag>
                        <el-tag type="success">标签二</el-tag>
                        <el-tag type="info">标签三</el-tag>
                        <el-tag type="warning">标签四</el-tag>
                    </div>
                </el-card>
                <el-card class="archives-right-card">
                    <div><a href="www.baidu.com">Java设计模式</a></div>
                    <div>
                        <el-link icon="el-icon-user">作者:Mr Qian</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-time">发表于:2020-9-7</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-s-unfold">分类:小数</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-view">阅读量:900</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-chat-line-round">评论数:0</el-link>
                    </div>
                    <div>
                        爱斯达克了解到看来大家都加端口连接阿达阿达dasdnhasldjasd大大大克拉拉我达瓦大环境案沙迪克敬爱的啊dasdjaskldjkldjlasdjldjaldasdasdada实打实的对话框
                    </div>
                    <div>
                        <el-tag>标签一</el-tag>
                        <el-tag type="success">标签二</el-tag>
                        <el-tag type="info">标签三</el-tag>
                        <el-tag type="warning">标签四</el-tag>
                    </div>
                </el-card>
                <el-card class="archives-right-card">
                    <div><a href="www.baidu.com">Java设计模式</a></div>
                    <div>
                        <el-link icon="el-icon-user">作者:Mr Qian</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-time">发表于:2020-9-7</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-s-unfold">分类:小数</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-view">阅读量:900</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-chat-line-round">评论数:0</el-link>
                    </div>
                    <div>
                        爱斯达克了解到看来大家都加端口连接阿达阿达dasdnhasldjasd大大大克拉拉我达瓦大环境案沙迪克敬爱的啊dasdjaskldjkldjlasdjldjaldasdasdada实打实的对话框
                    </div>
                    <div>
                        <el-tag>标签一</el-tag>
                        <el-tag type="success">标签二</el-tag>
                        <el-tag type="info">标签三</el-tag>
                        <el-tag type="warning">标签四</el-tag>
                    </div>
                </el-card>
                <el-card class="archives-right-card">
                    <div><a href="www.baidu.com">Java设计模式</a></div>
                    <div>
                        <el-link icon="el-icon-user">作者:Mr Qian</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-time">发表于:2020-9-7</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-s-unfold">分类:小数</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-view">阅读量:900</el-link>&nbsp;|&nbsp;
                        <el-link icon="el-icon-chat-line-round">评论数:0</el-link>
                    </div>
                    <div>
                        爱斯达克了解到看来大家都加端口连接阿达阿达dasdnhasldjasd大大大克拉拉我达瓦大环境案沙迪克敬爱的啊dasdjaskldjkldjlasdjldjaldasdasdada实打实的对话框
                    </div>
                    <div>
                        <el-tag>标签一</el-tag>
                        <el-tag type="success">标签二</el-tag>
                        <el-tag type="info">标签三</el-tag>
                        <el-tag type="warning">标签四</el-tag>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                reverse: true,
                activities: [{
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                }
                    , {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }
                    , {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }]
            }
        },
        methods: {},
        components: {},
        created() {

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
        top:100px;
        overflow: auto;
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
    @media screen and (max-width: 768px){
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
