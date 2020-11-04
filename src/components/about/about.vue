<template>
    <div class="about">
        <h2>关于我</h2>
        <div class="content el-row animated bounceInDown">
            <div class="markdown-body">
                <h3><strong>关&nbsp; 于&nbsp; 我</strong></h3>

                <p><strong>网&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 名</strong>：Mr.Yong</p>

                <p><strong>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 业：</strong>PHP开发工程师</p>

                <p><strong>就读大学：</strong>海南热带海洋学院，计算机学院，计算机科学与技术专业</p>

                <p><strong>工作单位：</strong> 深圳市腾讯计算机系统有限公司</p>

                <p><strong>擅长技术：</strong></p>

                <p>精通PHP技术开发，擅长、thinkPHP、Laravel、Yii等框架的开发，</p>

                <p>熟练jQuery、Bootstrap、AJAX、LayUI、EasyUI、Javascript、 Html5、CSS3等前端页面技术，</p>

                <p>熟练使用VUE，iView开发系统，</p>

                <p>掌握Linux等系统基本命令操作，</p>

                <p>使用Python爬取有效的数据进行数据分析。</p>

                <p><strong>个人简介：</strong></p>

                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 一个90后草根站长！17年入行。一直潜心研究web前端技术、PHP后端开发，一边工作一边积累经验，分享一些个人工作经历，以及技术文章等。
                    哈哈</p>

                <p><strong>简历网站</strong>&nbsp;&nbsp; &gt;&gt;&gt;&nbsp;&nbsp;<a href="http://me.myong.top/"
                                                                                target="_blank">进入查看</a></p>

                <p>&nbsp;</p>

                <h3><strong>关于博客</strong></h3>

                <p><strong>博客网址：</strong>www.myong.top</p>

                <p><strong>上线时间：</strong>2017年12月01日</p>

                <p><strong>静态页面</strong>：使用VUE2+ElementUI开发，兼容多端布局，优化界面内容显示</p>

                <p><strong>后台系统：</strong>ThinkPHP5.1框架+LayUI2框架结合实现</p>

                <p><strong>网站简介</strong><strong>：</strong>本站主要的栏目有，标签，分类，在线留言，友情链接以及关于博客。PC端和移动端都可正常浏览</p>

                <p>&nbsp;</p>

                <h3><strong>更新日志</strong></h3>

                <p>2018年8月-2019年1月</p>

                <p>1、更新博客静态页面布局</p>

                <p>2、重构后台系统，使用ThinkPHP5.1开发，前端所有的数据以接口的形式传递</p>

                <p>3、优化博客性能。</p>

                <p>2019年3月-2019年5月</p>

                <p>1、站点管理系统新增，微信公众号管理模块，主要包含关键词自动回复，自定义菜单。</p>

                <p>2、博客开启CDN，优化服务器性能</p>

                <p>2018年6月-2019年5月</p>

                <p>1、更换站点备案信息，</p>

                <p>2、更换web服务为LNMP</p>

                <p>3、微信公众号模块新增，素材管理功能，实现素材新增，上传，群发，预览，与微信服务器素材同步等功能。</p>

                <p>2020年3月-2020年5月</p>

                <p>1、更换站点模板，</p>

                <p>2、站点使用VUE2+ElementUI开发</p>

                <p>3、包含标签，分类，留言板，友链等功能，取消图片显示，优化前端内容。</p>

                <p>&nbsp;</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {},
        components: {},
        created() {

        }
    }
</script>

<style>
    .about {
        width: 65%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .about h2 {
        line-height: 100px;
        color: #555;
        font-weight: 500;
        text-align: center;
        font-size: 19px;
    }

    .about .content {
        color: #555;
        line-height: 2.5;
        font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
    }

    @media screen and (max-width: 768px) and (min-width: 0px) {
        .about {
            width: 100%;
            padding: 0 20px;
        }
    }

</style>
