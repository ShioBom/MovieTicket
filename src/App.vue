<template>
  <el-container>
    <el-header><Header></Header></el-header>
    <el-main><Home></Home></el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>
<script>
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from './components/pages/Home'
export default {
  components: { Header,Footer,Home }
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
  padding-top: 100px;
}
.el-header{
   z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #ccc;
}
</style>
