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
            component: ()=>import("views/home/Home.vue")
        },
        {
            path:'/labels',
            name:'labels',
            component: ()=>import("views/labels/Labels.vue")
        },
        {
            path:'/catagory',
            name:'catagory',
            component: ()=>import("views/catagory/Catagory.vue")
        },
        {
            path:'/archives',
            name:'archives',
            component: ()=>import("views/archives/Archives.vue")
        },
        {
            path:'/message',
            name:'message',
            component: ()=>import("views/message/Message.vue")
        },
        {
            path:'/link',
            name:'link',
            component: ()=>import("views/link/Link.vue")
        },
        {
            path:'/music',
            name:'music',
            component: ()=>import("views/music/Music.vue")
        },
        {
            path:'/about',
            name:'about',
            component: ()=>import("views/about/About.vue")
        },
        {
            path:'/content/:id',
            name:'content',
            component: ()=>import("views/content/Content.vue")
        },
        {
            path:'/login',
            name:'login',
            component: ()=>import("views/login/Login.vue")
        },
        {
            path:'/person-blog/:id',
            name:'personBlog',
            component: ()=>import("views/person/PersonBlog.vue")
        },
        {
            path:'/person-catagory/:id',
            name:'personCatagory',
            component: ()=>import("views/person/PersonCatagory.vue")
        },
        {
            path:'/person-labels/:id',
            name:'personLabels',
            component: ()=>import("views/person/PersonLabels.vue")
        },
        {
            path:'/person-info',
            name:'personInfo',
            component: ()=>import("views/person/PersonInfo.vue")
        },
        {
            path:'/person-msg',
            name:'personMsg',
            component: ()=>import("views/person/PersonMsg.vue"),
            redirect: '/person-msg/index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: ()=>import("views/person/msg/Index.vue"),
                },
                {
                    path: 'attention',
                    name: 'attention',
                    component: ()=>import("views/person/msg/Attention.vue"),
                },
                {
                    path: 'like',
                    name: 'like',
                    component: ()=>import("views/person/msg/Like.vue"),
                },
                {
                    path: 'notice',
                    name: 'notice',
                    component: ()=>import("views/person/msg/Notice.vue"),
                }
            ]
        },
        {
            path:'/chat',
            name:'chat',
            component: ()=>import("views/chat/Chat.vue")
        },
        {
            path: '/**',
            name: '404',
            component: () => import('views/error/404.vue')
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
