<template>
    <div>
        <el-header>
            <div class="mNavBtn">
                <i :class="[isShow==true?'el-icon-s-operation':'el-icon-close']" @click="operate"></i>
            </div>
            <div class="header">
                <el-menu router :default-active="this.$route.path" class="el-menu-demo animated bounceIn" :mode="mode"
                         active-text-color="#409eff">
                    <el-menu-item index="/"><i class="el-icon-s-home header-icon"></i>首页
                    </el-menu-item>
                    <el-menu-item index="/labels"><i class="el-icon-paperclip header-icon"></i> 标签
                    </el-menu-item>
                    <el-menu-item index="/catagory"><i class="el-icon-s-grid header-icon"></i>分类
                    </el-menu-item>
                    <el-menu-item index="/archives"><i class="el-icon-delete header-icon"></i>归档
                    </el-menu-item>
                    <el-menu-item index="/message"><i class="el-icon-document header-icon"></i>留言板
                    </el-menu-item>
                    <el-menu-item index="/link"><i class="el-icon-share header-icon"></i>友链
                    </el-menu-item>
                    <el-menu-item index="/music"><i class="el-icon-headset header-icon"></i>音乐站
                    </el-menu-item>
                    <el-menu-item index="/about"><i class="el-icon-user header-icon"></i>关于
                    </el-menu-item>
                    <el-menu-item index="/login" v-if="$store.getters.getUser == null"><i class="el-icon-key header-icon"></i>登录
                    </el-menu-item>
                    <el-dropdown trigger="hover"  @command="skip" v-if="$store.getters.getUser != null">
                     <span class="el-dropdown-link">
                             欢迎你:{{$store.getters.getUser.userNickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-edit" command="myBlog">我的博客</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-s-grid" command="myCatagory">我的分类</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-paperclip" command="myLabel">我的标签</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-user" command="userInfo">个人中心</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-view" command="myMessage">我的消息</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-camera">我的关注</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit-outline" command="admin-manager">后台管理</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-switch-button" command="logOut">安全退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div style="float: right;" v-if="$store.getters.getUser != null">
                        <el-avatar :size="60" :src="$store.getters.getUser.userProfilePhoto"></el-avatar>
                    </div>
                </el-menu>
            </div>
            <div class="logo"><a href="www.baidu.com">Mr Qian的博客</a></div>
            <div :class="[isShow==false?'header-change animated rotateIn':'header-change animated rotateOut']"
                 v-bind:style="{'display':display}">
                <ul>
                    <li><a href="/">首页</a></li>
                    <li><a href="/labels">标签</a></li>
                    <li><a href="/catagory">分类</a></li>
                    <li><a href="/archives">归档</a></li>
                    <li><a href="/message">留言板</a></li>
                    <li><a href="/link">友链</a></li>
                    <li><a href="/music">音乐站</a></li>
                    <li><a href="/about">关于</a></li>
                    <li><a href="/login">登录</a></li>
                </ul>
            </div>
        </el-header>
    </div>
</template>

<script>

    import {userInfoByIdApi} from "api/users";

    export default {
        data() {
            return {
                activeIndex: '1',
                mode: 'horizontal',
                isShow: true,
                display: "none"
            };
        },
        created() {
            window.onresize = () => {
                this.display = "none"
                if (window.innerWidth <= 900) {
                    //动态设置教师风采样式
                    this.isShow = true;
                }
            }
            if(this.token!=''){
                this.userInfoById();
            }
        },
        methods: {
            operate() {
                this.display = "block"//这里解决了页面导航栏第一次闪烁问题
                this.isShow = !this.isShow
            },
            //获取用户个人信息
            async userInfoById(){
                try{
                    const res = await userInfoByIdApi();
                    if(res == undefined) return;
                    //保存用户的个人信息
                    this.$store.dispatch("setUser",res.data)
                }catch (e) {
                    this.$message.error(e)
                }
            },
            skip(command){
                //跳转到后台
                if(command == "admin-manager"){
                    window.open("http://127.0.0.1:8080","_blank")
                }
                //登出
                if(command == "logOut"){
                    // document.getElementsByTagName("body")[0].className="el-popup-parent--hidden";
                    this.$confirm('确定登出系统?','登出系统', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        lockScroll:true
                    }).then(() => {
                        //清除后端的token令牌
                        this.$store.dispatch("setToken",'')
                        //清楚用户信息
                        this.$store.dispatch("setUser",null)
                        this.$message.success("退出成功")
                        //刷新当前页
                        location.reload()
                        // document.getElementsByTagName("body")[0].className='';
                    }).catch(() => {
                        // document.getElementsByTagName("body")[0].className='';
                    });

                }
                if(command == "userInfo"){
                    this.$router.push("/person-info")
                }
                if(command == "myBlog"){
                    this.$router.push("/person-blog/"+this.$store.getters.getUser.userId)
                }
                if(command == "myCatagory"){
                    this.$router.push("/person-catagory/"+this.$store.getters.getUser.userId)
                }
                if(command == "myLabel"){
                    this.$router.push("/person-labels/"+this.$store.getters.getUser.userId)
                }
                if(command == "myMessage"){
                    this.$router.push("/person-message")
                }
            }
        },
        computed:{
            token(){
                return this.$store.getters.getToken;
            }
        },
        watch:{
            token:function (newval) {
                if(newval != ''){
                    this.userInfoById();
                }
            }
        }
    }
</script>

<style>
    .el-header {
        padding: 0px 0px !important;;
        background-color: #fff;
        color: #333;
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #e6e6e6;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
    }

    .header {
        width: 65%;
        margin: 0 auto;
        position: relative;
    }

    .el-popup-parent--hidden{
        overflow: hidden !important;
    }

    .header-title {
        vertical-align: top;
        line-height: 60px;
        font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
        position: absolute;
        font-size: 22px;
        font-weight: bolder;
        right: 20px;
    }

    .header-icon {
        width: 16px !important;
        vertical-align: text-bottom !important;
    }

    .el-menu--horizontal > li.el-menu-item {
        border-bottom: none;
    }

    .el-menu--horizontal > li.el-menu-item:hover {
        background-color: #ECF5FF !important;
    }

    .el-menu--horizontal > li.el-menu-item.is-active {
        border-bottom: none;
    }

    .mNavBtn, .logo {
        display: none;
    }

    @media screen and (max-width: 1000px) and (min-width: 0px) {
        .el-menu-demo {
            display: none;
        }

        .mNavBtn {
            display: block;
            position: absolute;
            padding: 0 15px;
            line-height: 60px;
            cursor: pointer;
            font-size: 22px;
        }

        .logo {
            display: block;
            line-height: 60px;
            text-align: center;
            font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
            font-size: 22px;
            font-weight: bolder;
        }

    }

    .header-change {
        background-color: #fff;
    }

    .header-change li {
        text-align: center;
        line-height: 40px;
        border-bottom: 1px solid #e6e6e6;
    }

    .el-dropdown-link {
        cursor: pointer;
        line-height: 60px;
        margin-left: 20px;
        color: #909399;
    }
    .el-icon-arrow-down {
        font-size: 15px;
    }

</style>
