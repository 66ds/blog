import Vue from 'vue'
import VRouter from 'vue-router'
const originalPush = VRouter.prototype.push
VRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VRouter)
export default new VRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'main',
            component: ()=>import("components/home/Home.vue")
        },
        {
            path:'/labels',
            name:'labels',
            component: ()=>import("components/labels/Labels.vue")
        },
        {
            path:'/catagory',
            name:'catagory',
            component: ()=>import("components/catagory/Catagory.vue")
        },
        {
            path:'/archives',
            name:'archives',
            component: ()=>import("components/archives/Archives.vue")
        },
        {
            path:'/message',
            name:'message',
            component: ()=>import("components/message/Message.vue")
        },
        {
            path:'/link',
            name:'link',
            component: ()=>import("components/link/Link.vue")
        },
        {
            path:'/music',
            name:'music',
            component: ()=>import("components/music/Music.vue")
        },
        {
            path:'/about',
            name:'about',
            component: ()=>import("components/about/About.vue")
        },
        {
            path:'/content/:id',
            name:'content',
            component: ()=>import("components/content/Content.vue")
        },
        {
            path:'/login',
            name:'login',
            component: ()=>import("components/login/Login.vue")
        },
        {
            path:'/person-blog/:id',
            name:'personBlog',
            component: ()=>import("components/person/PersonBlog.vue")
        },
        {
            path:'/person-catagory/:id',
            name:'personCatagory',
            component: ()=>import("components/person/PersonCatagory.vue")
        },
        {
            path:'/person-labels/:id',
            name:'personLabels',
            component: ()=>import("components/person/PersonLabels.vue")
        },
        {
            path:'/person-info',
            name:'personInfo',
            component: ()=>import("components/person/PersonInfo.vue")
        },
        {
            path:'/person-msg',
            name:'personMsg',
            component: ()=>import("components/person/PersonMsg.vue"),
            redirect: '/person-msg/index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: ()=>import("components/person/msg/Index.vue"),
                },
                {
                    path: 'attention',
                    name: 'attention',
                    component: ()=>import("components/person/msg/Attention.vue"),
                },
                {
                    path: 'like',
                    name: 'like',
                    component: ()=>import("components/person/msg/Like.vue"),
                },
                {
                    path: 'notice',
                    name: 'notice',
                    component: ()=>import("components/person/msg/Notice.vue"),
                }
            ]
        },
        {
            path:'/chat',
            name:'chat',
            component: ()=>import("components/chat/Chat.vue")
        },
        {
            path: '/**',
            name: '404',
            component: () => import('components/error/404.vue')
        }


    ],
    //此处跳转页面后滚动条置0 不跳转不变化
    scrollBehavior (to, from, savedPosition) {
        // if (savedPosition) {
        //  return savedPosition
        // } else {
        //  return { x: 0, y: 0 }
        // }

        return { x: 0, y: 0 }
    }
})
