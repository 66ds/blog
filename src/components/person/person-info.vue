<template>
    <div class="about">
        <h2>个人中心</h2>
        <div class="content el-row animated fadeIn">
            <div class="markdown-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户昵称" prop="name">
                        <el-input v-model="ruleForm.userNickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户生日" prop="name">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.userBirthday" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="用户年龄" prop="name">
                        <el-input v-model="ruleForm.userAge"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="name">
                        <el-input v-model="ruleForm.userTelephoneNumber "></el-input>
                    </el-form-item>
                    <el-form-item label="毕业院校" prop="name">
                        <el-input v-model="ruleForm.userSchool"></el-input>
                    </el-form-item>
                    <el-form-item label="用户血型" prop="name">
                        <el-input v-model="ruleForm.userBloodType"></el-input>
                    </el-form-item>
                    <el-form-item label="用户语录" prop="name">
                        <el-input v-model="ruleForm.userSays"></el-input>
                    </el-form-item>
                    <el-form-item label="自我描述" prop="name">
                        <el-input v-model="ruleForm.userDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动形式" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
    function isvalidPhone(str) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        return reg.test(str);
    }

    let validPhone = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入手机号码'));
        } else if (!isvalidPhone(value)) {
            callback(new Error('请输入正确的11位手机号码'));
        } else {
            callback();
        }
    };
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    userBirthday: '',
                    userAge:'',
                    userTelephoneNumber:'',
                    userNickname:'',
                    userDescription:'',
                    userBloodType:'',
                    userSays:''
                },
                rules: {
                    userNickname: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],

                    userSchool: [
                        { required: true, message: '请填写毕业院校', trigger: 'change' }
                    ],
                    userBirthday: [
                        { required: true, message: '请填写用户生日', trigger: 'blur' }
                    ],
                    userAge:[
                        { required: true, message: '年龄不能为空',trigger: 'blur'},
                        { type: 'number', message: '年龄必须为数字值',trigger: 'blur'}
                    ],
                    userTelephoneNumber: [{ required: true, validator: validPhone, trigger: 'blur' }],
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
    .about {
        width: 55%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .about h2 {
        line-height: 100px;
        color: #555;
        font-weight: 500;
        text-align: center;
        font-size: 19px;
    }

    .about .content {
        color: #555;
        line-height: 2.5;
        font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
    }

    @media screen and (max-width: 768px) and (min-width: 0px) {
        .about {
            width: 100%;
            padding: 0 20px;
        }
    }

</style>
