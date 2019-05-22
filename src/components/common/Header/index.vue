<template>
  <div class="nav">
    <a href="">
      <img src="../../../assets/logo.jpg" alt="" />
      <span>胖达电影</span>
    </a>
    <ul>
      <li class="active" @click="goIndex()">首页</li>
     
    </ul>
    <div class="form">
      <input type="text" v-model="txt" @keyup.enter="search()" placeholder="搜索电影" />
      <input type="submit" @click="search()" />
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="portrait">
          <img :src="imgSrc" alt="" />
        </div>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-if="!loginStatus" ><span @click="login()">登录</span></el-dropdown-item>
        <el-dropdown-item divided v-if="loginStatus"><span  @click="exit()" >退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginStatus: this.UrlSearch(),
      txt:"",
      imgSrc:JSON.parse(sessionStorage.getItem("userInfo")).u_img,
    };
  },
  //获取url地址栏的参数
  methods: {
    UrlSearch() {
      var name, value;
      var str = location.href; //取得整个地址栏
      var num = str.indexOf("?");
      str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
      console.log(str);
      var arr = str.split("&"); //各个参数放到数组里
      for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
          name = arr[i].substring(0, num);
          value = arr[i].substr(num + 1);
          this[name] = value;
        }
      }
      return parseInt(this.u_id);
    },
    login(){
      console.log("login");
      location.href="http://localhost:3002/admin/login";
    },
    exit(){
      sessionStorage.removeItem("userInfo");
      location.href="http://localhost:8080";
    },
    search(){
      this.$router.push(`/Search/${this.txt}`);
    },
    goIndex(){
      let u_id = JSON.parse(sessionStorage.getItem("userInfo")).u_id;
      console.log(u_id);
      if(u_id!==null){
       location.href = `http://localhost:8080/?u_id=${u_id}`;
      }else{
       location.href = `http://localhost:8080`;
      }
    },
    getPortrait(){
       let u_id = JSON.parse(sessionStorage.getItem("userInfo")).u_id;
      this.$axios.post("http://localhost:3002/client/getPortrait",{u_id}).then(res=>{
        console.log(res);
        if(res.data.code===1){
          let obj ={
            u_id,
            u_img:res.data.img
          }
          sessionStorage.setItem("userInfo",JSON.stringify(obj))
          console.log(obj);
        }
      })
    }
  },
  mounted() {
    this.getPortrait();
  },
};
</script>
<style lang="scss" scoped>
.nav {
  margin: 0 auto;
  height: 80px;
  width: 1200px;
  font-size: 18px;
  background: white;
  a {
    color:#ef4238;
    float: left;
    display: block;
    width: 133px;
    line-height: 80px;
    height: 100%;
    font-style: "微软雅黑";
    img {
      width: 40px;
    }
  }
  ul {
    float: left;
    width: 420px;
    height: 100%;
    display: flex;
    li {
      text-align: center;
      width: 70px;
      height: 100%;
      line-height: 80px;
    }
    li.active {
      background: #ef4238;
        color: white;
    }
    li:hover{
      color: #ef4238;
      background:rgb(201, 127, 127);
    }
  }
  .form {
    float: left;
    margin-top: 20px;
    display: block;
    width: 220px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding-left: 20px;
    input {
      float: left;
      font-size: 16px;
      vertical-align: center;
      height: 100%;
      width: 160px;
    }
    input[type="submit"] {
      display: block;
      width: 38px;
      height: 38px;
      border-radius: 20px;
      background: #ef4238;
    }
  }
  .el-dropdown {
    .portrait {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      img {
        width: 100%;
      }
    }
    float: right;
    margin-top: 30px;
    padding-right: 10px;
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>


