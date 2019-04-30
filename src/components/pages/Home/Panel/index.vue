<template>
  <div class="panel">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <ul>
      <li v-for="item in movies" :key="item.m_id" @click="goDetail(item.m_id)">
        <div class="movie-item">
          <img :src="item.m_picture" alt="图片找不到了" />
          <span class="movie-name">{{ item.m_name }}</span>
          <span>购票</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    props:["movies"],
  data() {
    return {
      title: "正在热映",
    };
  },
  methods: {
    goDetail(id){
   console.log(this.movies);
      this.$router.push("/Detail/"+id);
    }
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
.panel {
  padding: 65px 10px;
  height: auto;
  min-height: 100%;
  width: 100%;
  .title {
    height: 40px;
    line-height: 40px;
    margin-left: 30px;
    h3 {
      display: inline-block;
      font-size: 28px;
      line-height: 40px;
      color: #ef4238;
    }
  }
  ul {
    overflow: hidden;
    li {
      float: left;
      margin: 20px 0 0 30px;
      display: inline-block;
      vertical-align: top;
      width: 160px;
      height: 260px;
      .movie-item {
        position: relative;
        img {
          width: 160px;
          height: 220px;
        }
        span {
          display: block;
          width: 159px;
          height: 39px;
          text-align: center;
          line-height: 39px;
          border: 1px solid #efefef;
          color: #ef4238;
        }
        .movie-name {
          font-size: 16px;
          height: 30px;
          line-height: 30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border: none;
          color: white;
          position: absolute;
          bottom: 39px;
          background: rgba(0, 0, 0, 0.6);
          left: 0;
        }
      }
    }
  }
}
</style>


