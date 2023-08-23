<template>
    <div class="footer">
        <el-footer>
            <div>© 2017 – 2020 粤ICP备18005467号 </div>
            <div>本站已安全运行 {{day}} 天 </div>
            <div><i class="el-icon-user-solid"></i>&nbsp;3560人 | <i class="el-icon-view"></i>&nbsp;3560次</div>
        </el-footer>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                day:null
            }
        },
        created() {
            let urodz = new Date("11/20/2016");
            let now = new Date();
            let ile = now.getTime() - urodz.getTime();
            this.day = Math.floor(ile / (1000 * 60 * 60 * 24));
        }
    }
</script>

<style>
    .el-footer {
        border-top: 1px solid #ccc;
        color: #333;
        text-align: center;
        line-height: 25px;
        letter-spacing: 1px;
        height: 80px !important;
    }
</style>
