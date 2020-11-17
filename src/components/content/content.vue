<template>
    <div class="article">
        <el-card class="article-box-card animated fadeIn">
            <h2 class="title">{{articleInfo.articleTitle}}</h2>
            <div style="text-align: center;">
                <el-link icon="el-icon-time">发表于:{{articleInfo.articleDate}}</el-link>&nbsp;|&nbsp;
                <el-link icon="el-icon-s-unfold">分类:小数</el-link>&nbsp;|&nbsp;
                <el-link icon="el-icon-view">阅读量:{{articleInfo.articleViews}}</el-link>&nbsp;|&nbsp;
                <el-link icon="el-icon-chat-line-round">文字字数:{{articleInfo.articleCommentCount}}</el-link>&nbsp;|&nbsp;
                <el-link icon="el-icon-chat-line-round">阅读时间:{{articleInfo.articleLikeCount}}</el-link>
            </div>
            <div class="content markdown-body" v-html="articleInfo.articleContent">

            </div>
            <div class="prev-next">
                <div class="prev">
                    <span>上一篇:</span>
                    <a href="www.baidu.com">Java设计模式</a>
                </div>
                <div class="next">
                    <span>下一篇:</span>
                    <a href="www.baidu.com">Java设计模式</a>
                </div>
            </div>
            <div class="reward-container">
                <button type="button" class="el-button el-button--primary" @click="isShow=!isShow">
                    <span>打赏</span>
                </button>
                <div class="much animated bounceIn" v-if="isShow">
                    <div style="display: inline-block;"><img src="../../assets/much/weixin.png" alt="Mr.Qian 微信支付">
                        <p>微信支付</p></div>
                    <div style="display: inline-block;"><img src="../../assets/much/zhifubao.png" alt="Mr.Qian 支付宝">
                        <p>支付宝</p></div>
                </div>
            </div>
            <div class="introduce">
                <ul class="post-copyright">
                    <li data-v-f5ca42f6="" class="post-copyright-author"><strong data-v-f5ca42f6="">本文作者： </strong>Mr.Yong
                    </li>
                    <li data-v-f5ca42f6="" class="post-copyright-link"><strong data-v-f5ca42f6="">本文链接：</strong> <a
                            data-v-f5ca42f6="" href="/view/94" title="客户端连接MySQL8提示 caching-sha2-password 问题">https://www.myong.top/view/94</a>
                    </li>
                    <li data-v-f5ca42f6="" class="post-copyright-license"><strong data-v-f5ca42f6="">版权声明： </strong>本博客所有文章除特别声明外，均采用
                        <a data-v-f5ca42f6="" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="noopener"
                           target="_blank"><i data-v-f5ca42f6="" class="iconfont icon-creative-commons"></i>
                            BY-NC-SA</a> 许可协议。转载请注明出处！
                    </li>
                </ul>
            </div>
            <div class="thank">
                <div class="article-end">-------------本文结束<i class="el-icon-star-on"></i>感谢您的阅读-------------
                </div>
            </div>
            <div class="tags">
                <el-tag>标签一</el-tag>
                <el-tag type="success">标签二</el-tag>
                <el-tag type="info">标签三</el-tag>
                <el-tag type="warning">标签四</el-tag>
            </div>
        </el-card>
        <el-card class="article-box-card animated fadeIn">
            <div class="tips">
                <p><i class="el-icon-info" style="color: red;font-size: 14px;"></i> 留言说明: </p>
                <p data-v-0eafe26a="">务必填写有效的邮箱地址，否则不会收到回复信息的~</p>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <div class="form-top">
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="内容" prop="desc">
                    <!-- 图片上传组件辅助-->
                    <quill-editor
                            v-model="content"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @change="onEditorChange($event)"
                    >
                    </quill-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="commnet-total"><span>共2条评论</span></div>
            <div class="comment">
                <ul>
                    <li class="who">
                        <span class="page">1.</span>
                        <span class="user">44</span>
                        <span class="sys">win10</span>
                        <span class="exe">chrome</span>
                        <span class="time">2017-7-11</span>
                    </li>
                    <li class="write">
                        外阿胶为和爱我和哦亲而后安慰i2121313大会上扩军多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多爱斯达克就看就看就看就看就看就看就看就看就看就看就看就看就看就看就看就看就看家
                    </li>
                </ul>
                <ul>
                    <li class="who">
                        <span class="page">2.</span>
                        <span class="user">44</span>
                        <span class="sys">win10</span>
                        <span class="exe">chrome</span>
                        <span class="time">2017-7-11</span>
                    </li>
                    <li class="write">
                        外阿胶为和爱我和哦亲而后安慰i2121313大会上扩军多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多爱斯达克就看就看就看就看就看就看就看就看就看就看就看就看就看就看就看就看就看家
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {articlesInfoApi} from './../../api/articles'
    export default {
        data() {
            return {
                isShow: false,
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                articleInfo:{},
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写内容', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            const id = this.$route.params.id
            articlesInfoApi(id).then(res=>{
               this.articleInfo = res.data
            })
        }
    }
</script>

<style>
    .article {
        width: 65%;
        margin: 30px auto 0px;
    }

    .article .title{
        font-size: 20px;
        text-align: center;
        padding-bottom: 20px;
    }

    .article .el-link i {
        font-size: 14px;
        color: #437dff;
        font-weight: 700;
        padding: 0 5px 0 0;
    }

    .article .content{
        padding-top: 20px;
    }
    .article-box-card {
        width: 100%;
        margin-bottom: 20px;
        background-color: unset;
    }

    .article-box-card:hover {
        box-shadow: 0 8px 15px 0 rgba(0, 0, 0, .1);
    }

    .article .prev-next {
        padding: 20px 0;
        line-height: 2;
        font-size: 16px;
    }

    .article .prev-next span {
        margin-right: 10px;
    }

    .article .reward-container {
        padding: 10px 0;
        margin: 20px auto;
        width: 90%;
        text-align: center;
    }

    .article .reward-container .much {
        padding-top: 20px;
    }

    .article .reward-container .much > div:hover {
        box-shadow: 0 8px 15px 0 rgba(0, 0, 0, .1);
    }

    .article .reward-container img {
        width: 180px;
        height: 186px;
    }

    .article .introduce {
        margin: 2em 0 0;
        padding: .5em 1em;
        border-left: 3px solid #ff1700;
        background-color: #f9f9f9;
        line-height: 2;
    }
    .article .thank .article-end{
        text-align: center;
        color: #ccc;
        font-size: 16px;
        padding: 20px 0;
    }
    .article .tags>span {
        margin-right: 10px;
    }
    .article .tips{
        line-height: 2;
        padding: 10px 0 20px;
        border-bottom: 1px solid #ccc;
        margin: 0 0 20px;
    }
    .article .comment ul{
        border-bottom: 1px solid #ececec;
        padding-left: 70px;
    }
    .article .comment .who{
        margin-top:5px;
        line-height: 30px;
        display: flex;
        align-items: center;
    }
    .article .comment .who .page{
        margin-right: 10px;
    }
    .article .comment .who .user{
        color: #1abc9c;
        margin-right: 10px;
    }
    .article .comment .who .sys,.exe{
        text-align: center;
        font-size: 12px;
        background-color: #ededed;
        padding: 0 10px;
        margin-right: 10px;
    }
    .article .comment .who .time{
        flex: 1;
        text-align: right;
        color: #999;
        font-size: 12px;
    }
    .article .comment .write{
        padding: 10px 0;
        line-height: 18px;
        letter-spacing: 1px;
    }
    .article .el-form .form-top{
        display: flex;
    }
    .article .el-form .form-top .el-form-item {
        flex: 1;
    }
    .article .el-form-item__content{
        line-height: 0px !important;
    }
    .article .commnet-total {
        color: #303133;
        line-height: 36px;
        margin-left: 70px;
    }

    @media screen and (max-width: 1000px) and (min-width: 0px){
        .article{
            width: 100%;
            padding: 0 20px;
        }
        .article .form-top{
            flex-direction: column;
        }
        .article .commnet-total{
            margin-left: 0px;
        }
        .article .comment ul{
            padding-left: 0px;
        }
        .article .el-form-item__label{
            text-align: left;
        }
    }
</style>
