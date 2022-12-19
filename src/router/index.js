import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/HomeView.vue'
import { Sys_Route } from '../router/system'
import { NOT_FOUND_ROUTE, FALLBACK_ROUTE } from '../router/not_found'
import NProgress from 'nprogress' // 引入nprogress插件 
import 'nprogress/nprogress.css' // 引入 nprogress 样式

Vue.use(Router)

export const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/index',
            meta: {
                title: "Home",
            },
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('../views/IndexView.vue'),
                    meta: {
                        title: "首页",
                        isShow: true
                    },
                },
                {
                    path: 'list',
                    name: 'list',
                    component: () => import('../views/ListView.vue'),
                    meta: {
                        title: "列表页",
                        isShow: true
                    },
                },
                {
                    path: 'detail',
                    name: 'detail',
                    component: () => import('../views/DetailView.vue'),
                    meta: {
                        title: "详情页",
                        isShow: false
                    },
                },
                {
                    path: 'itnotes',
                    name: 'itnotes',
                    component: () => import('../views/ITnotes.vue'),
                    meta: {
                        title: "IT技术笔记",
                        isShow: true
                    },
                },
                {
                    path: 'daily',
                    name: 'daily',
                    component: () => import('../views/DailyView.vue'),
                    meta: {
                        title: "日常分享",
                        isShow: true
                    },
                }

            ]
        },
        ...Sys_Route,
        NOT_FOUND_ROUTE,
        FALLBACK_ROUTE
    ]
})

let ignore_Path = ['/', '/index', '/list', '/detail', '/daily', '/itnotes','/login']



router.beforeEach((to, from, next) => {
    NProgress.start()
    if (ignore_Path.includes(to.path)) {
        next()
    } else {
        if (window.localStorage.getItem('blog_token')) {
            next()
        } else {
            next('/')
        }
    }


})

router.afterEach((to) => {
    NProgress.done()
    document.title = to.meta.title
})


