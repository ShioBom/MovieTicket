import Vue from 'vue'
import VueRouter from "vue-router";

//注册
// Vue.use(VueRouter);

//引入路由对应组件地址
import Home from '../pages/Home/index';
import Frontpage from "../pages/Frontpage/index";

//配置路由
const routes = [
    { path: "/", component: Home },
    { path: "/index", component: Frontpage },
];
const router = new VueRouter({
    routes,
    mode:"history"
})

export default router;