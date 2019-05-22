<template>
  <div class="searchPage">
    <ul>
      <li v-for="(item,ind) in orders" :key="ind">
        <dl>
          <dt>{{item.m_name}}</dt>
          <dd><span>影院：</span>{{item.cinema}}</dd>
          <dd><span>放映时间：</span>{{item.o_time}}</dd>
          <dd><span>影厅：</span>{{item.chamber}}</dd>
          <dd><span>价格:</span>{{item.price}}</dd>
          <dd><span>座位：</span>{{item.seat}}</dd>
        </dl>
        <button>打印票据</button>
      </li>
    </ul>
  </div>
</template>
<script>
import Panel from "../Home/Panel";
export default {
  data() {
    return {
      orders: []
    };
  },
  components: { Panel },
  methods: {
    queryMovie() {
      let u_id = JSON.parse(sessionStorage.getItem("userInfo")).u_id;
      this.$axios
        .post("http://localhost:3002/client/getOrderByID", {u_id:u_id})
        .then(res => {
          console.log(res);
          if (res.data.status === 200) {
            this.orders = res.data.result;
            console.log(this.orders);
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
  ul{
    width: 1200px;
    margin: 0 auto;
    background: pink;
  }
  li{
    float: left;
    height: auto;
    padding: 10px;
    background: lightgoldenrodyellow;
    margin: 15px;
    text-align: center;
    button{
      background: lightcoral;
      height: 30px;
      padding: 5px 10px;
      border-radius: 20px;
      color: white;
    }
    dt{
      color: black;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      height: 28px;
      line-height: 28px;
    }
    dd{
      text-align: start;
      font-size: 16px;
      line-height: 28px;
      span{
        color: lightseagreen;
      }
    }
  }
}
</style>
