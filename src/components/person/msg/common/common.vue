<template>
    <div class="msg-content view animated fadeIn">
        <div class="msg-all">
            <div class="msg-message" v-if="data.length == 0">
                <p>空空如也</p>
            </div>
            <div class="msg-info clearfix msg-info-wrap" v-else><a>清空所有消息</a></div>
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {

            }
        },
        props: {
            data: {
                type: Array,
                default: () => []
            },
        },
        methods: {

        },
        components: {},
        created() {
        }
    }
</script>

<style>

</style>
