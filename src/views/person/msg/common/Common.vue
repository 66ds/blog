<template>
    <div class="animated fadeIn">
        <div>
            <div class="msg-message" v-if="data.length == 0">
                <!-- <p>空空如也</p> -->
                <img src="~assets/empty/empty.png"/>
            </div>
            <div class="msg-info clearfix"  v-else><a @click="deleteAll">清空所有消息</a></div>
            <slot v-if="data.length != 0"></slot>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                flag:false
            }
        },
        props: {
            data: {
                type: Array,
                default: () => []
            }
        },
        methods: {

            deleteAll () {
                let data = this.data.reduce((n,m) => {
                    if(m.alias != undefined){
                        this.flag = false
                        return n.concat({alias:m.alias,data:m.ids})
                    }else{
                        this.flag = true
                        return n.concat(m.ids)
                    }
                },[]);
                if(!this.flag){
                   data = this.assign(data)
                }
                 this.$emit('deleteAll',data)
            },
            assign(data){
                let resultArr = [];
                let resultObj = {};
                data.forEach((obj)=>{
                    if(!resultObj[obj.alias]){
                        resultObj[obj.alias] = obj.data
                    }else{
                        resultObj[obj.alias] = resultObj[obj.alias].concat(obj.data)
                    }
                })
                resultArr.push(resultObj)
                return resultArr
            }
        },
        components: {},
        created() {
        }
    }
</script>

<style>

</style>
