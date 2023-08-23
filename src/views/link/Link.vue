<template>
    <div class="link">
        <h2>友情链接</h2>
        <div class="content animated fadeIn">
            <el-card class="box-card" v-for="(item,key) in linkData" :key="key">
                <el-link :underline="false">{{item.linkName}}</el-link>
                <p>{{item.linkDesc}}</p>
            </el-card>
        </div>
        <div  class="apply-link animated fadeIn">
            <h4>友链申请</h4>
            <div class="tips">
                <p><i class="iconfont icon-tips"></i> 温馨提示: </p>
                <p>在申请本站友链之前请确保已将本站加入友链。</p>
                <p>本站优先录入同类原创、技术生活类博客。任何包含违法国家法律或不健康内容站点均不录入。</p>
                <p>百度、搜狗等搜索引擎权重无要求，但是要求时常更新网站内容。</p>
                <p>本站会不定期互相走访友链，发现单方取消友链便拉入黑名单。</p>
                <p>特别提醒: 若无意外，在申请友链后24小时内完成审核并录入站点，如超时还未审核完成，请留言或者私信给我。审核结果均以邮件形式通知，请输入常用有效邮箱。</p>
            </div>
            <el-form :model="linkForm" :rules="rules" ref="linkForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="站点名称" prop="linkName">
                    <el-input v-model="linkForm.linkName"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="linkEmail">
                    <el-input v-model="linkForm.linkEmail"></el-input>
                </el-form-item>
                <el-form-item label="站点地址" prop="linkUrl">
                    <el-input v-model="linkForm.linkUrl"></el-input>
                </el-form-item>
                <el-form-item label="站点描述" prop="linkDesc">
                    <el-input type="textarea" v-model="linkForm.linkDesc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('linkForm')">立即创建</el-button>
                    <el-button @click="resetForm('linkForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {addFriendLinkApi,selectFriendLinkListApi} from 'api/link'
    let checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
            return callback(new Error('请输入邮箱地址'))
        }
        setTimeout(() => {
            if (mailReg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的邮箱格式'))
            }
        }, 100)
    };
   let checkUrl = (rule, value, callback) => {
        const reg = new RegExp(
            /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/
        )
        if (value === '') {
            callback(new Error('请输入站点地址'))
        } else if (!reg.test(value)) {
            callback(new Error('请输入正确的站点地址'))
        } else {
            callback()
        }
    }
    export default {
        data() {
            return {
                linkData:[],
                linkForm: {
                    linkName: '',
                    linkUrl: '',
                    linkEmail: '',
                    linkDesc: '',
                },
                rules: {
                    linkName: [
                        { required: true, message: '请输入站点名称', trigger: 'blur' },
                    ],
                    linkUrl: [
                        { required: true,validator: checkUrl, trigger: 'change' }
                    ],
                    linkEmail: [
                        { required:true, validator: checkEmail,trigger: 'change' }
                    ],
                    linkDesc: [
                        { required: true,message: '请输入站点描述', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addFriendLink();
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //添加友链信息
            async addFriendLink(){
                try{
                    const res = await addFriendLinkApi(this.linkForm);
                    if(res == undefined) return;
                    this.$message.success(res.msg)
                    //重置表单
                    this.resetForm("linkForm")
                }catch (e) {
                    this.$message.error(e)
                }
            },
            //查询所有友情链接
            async selectFriendLink(){
                try{
                    const res = await selectFriendLinkListApi();
                    if(res == undefined) return;
                    this.linkData = res.data
                }catch (e) {
                    this.$message.error(e)
                }
            }
        },
        created() {
            this.selectFriendLink();
        }
    }
</script>

<style>
    .link{
        width: 70%;
        text-align: center;
    }
    .link h2{
        line-height: 100px;
        color: #555;
        font-weight: 500;
        font-size: 19px;
    }
    .link .content{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .link .content .el-card {
        margin: 0 10px 20px;
        width: 23%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: left;
        background-color: unset;
    }
    .link .content .el-card p{
        clear: both;
        display: -webkit-box;
        overflow: hidden;
        margin-top: 20px;
        height: 60px;
        text-overflow: ellipsis;
        font-size: 13px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-height: 1.5;
    }
    .link .el-link{
        display: block;
        text-align: center;
    }
    .link .apply-link{
        width: 100%;
        text-align: left;
        color: #96969c;
        padding: 10px;
        -webkit-box-shadow: 0 0 5px rgba(202,203,203,.5);
        box-shadow: 0 0 5px rgba(202,203,203,.5);
        margin-top: 50px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .link .apply-link h4{
        width: 100%;
        color: #409eff;
        padding: 20px 0 10px;
    }
    .link .apply-link .tips{
        line-height: 2;
        padding: 10px 0 20px;
        border-bottom: 1px solid #ccc;
        margin: 0 0 20px;
    }
    .link .apply-link .tips .icon-tips{
        font-size: 18px;
        color: red;
        font-weight: 700;
    }
    .link .apply-link .el-form{
        width: 50%;
    }
    @media screen and (max-width: 768px) and (min-width: 0px) {
        .link{
            width: 100%;
        }
        .link .content .el-card{
            width: 44%;
        }
        .link .apply-link .el-form{
            width: 100%;
        }
        .link .apply-link .el-form-item__label{
            text-align: left;
        }
    }
</style>
