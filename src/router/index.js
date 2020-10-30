import Vue from 'vue'
import VRouter from 'vue-router'
Vue.use(VRouter)
export default new VRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'main',
            component: ()=>import("../components/index/index.vue")
        },
        {
            path:'/tags',
            name:'tags',
            component: ()=>import("../components/tags/tags.vue")
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
        }

    ]
})
