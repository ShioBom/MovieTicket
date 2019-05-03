<template>
  <div class="cart">
    <p class="warning">
      请仔细核对场次信息，出票后将<span class="attention">无法退票和改签</span>
    </p>
    <table class="order_table">
      <thead>
        <tr>
          <th>影片</th>
          <th>时间</th>
          <th>影院</th>
          <th>影厅</th>
          <th>座位</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.o_id">
          <td>{{ item.m_name }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.cinema }}</td>
          <td>
            {{ item.chamber }}
          </td>
          <td>
            {{ item.seat }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="checkout">
      <p>实际支付：<span>¥{{totalPrice}}</span></p>
      <el-button
        type="danger"
        size="medium"
        round
        class="checkout-button"
        @click="cancelOrder()"
        >取消订单</el-button
      >
      <el-button
        type="danger"
        size="medium"
        round
        class="checkout-button"
        @click="checkout()"
        >确认支付</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "Cart",
  data() {
    return {
      orders: [],
      data:{},//请求数据库数据的参数列表
      price:0,
    };
  },
  computed: {
      //计算该订单的总金额
      totalPrice(){
          let count = this.orders.length;
          return count*this.price;
      }
  },
  methods: {
      //请求订单数据
    requestOrders() {
      this.$axios
        .post("http://localhost:3002/client/queryOrderByUser", this.data)
        .then(res => {
          if (res.status === 200) {
            this.orders = res.data.result;
            if(res.data.result.length>0)
            this.price = res.data.result[0].price;
          }
        });
    },
    //取消订单
    cancelOrder(){
        this.$axios.post("http://localhost:3002/client/cancelOrderByUser",this.data).then(res=>{
             if (res.status === 200) {
            console.log(res.data.msg);
            this.orders=[];
          }
        })
    },
    //结算该订单
    checkout() {
       this.$axios.post("http://localhost:3002/client/checkoutByUser",this.data).then(res=>{
             if (res.status === 200) {
            console.log(res.data.msg);
            this.orders=[];
          }
        })
    }
  },
  mounted() {
     this.data={
          u_id: Number(this.$route.query.u_id),
          chamber:this.$route.query.chamber,
          cinema:this.$route.query.cinema,
          m_name:this.$route.query.m_name,
        }
    this.requestOrders();
  }
};
</script>
<style lang="scss" scoped>
.cart {
  width: 1200px;
  min-height: 400px;
  margin: 0 auto;
  .warning {
    margin-top: 10px;
    font-size: 12px;
    color: #666;
    padding-left: 18px;
    background-size: 12px;
    background-position-y: 2px;
    margin-bottom: 8px;
    .attention {
      color: #faaf00;
    }
  }
  .order_table {
    width: 100%;
    border: 1px solid #e5e5e5;
    border-spacing: 0;
    margin-bottom: 60px;
    thead {
      background-color: #f7f7f7;
      th {
        font-size: 16px;
        color: #333;
        width: 20%;
        text-align: center;
        padding: 14px 0;
        font-weight: 400;
      }
    }
    tbody {
      td {
        text-align: center;
        padding: 20px 0;
        color: #333;
        font-size: 14px;
      }
      td:first-child {
        font-size: 16px;
      }
      td:nth-child(2) {
        color: red;
      }
      td:nth-child(4) {
        font-weight: bold;
      }
    }
  }
  .checkout {
    width: 150px;
    height: 150px;
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    justify-items: center;
    .el-button{
        width: 100px;
        margin: 0;
    }
    p {
      span {
        color: red;
        font-size: 24px;
      }
    }
  }
}
</style>
