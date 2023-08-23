<template>
    <div>
        <el-main >
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
        padding: 20px 0 !important;
        justify-content: center;
        display: flex !important;
        min-height: calc(100vh - 140px);
    }
</style>
