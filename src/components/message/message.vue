<template>
    <div class="message">
        <h2>留言互动</h2>
        <div class="el-row">
            <img  src="https://www.myong.top/static/img/timg.94467a8.gif" alt="">
        </div>
        <el-card class="message-box-card animated fadeIn">
            <div class="tips">
                <p><i class="el-icon-info" style="color: red;font-size: 14px;"></i> 留言说明: </p>
                <p data-v-0eafe26a="">务必填写有效的内容o，否则不会收到回复信息的~</p>
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
    export default {
        data() {
            return{
                // 上传图片接口地址
                imgUploadUrl: 'http://xxxxxxxx/fileUpload',
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
        components:{

        },
        created() {
        }
    }
</script>

<style>
  .message{
      width: 65%;
  }
  .message .el-row,.message h2 {
      color: #555;
      width: 100%;
      text-align: center;
      margin: 40px 0;
      font-size: 20px;
  }
  .message .tips{
      line-height: 2;
      padding: 10px 0 20px;
      border-bottom: 1px solid #ccc;
      margin: 0 0 20px;
  }
  .message .comment ul{
      border-bottom: 1px solid #ececec;
      padding-left: 70px;
  }
  .message .comment .who{
      margin-top:5px;
      line-height: 30px;
      display: flex;
      align-items: center;
  }
  .message .comment .who .page{
      margin-right: 10px;
  }
  .message .comment .who .user{
      color: #1abc9c;
      margin-right: 10px;
  }
  .message .comment .who .sys,.exe{
      text-align: center;
      font-size: 12px;
      background-color: #ededed;
      padding: 0 10px;
      margin-right: 10px;
  }
  .message .comment .who .time{
      flex: 1;
      text-align: right;
      color: #999;
      font-size: 12px;
  }
  .message .comment .write{
      padding: 10px 0;
      line-height: 18px;
      letter-spacing: 1px;
  }
  .message .el-form .form-top{
      display: flex;
  }
  .message .el-form .form-top .el-form-item {
      flex: 1;
  }
  .message .el-form-item__content{
      line-height: 0px !important;
  }
  .message .commnet-total {
      color: #303133;
      line-height: 36px;
      margin-left: 70px;
  }
  @media screen and (max-width: 1000px) and (min-width: 0px){
      .message{
          width: 100%;
          padding: 0 20px;
      }
      .message .form-top{
          flex-direction: column;
      }
      .message .commnet-total{
          margin-left: 0px;
      }
      .message .comment ul{
          padding-left: 0px;
      }
      .message .el-form-item__label{
          text-align: left;
      }
      .message img{
          width: 100%;
      }
  }
</style>
