import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router/index.js'
import "./assets/css/reset.css"
// import {Container,Rate} from 'element-ui';
import ElementUI from "element-ui";
import './assets/css/jquery.seat-charts.css'
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = "http://localhost:8080";
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
