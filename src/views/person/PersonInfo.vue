<template>
    <div class="person-info">
        <h2>个人中心</h2>
        <div class="content el-row animated fadeIn">
            <div class="markdown-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户id" hidden>
                        <el-input v-model="ruleForm.userId"></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="userNickname">
                        <el-input v-model="ruleForm.userNickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户生日" prop="userBirthday">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.userBirthday" style="width: 100%;" format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="用户年龄" prop="userAge">
                        <el-input v-model="ruleForm.userAge"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="userTelephoneNumber">
                        <el-input v-model="ruleForm.userTelephoneNumber" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业院校" prop="userSchool">
                        <el-input v-model="ruleForm.userSchool"></el-input>
                    </el-form-item>
                    <el-form-item label="用户血型" prop="name">
                        <el-input v-model="ruleForm.userBloodType"></el-input>
                    </el-form-item>
                    <el-form-item label="用户语录" prop="userSays">
                        <el-input v-model="ruleForm.userSays"></el-input>
                    </el-form-item>
                    <el-form-item label="自我描述" prop="userDescription">
                        <el-input v-model="ruleForm.userDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" prop="userEmail">
                        <el-input v-model="ruleForm.userEmail"></el-input>
                    </el-form-item>
                    <el-form-item label="用户头像" prop="userProfilePhoto">
                        <el-upload
                                class="avatar-uploader"
                                action="http://47.100.136.75:12000/api/v1/pri/oos/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :headers="{token:$store.state.token}">
                            <img v-if="ruleForm.userProfilePhoto" :src="ruleForm.userProfilePhoto" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {updateUserInfoByIdApi} from 'api/users'

    function isvalidPhone(str) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        return reg.test(str);
    }

    //验证手机号码
    let validPhone = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入手机号码'));
        } else if (!isvalidPhone(value)) {
            callback(new Error('请输入正确的11位手机号码'));
        } else {
            callback();
        }
    };

    //验证邮箱
    let checkEmail = (rule, value, callback) => {
        if(value!=null && value !=''){
            const regEmail = /^([a-zA-Z0-9])+@([a-zA-Z0-9_-])+([a-zA-Z0-9_-])+/;
            if (regEmail.test(value)) {
                return callback();
            } else {
                callback(new Error("请输入合法邮箱"));
            }
        }else{
            callback()
        }
    };

    //验证年龄
    let checkAge = (rule, value, callback) => {
        if(value!=null && value !=''){
            if (!isNaN(value)) {
                return callback();
            } else {
                callback(new Error("请输入纯数字"));
            }
        }else{
            callback()
        }
    };
    export default {
        data() {
            return {
                imageUrl: '',
                ruleForm: {
                    userId:null,
                    userNickname:null,
                    userBirthday:null,
                    userAge:null,
                    userTelephoneNumber:null,
                    userSchool:null,
                    userBloodType:null,
                    userSays:null,
                    userDescription:null,
                    userEmail:null,
                    userProfilePhoto:null
                },
                rules: {
                    userNickname: [
                        { required: true, message: '请输入用户昵称', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                    ],
                    userAge:[
                        {  required: false, validator: checkAge, trigger: 'blur' }
                    ],
                    userTelephoneNumber: [{ required: true, validator: validPhone, trigger: 'blur' }],
                    userEmail:[{  required: false, validator: checkEmail, trigger: 'blur' }],
                }
            };
        },
        created(){
            //深拷贝对象,并且两个内存地址不同
            Object.assign(
                this.ruleForm,
                this.$store.state.user
            )
        },
        methods: {
            async updateUserInfoById(user){
                try{
                    const res = await updateUserInfoByIdApi(user)
                    if(res == undefined) return
                    this.$message.success('修改成功')
                    //修改用户的个人信息
                    this.$store.dispatch("setUser",res.data)
                }catch (e) {
                    this.$message.error(e)
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateUserInfoById(this.ruleForm)
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res) {
                this.$message.success('上传成功')
                this.ruleForm.userProfilePhoto = res.data
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style>
    .person-info {
        width: 70%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .person-info h2 {
        line-height: 100px;
        color: #555;
        font-weight: 500;
        text-align: center;
        font-size: 19px;
    }

    .person-info .content {
        color: #555;
        line-height: 2.5;
        font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
    }

    .person-info .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .person-info .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .person-info .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .person-info .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    @media screen and (max-width: 768px) and (min-width: 0px) {
        .person-info {
            width: 100%;
            padding: 0 20px;
        }
    }

</style>
