import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index"

const home = () =>
    import ('../views/Home.vue');
const listMusic = () =>
    import ('../views/listMusic.vue');
const control = () =>
    import ('../components/global/control.vue');
const lyric = () =>
    import ('../components/global/lyric.vue');
const search = () =>
    import ('../components/search/Search.vue');
const searchHome = () =>
    import ('../components/search/searchHome.vue');
const searchList = () =>
    import ('../components/search/searchList.vue');
const searchMain = () =>
    import ('../components/search/searchMain.vue');
const login = () =>
    import ("../components/global/login/Login.vue");
const user = () =>
    import ("../views/User.vue");
const phoneLogin = () =>
    import ("../components/global/login/phoneLogin.vue");
const codeLogin = () =>
    import ("../components/global/login/codeLogin.vue");

const routes = [{
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        component: home
    },
    {
        path: "/listMusic",
        component: listMusic
    },
    {
        path: "/control",
        component: control

    },
    {
        path: "/lyric",
        component: lyric
    },
    {
        path: "/login",
        component: login
    }, {
        path: "/user",
        component: user
    },
    {
        path: "/phoneLogin",
        component: phoneLogin
    },
    {
        path: "/codeLogin",
        component: codeLogin
    },
    {
        path: "/search",
        component: search,
        children: [{
                path: '/search',
                redirect: "/search/searchHome"
            },
            {
                path: "searchHome",
                component: searchHome,
                name: searchHome
            }, {
                path: "searchList",
                component: searchList
            },
            {
                path: "searchMain",
                component: searchMain
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(""),
    routes

})

router.beforeEach((to, from, next) => {
    if (to.href === "/user") {
        if (!store.state.user.isLogin) {
            next('/login');
        } else {
            next()
        }
    } else {
        next()
    }

})

export default router