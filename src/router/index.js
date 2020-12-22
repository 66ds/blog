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
            component: ()=>import("../components/home/home.vue")
        },
        {
            path:'/labels',
            name:'labels',
            component: ()=>import("../components/labels/labels.vue")
        },
        {
            path:'/catagory',
            name:'catagory',
            component: ()=>import("../components/catagory/catagory.vue")
        },
        {
            path:'/archives',
            name:'archives',
            component: ()=>import("../components/archives/archives.vue")
        },
        {
            path:'/message',
            name:'message',
            component: ()=>import("../components/message/message.vue")
        },
        {
            path:'/link',
            name:'link',
            component: ()=>import("../components/link/link.vue")
        },
        {
            path:'/music',
            name:'music',
            component: ()=>import("../components/music/music.vue")
        },
        {
            path:'/about',
            name:'about',
            component: ()=>import("../components/about/about.vue")
        },
        {
            path:'/content/:id',
            name:'content',
            component: ()=>import("../components/content/content.vue")
        },
        {
            path:'/login',
            name:'login',
            component: ()=>import("../components/login/login.vue")
        },
        {
            path:'/person-blog/:id',
            name:'personBlog',
            component: ()=>import("../components/person/person-blog.vue")
        },
        {
            path:'/person-catagory/:id',
            name:'personCatagory',
            component: ()=>import("../components/person/person-catagory.vue")
        },
        {
            path:'/person-labels/:id',
            name:'personLabels',
            component: ()=>import("../components/person/person-labels.vue")
        },
        {
            path:'/person-info',
            name:'personInfo',
            component: ()=>import("../components/person/person-info.vue")
        },
        {
            path:'/person-msg',
            name:'personMsg',
            component: ()=>import("../components/person/person-msg.vue"),
            redirect: '/person-msg/index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: ()=>import("../components/person/msg/index.vue"),
                },
                {
                    path: 'attention',
                    name: 'attention',
                    component: ()=>import("../components/person/msg/attention.vue"),
                },
                {
                    path: 'like',
                    name: 'like',
                    component: ()=>import("../components/person/msg/like.vue"),
                }
            ]
        },
        {
            path:'/chat',
            name:'chat',
            component: ()=>import("../components/chat/chat.vue")
        }


    ]
})
