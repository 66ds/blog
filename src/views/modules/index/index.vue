<template>
    <div id="app">
        <!--3.（1）引用-->
            <el-container class="is-vertical">
                <index-header/>
                <index-main>
                    <router-view></router-view>
                </index-main>
                <index-footer></index-footer>
            </el-container>
    </div>
</template>

<script>
    import IndexHeader from '../../../components/common/header/header'
    import IndexMain from '../../../components/common/main/main'
    import IndexFooter from '../../../components/common/footer/footer'
    export default {
        name: 'Index',
        components: {
            IndexHeader,
            IndexMain,
            IndexFooter
        }
    }
</script>

<style>
    .el-container.is-vertical {
        -ms-flex-direction: column;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
    }
</style>
