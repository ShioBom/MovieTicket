<template>
  <div class="searchPage">
    <Panel
      :movies="movies"
      :title="'所有影片'"
      :buttonVal="'删除影片'"
      @getMovies="queryMovie()"
    ></Panel>
    <el-divider></el-divider>
    <span>上传电影图片</span>
    <input type="file" accept="image/*" @change="upload($event)" />
    <el-divider></el-divider>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="电影名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电影时长">
        <el-input v-model="form.time"></el-input>
      </el-form-item>
      <el-form-item label="票价">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <!-- <el-form-item label="上映时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 100%;"
          ></el-time-picker>
        </el-col>
      </el-form-item> -->
      <el-form-item label="电影类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="动作" name="type"></el-checkbox>
          <el-checkbox label="冒险" name="type"></el-checkbox>
          <el-checkbox label="剧情" name="type"></el-checkbox>
          <el-checkbox label="悬疑" name="type"></el-checkbox>
          <el-checkbox label="爱情" name="type"></el-checkbox>
          <el-checkbox label="奇幻" name="type"></el-checkbox>
          <el-checkbox label="搞笑" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="电影介绍">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Panel from "../Home/Panel";
export default {
  data() {
    return {
      movies: [],
      form: {
        name: "",
        time: "",
        date1: "",
        date2: "",
        price:"",
        type: [],
        desc: ""
      },
      imgUrl:"",
    };
  },
  components: { Panel },
  methods: {
    queryMovie() {
      this.$axios.get("http://localhost:3002/client/getMovies").then(res => {
        if (res.data.code === 1) {
          this.movies = res.data.result;
        }
      });
    },
    onSubmit() {
      let params={
          m_name:this.form.name,
          m_intro:this.form.desc,
          m_type:this.form.type.join(","),
          m_price:parseFloat(this.form.price),
          m_length:this.form.time,
          m_picture:this.imgUrl,
      }
      this.$axios.post("http://localhost:3002/client/addMovie",params).then(res=>{
          if(res.data.code===1){
              this.queryMovie();
          }
      })
    },
    upload(e) {
        console.log("111");
      // e.preventDefault=true;
      const file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("file", file);
       this.$axios({
        method: "post",
        url: "http://localhost:3002/client/uploadMovie",
        data: param,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.imgUrl = res.data.path;
          console.log(this.imgUrl);
        }
      });
    }
  },

  mounted() {
    this.queryMovie();
  },
  watch: {
    $route: "queryMovie"
  }
};
</script>
<style lang="scss" scoped>
.searchPage {
  margin: 0 auto;
  height: auto;
  min-height: 375px;
  width: 1200px;
}
</style>
<style lang="scss">
.panel {
  padding: 0 !important;
}
</style>
