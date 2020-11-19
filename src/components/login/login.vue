<template>
    <div class="login-wrap">
        <div class="ms-login animated fadeIn">
            <div class="ms-title">欢迎登录</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-user"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="password"
                            v-model="param.password"
                    >
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="loginForm()">登录</el-button>
                </div>
            </el-form>

        </div>
    </div>
</template>

<script>

    import {userLoginApi} from '../../api/users'

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
        data: function() {
            return {
                param: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{ required: true, validator: validPhone, trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                }
            };
        },
        methods: {
            loginForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        userLoginApi(this.param.username, this.param.password).then(res => {
                            if (res.code != 0) {
                                this.$message.error(res.msg);
                            } else {
                                this.$message({
                                    message: '登陆成功',
                                    type: 'success',
                                    duration: 1000,
                                    onClose:()=>{
                                        //设置后端的token令牌
                                        this.$store.commit('setToken',res.data);
                                        //跳转
                                        this.$router.push("/")
                                    }
                                })
                            }
                        }).catch((e)=>{
                            this.$message.error(e);
                        });
                    } else {
                        return false;
                    }
                });
            },

        }
    };
</script>

<style>
    .login-wrap {
        width: 100%;
        height: 100%;
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
        box-shadow:2px 2px 6px #909090;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }


    .el-button > span {
        font-size: 5px !important;
    }
</style>
