<template>
  <div class="searchPage">
    <Panel :movies="movies" :title="'搜索结果'"></Panel>
  </div>
</template>
<script>
import Panel from "../Home/Panel";
export default {
  data() {
    return {
      movies: []
    };
  },
  components: { Panel },
  methods: {
    queryMovie() {
      let str = this.$route.params.str;
      let data = {
        text: `%${str}%`
      };
      this.$axios
        .post("http://localhost:3002/client/searchMovie", data)
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.movies = res.data.result;
            console.log(res.data.result);
          }
        });
    }
  },
  mounted() {
    this.queryMovie();
  },
  watch: {
    '$route': 'queryMovie'
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
