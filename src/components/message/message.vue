<template>
    <div class="message">
        <h2>留言互动</h2>
        <div class="el-row">
            <img src="https://www.myong.top/static/img/timg.94467a8.gif" alt="">
        </div>
        <el-card class="message-box-card animated fadeIn">
            <div class="tips">
                <p><i class="el-icon-info" style="color: red;font-size: 14px;"></i> 留言说明: </p>
                <p data-v-0eafe26a="">务必填写有效的邮箱地址，否则不会收到回复信息的~</p>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <el-form-item label="内容" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc" maxlength="100"  show-word-limit :autosize="{ minRows: 4, maxRows: 5}"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="commnet-total"><span>共0条留言</span></div>
            <div class="comment">
                <ul style="list-style: none">
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
                <ul style="list-style: none">
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
    import {addCommentApi} from "../../api/comments";

    export default {
        data() {
            return {
                ruleForm: {
                    desc: ''
                },
                rules: {
                    desc: [
                        {required: true, message: '请填写内容', trigger: 'blur'}
                    ]
                },
                query: {
                    page: 1,
                    limit: 10
                },
                commentDesc:'',
                pageTotal: 0,
                totalCount:0,
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
            },
            //公共模块 添加留言并重新刷新留言
            async addComment(content){
                try{
                    const res = await addCommentApi(content) ;
                    if(res == undefined) return
                    this.$message.success("评论成功")
                    //删除上面textarea内容
                    this.ruleForm.desc = ""
                    //重新文章下的所有评论
                    this.$set(this.query, 'page', 1);
                    this.selectCommentList(this.articleId,this.query);
                    //消除当前下面textarea的内容
                    this.isActive = ''
                }catch (e) {
                    this.$message.error(e)
                }
            },
        },
        components: {},
        created() {
        }
    }
</script>

<style>
    .message {
        width: 65%;
    }

    .message .el-row, .message h2 {
        color: #555;
        width: 100%;
        text-align: center;
        margin: 40px 0;
        font-size: 20px;
    }

    .message .tips {
        line-height: 2;
        padding: 10px 0 20px;
        border-bottom: 1px solid #ccc;
        margin: 0 0 20px;
    }

    .message .comment ul {
        border-bottom: 1px solid #ececec;
        padding-left: 70px;
    }

    .message .comment .who {
        margin-top: 5px;
        line-height: 30px;
        display: flex;
        align-items: center;
    }

    .message .comment .who .page {
        margin-right: 10px;
    }

    .message .comment .who .user {
        color: #1abc9c;
        margin-right: 10px;
    }

    .message .comment .who .sys, .exe {
        text-align: center;
        font-size: 12px;
        background-color: #ededed;
        padding: 0 10px;
        margin-right: 10px;
    }

    .message .comment .who .time {
        flex: 1;
        text-align: right;
        color: #999;
        font-size: 12px;
    }

    .message .comment .write {
        padding: 10px 0;
        line-height: 18px;
        letter-spacing: 1px;
    }

    .message .el-form .form-top {
        display: flex;
    }

    .message .el-form .form-top .el-form-item {
        flex: 1;
    }

    .message .el-form-item__content {
        line-height: 0px !important;
    }

    .message .commnet-total {
        color: #303133;
        line-height: 36px;
        margin-left: 70px;
    }

    @media screen and (max-width: 1000px) and (min-width: 0px) {
        .message {
            width: 100%;
            padding: 0 20px;
        }

        .message .form-top {
            flex-direction: column;
        }

        .message .commnet-total {
            margin-left: 0px;
        }

        .message .comment ul {
            padding-left: 0px;
        }

        .message .el-form-item__label {
            text-align: left;
        }

        .message img {
            width: 100%;
        }
    }
</style>
