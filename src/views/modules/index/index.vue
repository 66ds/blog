<template>
    <div id="app">
        <el-container>
            <index-header/>
            <index-main>
                <router-view></router-view>
            </index-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
    import IndexHeader from '../../../components/common/header/header'
    import IndexMain from '../../../components/common/main/main'
    export default {
        name: 'Index',
        components: {
            IndexHeader,
            IndexMain
        }
    }
</script>

<style>
   .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

</style>
