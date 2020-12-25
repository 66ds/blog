<template>
    <div class="msg-content view animated fadeIn">
        <div class="msg-all">
            <div class="msg-message" v-if="data.length == 0">
                <p>空空如也</p>
            </div>
            <div class="msg-info clearfix msg-info-wrap" v-else><a @click="deleteAll">清空所有消息</a></div>
            <slot></slot>
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
                console.log(data)
                // this.$emit('deleteAll',data)
            },
            assign(data){
                let resultArr = [];
                let resultObj = {};
                data.forEach((obj)=>{
                    if(!resultObj[obj.alias]){
                        resultObj[obj.alias] = [obj.data]
                    }else{
                        resultObj[obj.alias].push(obj.data)
                    }
                })

                for(let key in resultObj){
                    let newObj = {
                        type:key,
                        value:resultObj[key].join(',')
                    }
                    resultArr.push(newObj)
                }
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
