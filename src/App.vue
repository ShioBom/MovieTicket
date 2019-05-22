<template>
  <el-container>
    <el-header v-if="flag"><Header></Header></el-header>
    <el-main><router-view></router-view></el-main>
    <el-footer v-if="flag"><Footer></Footer></el-footer>
  </el-container>
</template>
<script>
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
export default {
  data(){
    return {
      flag:true
    }
  },
  components: { Header,Footer },
  mounted() {
    if(this.$route.name==="MovieManage"){
      this.flag = false;
    }
  },
};
</script>

<style lang="scss">
body {
  width: 100%;
  height: auto;
}
.el-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.el-header,.el-footer,.el-main{
  width: 100%;
  height: auto !important;
  padding: 0
}
.el-main{
  padding-top: 81px;
}
.el-header{
  background: white;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #ccc;
}
</style>
