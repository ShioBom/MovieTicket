import Vue from 'vue'
import VueRouter from "vue-router";


//引入路由对应组件地址
import Home from '../components/pages/Home';
import MovieDetail from "../components/pages/MovieDetail";
import Cinemas from "../components/pages/Cinemas";
//注册

Vue.use(VueRouter);

//配置路由
const routes = [
  { path: "/Detail/:id", component: MovieDetail },
  { path: "/Cinemas", name: "Cinemas", component: Cinemas },
  { path: "/", component: Home }
];
const router = new VueRouter({
    routes,
    mode:"history"
})

export default router;