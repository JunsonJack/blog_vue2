
export const NOT_FOUND_ROUTE = {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "not-found" */ "@/views/Not_Found.vue"),
    meta: {
        title: "页面找不到了",
    },
};

export const FALLBACK_ROUTE = {
    name: "Fallback",
    path: "/:pathMatch(.*)*",
    redirect: "/404",
};


