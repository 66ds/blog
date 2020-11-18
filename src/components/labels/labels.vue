<template>
    <div class="tags">
            <div class="tag-cloud">
                <div class="tag-cloud-title">目前共计 {{data.length}} 个标签</div>
                <div  class="tag-cloud-tags animated zoomIn" style="min-height: 350px;">
                    <li  style="font-size: 14.88px;" v-for="(item,i) in data" :key="i" :style="randomRgb(item)">{{item.labelName}}</li>
<!--                    <li data-v-216999c2="" style="font-size: 19.92px; color: rgb(71, 128, 105);">MySQL</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 23.52px; color: rgb(73, 81, 61);">Python</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 14.88px; color: rgb(70, 93, 115);">数据库</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 13.44px; color: rgb(145, 85, 128);">MongoDB</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(65, 142, 85);">Oracle</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 14.16px; color: rgb(55, 101, 72);">Yii2</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 15.6px; color: rgb(122, 63, 84);">web</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(130, 116, 122);">监控</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(106, 98, 85);">Url</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 14.88px; color: rgb(104, 108, 133);">服务器</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 14.88px; color: rgb(110, 78, 152);">Nginx</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 15.6px; color: rgb(62, 130, 87);">Centos7</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 13.44px; color: rgb(84, 61, 51);">Apache</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 17.04px; color: rgb(55, 94, 134);">Linux</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(63, 67, 81);">Svn</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(105, 147, 117);">服务</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 14.88px; color: rgb(132, 148, 58);">前端</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 14.16px; color: rgb(69, 128, 53);">Javascript</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(121, 131, 129);">排序</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(93, 85, 106);">冒泡</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(56, 81, 80);">three.js</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 14.16px; color: rgb(124, 130, 80);">设计模式</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 14.16px; color: rgb(109, 97, 64);">后端</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(134, 89, 69);">ThinkPHP</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(79, 133, 111);">Layui</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 17.76px; color: rgb(83, 92, 62);">爬虫</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(134, 76, 126);">多线程</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(116, 138, 104);">Yii</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 19.2px; color: rgb(52, 72, 57);">工作项目</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(106, 113, 67);">虚拟机</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12.72px; color: rgb(78, 123, 63);">InfluxDB</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(120, 67, 87);">Composer</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(126, 146, 108);">内网</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(116, 131, 78);">Git</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 13.44px; color: rgb(110, 121, 51);">Laravel</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(91, 75, 95);">事务</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 13.44px; color: rgb(103, 122, 141);">面试</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(66, 91, 88);">核心技术</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(96, 131, 51);">框架</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(60, 59, 125);">反爬虫</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12.72px; color: rgb(78, 119, 120);">题解</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12.72px; color: rgb(65, 59, 122);">leetcode</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(84, 114, 135);">Hexo</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(63, 116, 89);">性能</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(147, 114, 135);">Docker</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(152, 67, 72);">Curl</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(115, 73, 83);">window</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(104, 80, 138);">Scrapy</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(85, 137, 135);">代理</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(124, 133, 86);">邮箱</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(88, 63, 74);">Redis</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(80, 123, 139);">Django</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(149, 131, 129);">Memcache</li>-->
<!--                    <li data-v-216999c2="" style="font-size: 12px; color: rgb(111, 120, 151);">缓存</li>-->
                </div>
        </div>
    </div>
</template>

<script>
    import {labelsListApi} from '../../api/labels'
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
            labelsListApi().then(res=>{
                this.data = res.data
            })
        }
    }
</script>

<style>
    .tags {
        width: 65%;
        text-align: center;
        line-height: 2;
        margin: 0 auto;
    }

    .tags .tag-cloud {
        width: 70%;
        margin: 10% auto;
    }

    .tags .tag-cloud-title {
        font-size: 17px;
    }

    .tags .tag-cloud li{
        list-style: none;
        display: inline-block;
        margin: 10px;
        cursor: pointer;
    }

    @media screen and (max-width: 600px){
        .tags,.tag-cloud {
            width: 100% !important;
        }
    }

</style>
