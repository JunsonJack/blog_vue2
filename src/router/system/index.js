import SysHome from '@/views/System/SysHome'
import SysLogin from '@/views/System/SysLogin'

export const Sys_Route = [
    {
        path: '/login',
        name: 'SysLogin',
        component: SysLogin,
        meta: {
            title: "登录系统",
        },
    },
    {
        path: '/sysHome',
        name: 'sysHome',
        redirect:'/sysIndex',
        component: SysHome,
        meta: {
            title: "后台系统首页",
        },
        children:[
            {
                path: '/sysIndex',
                name: 'sysIndex',
                component: () => import('@/views/System/SysIndex.vue'),
                meta: {
                    title: "系统工作台",
                    isShow:true,
                    icon: 'el-icon-monitor'
                },
            },
            {
                path: '/sysNotes',
                name: 'sysNotes',
                component: () => import('@/views/System/SysNotes.vue'),
                meta: {
                    title: "技术笔记",
                    isShow:true,
                    icon: 'el-icon-edit'
                },
            },
            {
                path: '/sysShare',
                name: 'sysShare',
                component: () => import('@/views/System/SyShare.vue'),
                meta: {
                    title: "日常分享",
                    isShow:true,
                    icon: 'el-icon-menu'
                },
            },
            {
                path: '/sysManage',
                name: 'sysManage',
                component: () => import('@/views/System/SysManage.vue'),
                meta: {
                    title: "文章管理",
                    isShow:true,
                    icon: 'el-icon-document'
                },
            }
        ]
    }
]

    
