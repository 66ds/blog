<template>
    <div class="article">
        <el-card class="article-box-card animated fadeIn">
            <h2 class="title">{{articleInfo.articleTitle}}</h2>
            <div style="text-align: center;">
                <el-link icon="el-icon-time">发表于:{{articleInfo.articleDate}}</el-link>&nbsp;|&nbsp;
                <el-link icon="el-icon-s-unfold">分类:{{articleInfo.sortName}}</el-link>&nbsp;|&nbsp;
                <el-link icon="el-icon-view">阅读量:{{articleInfo.articleViews}}</el-link>&nbsp;|&nbsp;
                <el-link icon="el-icon-chat-line-round">评论数:{{articleInfo.articleCommentCount}}</el-link>&nbsp;|&nbsp;
                <el-link icon="el-icon-chat-line-round">阅读时间:{{readTime}}</el-link>
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
                            data-v-f5ca42f6="" href="/view/94" title="客户端连接MySQL8提示 caching-sha2-password 问题">{{location}}</a>
                    </li>
                    <li data-v-f5ca42f6="" class="post-copyright-license"><strong data-v-f5ca42f6="">版权声明： </strong>本博客所有文章除特别声明外，均采用
                        <a data-v-f5ca42f6="" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="noopener"
                           target="_blank"><i data-v-f5ca42f6="" class="iconfont icon-creative-commons"></i>
                            BY-NC-SA</a> 许可协议。转载请注明出处！
                    </li>
                </ul>
            </div>
            <div class="thank">
                <div class="article-end">-------------本文结束感谢您的阅读.亲,举手之劳,点个赞呗<i :class="likeClass" @click="like"></i>-------------
                </div>
            </div>
        </el-card>
        <el-card class="article-box-card animated fadeIn">
            <div class="tips">
                <p><i class="el-icon-info" style="color: red;font-size: 14px;"></i> 评论说明: </p>
                <p data-v-0eafe26a="">务必填写有效的邮箱地址，否则不会收到回复信息的~</p>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <el-form-item label="内容" prop="desc">
                    <!-- 图片上传组件辅助-->
                    <el-upload
                            id="upimg"
                            v-show="false"
                            class="upload-demo"
                            :action="imgUploadUrl"
                            :on-success="handleSuccess"
                            :headers="{token:token}"
                            multiple
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <quill-editor
                            v-model="ruleForm.desc"
                            :options="editorOption"
                            ref="QuillEditor"
                    >
                    </quill-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="commnet-total"><span>共{{commentsInfo.length}}条评论</span></div>
            <div class="comment">
                <ul style="list-style: none" v-for="(item,i) in commentsInfo" :key="i">
                    <li class="who">
                        <span class="page">{{i+1}}.</span>
                        <span class="user">44</span>
                        <span class="sys">{{item.commentSys}}</span>
                        <span class="exe">{{item.commentChrome}}</span>
                        <span class="time">{{item.commentDate}}</span>
                        <span class="dig"><i class="el-icon-star-off"></i>&nbsp;{{item.commentLikeCount}}</span>
                    </li>
                    <li class="write">
                        {{item.commentContent}}
                    </li>
                    <div v-for="(item,key) in commentsInfo[i].children" :key="key">
                        <li class="who" style="padding-left: 40px;">
                            <span class="user">44</span>
                            <span class="sys">{{item.commentSys}}</span>
                            <span class="exe">{{item.commentChrome}}</span>
                            <span class="time">{{item.commentDate}}</span>
                            <span class="dig"><i class="el-icon-star-off"></i>&nbsp;3</span>
                        </li>
                        <li class="write" style="padding-left: 30px;">
                            {{item.commentContent}}
                        </li>
                    </div>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {articlesInfoApi} from './../../api/articles'
    import {selectListLikeApi, likeArticleApi} from './../../api/like-article'
    import {addCommentApi,selectListApi} from '../../api/comments'
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{header: 1}, {header: 2}], // custom button values
        [{list: 'ordered'}, {list: 'bullet'}],
        [{script: 'sub'}, {script: 'super'}], // superscript/subscript
        [{indent: '-1'}, {indent: '+1'}], // outdent/indent
        [{direction: 'rtl'}], // text direction

        [{size: ['small', false, 'large', 'huge']}], // custom dropdown
        [{header: [1, 2, 3, 4, 5, 6, false]}],

        [{color: []}, {background: []}], // dropdown with defaults from theme
        [{font: []}],
        [{align: []}],
        ['link', 'image', 'video'],
        ['clean'] // remove formatting button
    ]
    export default {
        data() {
            return {
                // 上传图片接口地址
                imgUploadUrl: 'http://127.0.0.1:12000/api/v1/pri/oos/upload',
                // 富文本编辑器工具栏
                editorOption: {
                    modules: {
                        toolbar: {
                            container: toolbarOptions, // 工具栏
                            handlers: {
                                image: function (value) {
                                    if (value) {
                                        // 调用element的图片上传组件
                                        // （这里是用的原生js的选择dom方法）
                                        document.querySelector('#upimg button').click()
                                    } else {
                                        this.quill.format('image', false)
                                    }
                                }
                            }
                        }
                    }
                },
                ruleForm: {
                    desc: ''
                },
                rules: {
                    desc: [
                        {required: true, message: '请填写内容', trigger: 'blur'}
                    ]
                },
                readTime: '',
                isShow: false,
                interval: '',
                articleInfo: {},
                commentsInfo:[],
                location: document.location,
                likeClass: "el-icon-star-off",
                beginTime: new Date().getSeconds(),
                token: this.$store.getters.getToken,
                articleId:this.$route.params.id
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addComment(this.ruleForm.desc,this.articleId,0,this.token)
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async addComment(content,articleId,parentCommentId,token){
                try{
                    const res = await addCommentApi(content,articleId,parentCommentId,token) ;
                    if(res == undefined) return
                    this.$message.success("评论成功")
                }catch (e) {
                    this.$message.error(e)
                }
            },
            countdown() {
                const that = this
                that.interval = setInterval(() => {
                    that.readTime = new Date().getSeconds() - that.beginTime
                    let day = parseInt(that.readTime / 60 / 60 / 24)
                    let hr = parseInt(that.readTime / 60 / 60 % 24)
                    let min = parseInt(that.readTime / 60 % 60)
                    let sec = parseInt(that.readTime % 60)

                    day = day > 9 ? day : '0' + day
                    hr = hr > 9 ? hr : '0' + hr
                    min = min > 9 ? min : '0' + min
                    sec = sec > 9 ? sec : '0' + sec
                    that.readTime = `${day}天${hr}时${min}分${sec}秒`
                }, 1000);
            },
            async likeArticle(id, token) {
                try {
                    const res = await likeArticleApi(id, token)
                    if(res == undefined) return
                    if (res.data == null) {
                        this.likeClass = "el-icon-star-off"
                        this.$message.success("取消成功");
                    } else {
                        this.likeClass = "el-icon-star-on"
                        this.$message.success("点赞成功");
                    }
                } catch (e) {
                    this.$message.error(e)
                }
            },
            like() {
                //未登录
                this.likeArticle(this.$route.params.id, this.token)
            },
            async articlesInfo(id) {
                try {
                    const res = await articlesInfoApi(id)
                    if(res == undefined) return
                    this.articleInfo = res.data;
                } catch (e) {
                    this.$message.error(e)
                }
            },
            async selectListLike(id) {
                try {
                    const token = this.$store.getters.getToken;
                    const res = await selectListLikeApi(id, token)
                    if(res == undefined) return
                    //已点赞
                    if (res.data != null) {
                        this.likeClass = "el-icon-star-on"
                    }
                } catch (e) {
                    this.$message.error(e)
                }
            },
            async selectList(articleId){
                try{
                    const res = await selectListApi(articleId)
                    if(res == undefined) return
                    //遍历数据展示在评论列表上
                    res.data.forEach(item => {
                        let arr = new Array();
                        item.children = this.getChildren(item.children,arr)
                        this.commentsInfo.push(item)
                    })
                    console.log(this.commentsInfo)
                }catch (e) {
                    this.$message.error(e)
                }
            },
            getChildren(item,arr){
                if(item.length != 0){
                    item.forEach(res => {
                        arr.push(res);
                        this.getChildren(res.children,arr)
                    })
                }
                return arr
            },
            // element的upload组件上传图片成功后调用的函数
            handleSuccess(res) {
                // 获取富文本组件实例
                let quill = this.$refs.QuillEditor.quill
                if (res.code != 0) {
                    return this.$message.error('清先登录')
                }
                this.$message.success('上传成功')
                // 获取光标所在位置
                let length = quill.getSelection().index
                // 插入图片，res为服务器返回的图片链接地址
                quill.insertEmbed(length, 'image', res.data)
                // 调整光标到最后
                quill.setSelection(length + 1)

            }
        },
        created() {
            //文章计时
            this.countdown();
            //获取文章信息
            this.articlesInfo(this.articleId);
            //获取文章下的所有评论
            this.selectList(this.articleId);
            //已登录,则判断该用户有么有点赞文章
            if (this.token != '') {
                this.selectListLike(this.articleId)
            }
        },
        beforeDestroy() {
            clearInterval(this.interval)
        }
    }
</script>

<style>
    .article {
        width: 65%;
        margin: 30px auto 0px;
    }

    .article .title {
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

    .article .content {
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

    .article .introduce .post-copyright {
        list-style: none;
    }

    .article .thank .article-end {
        text-align: center;
        color: #ccc;
        font-size: 16px;
        padding: 20px 0;
    }

    .article .thank .article-end i {
        cursor: pointer;
    }

    .article .tags > span {
        margin-right: 10px;
    }

    .article .tips {
        line-height: 2;
        padding: 10px 0 20px;
        border-bottom: 1px solid #ccc;
        margin: 0 0 20px;
    }

    .article .comment ul {
        border-bottom: 1px solid #ececec;
        padding-left: 70px;
    }

    .article .comment .who {
        margin-top: 5px;
        line-height: 30px;
        display: flex;
        align-items: center;
    }

    .article .comment .who .page {
        margin-right: 10px;
    }

    .article .comment .who .user {
        color: #1abc9c;
        margin-right: 10px;
    }

    .article .comment .who .sys, .exe,.time{
        text-align: center;
        font-size: 12px;
        background-color: #ededed;
        padding: 0 10px;
        margin-right: 10px;
    }

    .article .comment .who .dig {
        flex: 1;
        text-align: right;
        color: #999;
        font-size: 12px;
    }

    .article .comment .write {
        padding: 10px 0;
        line-height: 18px;
        letter-spacing: 1px;
    }

    .article .el-form-item__content {
        line-height: 0px !important;
    }

    .article .commnet-total {
        color: #303133;
        line-height: 36px;
        margin-left: 70px;
    }

    @media screen and (max-width: 1000px) and (min-width: 0px) {
        .article {
            width: 100%;
            padding: 0 20px;
        }

        .article .commnet-total {
            margin-left: 0px;
        }

        .article .comment ul {
            padding-left: 0px;
        }

        .article .el-form-item__label {
            text-align: left;
        }
    }
</style>
