<template>
  <div class="main">
    <Banner></Banner>
    <Panel :movies="movies"></Panel>
  </div>
</template>
<script>
import Panel from "./Panel";
import Banner from "./Banner";
export default {
  components: { Panel, Banner },
  data() {
    return {
      movies: []
    };
  },
  
  mounted() {
    this.$axios({
      method: "get",
      url: "http://localhost:3002/client/getMovies"
    }).then(res => {
      this.movies = res.data.result;
    });
  }
};
</script>
<style lang="scss" scoped>
.main {
  margin: 0 auto;
  height: auto;
  width: 1200px;
  padding-top: 20px;
}
</style>


