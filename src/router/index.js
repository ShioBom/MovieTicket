import Vue from 'vue'
import VueRouter from "vue-router";


//引入路由对应组件地址
import Home from '../components/pages/Home';
import MovieDetail from "../components/pages/MovieDetail";
import Cinemas from "../components/pages/Cinemas";
import SelectSeats from "../components/pages/SelectSeats";
import Cart from '../components/pages/Cart'
import Search from '../components/pages/Search'
import MovieManage from '../components/pages/MovieManage'
import PrintTicket from '../components/pages/PrintTicket'

//注册

Vue.use(VueRouter);

//配置路由
const routes = [
  { path: "/Detail/:id", component: MovieDetail },
  { path: "/Cinemas", name: "Cinemas", component: Cinemas },
  { path: "/SelectSeats", name: "SelectSeats", component: SelectSeats },
  { path: "/Cart", name: "Cart", component: Cart },
  { path: "/Search/:str", name: "Search", component: Search },
  { path: "/MovieManage", name: "MovieManage", component: MovieManage },
  { path: "/PrintTicket", name: "PrintTicket", component: PrintTicket },
  { path: "/", component: Home }
];
const router = new VueRouter({
    routes,
    mode:"history"
})

export default router;