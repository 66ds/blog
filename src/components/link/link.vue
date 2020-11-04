<template>
    <div class="link">
        <h2>友情链接</h2>
        <div class="content animated fadeIn">
            <el-card class="box-card">
                <el-link :underline="false">无下划线</el-link>
                <p>我是你妈你妈妈我是你妈你妈妈妈妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独妈妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独</p>
            </el-card>
            <el-card class="box-card">
                <el-link :underline="false">无下划线</el-link>
                <p>我是你妈你妈妈妈我是你妈你妈妈妈妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独</p>
            </el-card>
            <el-card class="box-card">
                <el-link :underline="false">无下划线</el-link>
                <p>我是你妈你妈我是你妈你妈妈妈妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独妈妈妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独</p>
            </el-card>
            <el-card class="box-card">
                <el-link :underline="false">无下划线</el-link>
                <p>我是你妈你妈妈妈妈我是你妈你妈妈妈妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独</p>
            </el-card>
            <el-card class="box-card">
                <el-link :underline="false">无下划线</el-link>
                <p>我是你妈你妈妈妈妈我是你妈你妈妈妈妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独</p>
            </el-card>
            <el-card class="box-card">
                <el-link :underline="false">无下划线</el-link>
                <p>我是你妈你妈妈妈我是你妈你妈妈妈妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独</p>
            </el-card>
            <el-card class="box-card">
                <el-link :underline="false">无下划线</el-link>
                <p>我是你妈你妈妈妈我是你妈你妈妈妈妈马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独马上你们那是那是美女忙啥呢撒旦是没到那上面的那单独</p>
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
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="站点名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="站点地址" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="站点描述" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
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
        }
    }
</script>

<style>
    .link{
        width: 65%;
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
