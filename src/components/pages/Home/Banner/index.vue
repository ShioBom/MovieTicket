<template>
  <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="(item,ind) in swipers" :key="ind">
        <img :src="item.src" alt="图片迷路了">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
    data(){
        return{
            swipers:[
                {id:0,src:"../../../../../static/img/swiper/swiper01.jpg"},
                {id:1,src:"../../../../../static/img/swiper/swiper02.jpg"},
                {id:2,src:"../../../../../static/img/swiper/swiper03.jpg"},
                {id:3,src:"../../../../../static/img/swiper/swiper04.jpg"}
            ]
        }
    }
};
</script>
<style lang="scss" scoped>
.el-carousel__item img {
    height: 100%;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
