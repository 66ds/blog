<template>
    <div>
        <el-header>
            <div class="header animated bounce">
                <el-menu router :default-active="this.$route.path"  class="el-menu-demo"  mode="horizontal" active-text-color="#409eff">
                    <span class="header-title"><a href="www.baidu.com">Mr Qian</a></span>
                        <el-menu-item index="/"><i class="el-icon-s-home header-icon animate__animated"></i>首页</el-menu-item>
                        <el-menu-item index="/tags" ><i class="el-icon-paperclip header-icon animate__animated"></i> 标签</el-menu-item>
                        <el-menu-item index="/catagory"><i class="el-icon-s-grid header-icon animate__animated"></i>分类</el-menu-item>
                        <el-menu-item index="/archives"><i class="el-icon-delete-solid header-icon animate__animated"></i>归档</el-menu-item>
                        <el-menu-item index="/message"><i class="el-icon-s-order header-icon animate__animated"></i>留言板</el-menu-item>
                        <el-menu-item index="/link"><i class="el-icon-share header-icon animate__animated"></i>友链</el-menu-item>
                        <el-menu-item index="/music"><i class="el-icon-headset header-icon animate__animated"></i>音乐站</el-menu-item>
                        <el-menu-item index="/about"><i class="el-icon-user-solid header-icon animate__animated"></i>关于</el-menu-item>
                </el-menu>
            </div>
        </el-header>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        }
    }
</script>

<style>
    .el-header {
        padding:0px 0px !important;;
        background-color: #fff;
        color: #333;
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #e6e6e6;
        position: fixed;
        top:0;
        left: 0;
        right: 0;
    }
    .header{
        width: 65%;
        margin: 0 auto;
        position: relative;
    }
    .header-title{
        vertical-align: top;
        line-height: 60px;
        font-size: 24px;
        font-weight: 400;
        font-family: Lato,PingFang SC,Microsoft YaHei,sans-serif;
        position: absolute;
        font-size: 22px;
        font-weight: bolder;
        right: 20px;
    }
    .header-icon{
        width: 16px !important;
        vertical-align: text-bottom !important;
    }
    .el-menu--horizontal > li.el-menu-item {
        border-bottom: none;
    }

    .el-menu--horizontal > li.el-menu-item:hover {
        background-color: #ECF5FF !important;
    }

    .el-menu--horizontal >li.el-menu-item.is-active {
        border-bottom: none;
    }
</style>
