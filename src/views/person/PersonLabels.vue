<template>
    <div class="person-label">
            <div class="tag-cloud">
                <div class="tag-cloud-title">目前共计 {{data.length}} 个标签</div>
                <div  class="tag-cloud-tags animated zoomIn" style="min-height: 350px;">
                    <li  style="font-size: 14.88px;" v-for="(item,i) in data" :key="i" :style="randomRgb(item)">{{item.labelName}}</li>
                </div>
        </div>
    </div>
</template>

<script>
    import {labelsListApi} from 'api/labels'
    export default {
        data() {
            return {
                data:{},
            }
        },
        methods: {
            randomRgb(){
                let R = Math.floor(Math.random() * 255);
                let G = Math.floor(Math.random() * 255);
                let B = Math.floor(Math.random() * 255);
                return {
                    fontSize:Math.random()*5+15+'px',
                    color: 'rgb(' + R + ',' + G + ',' + B + ')'
                };
            }
        },

        created() {
            labelsListApi(this.$route.params.id).then(res=>{
                if(res == undefined) return
                this.data = res.data;
                if(this.data.length == 0){
                    this.$message.warning("该用户下暂时还没有标签o~,请先到后台添加")
                }
            }).catch((e)=>{
                this.$message.error(e);
            })
        }
    }
</script>

<style>
    .person-label {
        width: 70%;
        text-align: center;
        line-height: 2;
        margin: 0 auto;
    }

    .person-label .tag-cloud {
        width: 70%;
        margin: 10% auto;
    }

    .person-label .tag-cloud-title {
        font-size: 17px;
    }

    .person-label .tag-cloud li{
        list-style: none;
        display: inline-block;
        margin: 10px;
        cursor: pointer;
    }

    @media screen and (max-width: 600px){
        .person-label,.tag-cloud {
            width: 100% !important;
        }
    }

</style>
