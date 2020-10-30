<template>
    <div>
        <el-main>
           <slot></slot>
        </el-main>
    </div>
</template>

<script>
    export default {
        data() {
            return{

            }
        },
        methods: {

        },
        components:{

        },
        created() {

        }
    }
</script>

<style>
    .el-main {
        margin-top: 60px;
        z-index: 2;
    }
</style>
