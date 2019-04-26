import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import "./assets/css/reset.css"
// import {Container,Rate} from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = "http://localhost:8080";
new Vue({
  el: '#app',
  render: h => h(App)
})
