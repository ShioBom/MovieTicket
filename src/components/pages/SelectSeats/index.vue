<template>
  <div class="selectSeats">
    <div id="seat-map">
      <div class="front">屏幕</div>
    </div>
    <div class="booking-details">
      <p>
        影片：<span>{{ movie.m_name }}</span>
      </p>
      <p>
        类型：<span>{{ movie.m_type }}</span>
      </p>
      <p>
        时长：<span>{{ movie.m_length }}</span>
      </p>
      <p>
        时间：<span>{{ getTimeStr() }}</span>
      </p>
      <p>
        影厅：<span>{{ chamber.name }}</span>
      </p>
      <p>
        版本：<span>{{ chamber.ch_lang }}</span>
      </p>
      <p>座位：</p>
      <ul id="selected-seats">
        <li v-for="(item, ind) in selectSeats" :key="ind">{{ item }}</li>
      </ul>
      <p>
        票数：<span id="counter">{{ selectSeats.length }}</span>
      </p>
      <p>
        总计：<b
          >￥<span id="total">{{ totalprice }}</span></b
        >
      </p>
      <el-button
        type="danger"
        size="medium"
        round
        class="checkout-button"
        @click="createOrder"
        >确认购买</el-button
      >
      <div id="legend"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectSeats",
  data() {
    return {
      movie: { price: 50 },
      selectSeats: [],
      selectSeatsID: [],
      status: false,
      map: [],
      price: "",
      chamber: {},
      cinema:{}
    };
  },
  computed: {
    totalprice() {
      return this.selectSeats.length * this.price || 0;
    }
  },
  methods: {
    getSeatsMap(c_id, id) {
      this.$axios.get("/static/seats.json").then(res => {
        this.map = res.data.cinemas[c_id - 1].chambers[id - 1].map;
        this.selectSeatsID =
          res.data.cinemas[c_id - 1].chambers[id - 1].selectSeatsID;
      });
    },
    requsetMovie(id) {
      this.$axios
        .post("http://localhost:3002/client/getCinemaMovie", { id })
        .then(res => {
          this.movie = res.data.result[0];
        });
    },
    requsetChambers(m_id, c_id) {
      this.$axios
        .post("http://localhost:3002/client/getChambers", {
          m_id,
          c_id
        })
        .then(res => {
          res.data.result.forEach(item => {
            if (item.id === Number(this.$route.query.chamber_id)) {
              this.chamber = item;
            }
          });
        });
    },
    requestCinema(c_id){
      this.$axios.post("http://localhost:3002/client/getCinema",{c_id}).then(res=>{
        console.log(res.data.result);
        this.cinema = res.data.result[0];
      })
    },
    getTimeStr(){
      let date = new Date(this.chamber.ch_time);
      let HH = date.getHours();
      let mm = date.getMinutes();
      let MM= date.getMonth()+1;
      let DD = date.getDate();
      if (MM < 10) {
        return `${MM}月${DD}日  ${HH}:0${mm}`;
      }
      return `${MM}月${DD}日  ${HH}:0${mm}`;
    },
    createOrder(){
      let u_id = JSON.parse(sessionStorage.getItem("userInfo")).u_id;
      console.log(this.cinema.c_name);
      let data={
        u_id,
        m_name:this.movie.m_name,
        time:this.getTimeStr(this.chamber.ch_time),
        chamber:this.chamber.name,
        cinema:this.cinema.c_cinema,
        seats:this.selectSeats,
        price:this.price,
      }
      this.$axios({
        method:"post",
        url:"http://localhost:3002/client/insertOrder",
        data:data
      })
      console.log(data);
    }
  },
  created() {
    let m_id = Number(this.$route.query.m_id); //电影id
    let c_id = Number(this.$route.query.c_id); //影院id
    let chamber_id = Number(this.$route.query.chamber_id); //该影厅id
    let price = Number(this.$route.query.price); //该影院该电影售价
    this.price = price;
    //获取座位布局
    this.getSeatsMap(c_id, chamber_id);
    //请求电影数据
    this.requsetMovie(m_id);
    //请求相关影厅数据
    this.requsetChambers(m_id, c_id);
    //获取影院信息
    this.requestCinema(c_id);
  },
  mounted() {
    let self = this;
    setTimeout(() => {
      var sc = $("#seat-map").seatCharts({
        map: this.map,
        click: function() {
          if (this.status() == "available") {
            //获取到点击座位的字符串
            let seat = `${this.settings.id.split("_")[0]}排${
              this.settings.id.split("_")[1]
            }座`;
            //将选中座位添加入选中座位数组中，
            self.selectSeats.push(seat);
            self.selectSeatsID.push(this.settings.id);
            return "selected";
          } else if (this.status() == "selected") {
            let seat = `${this.settings.id.split("_")[0]}排${
              this.settings.id.split("_")[1]
            }座`;
            let ind = self.selectSeats.indexOf(seat);
            if (ind !== -1) {
              //从选中座位中移除选中座位
              self.selectSeats.splice(ind, 1);
              self.selectSeatsID.splice(ind, 1);
            }
            return "available";
          } else if (this.status() == "unavailable") {
            //seat has been already booked
            return "unavailable";
          } else {
            return this.style();
          }
        }
      });
      sc.get(this.selectSeatsID).status("unavailable");
    },500);
  }
};
</script>

<style lang="scss" scoped>
.selectSeats {
  width: 1200px;
  margin: 0 auto;
  height: 400px;
}
.front {
  width: 60%;
  margin: 35px 0 45px 70px;
  background-color: #f0f0f0;
  color: #666;
  text-align: center;
  padding: 3px;
  border-radius: 5px;
}
.booking-details {
  margin-top: 50px;
  float: right;
  position: relative;
  width: auto;
  min-width: 250px;
  height: 450px;
  overflow: hidden;
}

.booking-details h3 {
  margin: 5px 5px 0 0;
  font-size: 16px;
}

.booking-details p {
  line-height: 26px;
  font-size: 16px;
  color: #999;
}

.booking-details p span {
  color: #666;
}

div.seatCharts-cell {
  color: #182c4e;
  height: 25px;
  width: 25px;
  line-height: 25px;
  margin: 3px;
  float: left;
  text-align: center;
  outline: none;
  font-size: 13px;
}

div.seatCharts-seat {
  color: #fff;
  cursor: pointer;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

div.seatCharts-row {
  height: 35px;
}

div.seatCharts-seat.available {
  background-color: #b9dea0;
}

div.seatCharts-seat.focused {
  background-color: #76b474;
  border: none;
}

div.seatCharts-seat.selected {
  background-color: #e6cac4;
}

div.seatCharts-seat.unavailable {
  background-color: #472b34;
  cursor: not-allowed;
}

div.seatCharts-container {
  border-right: 1px dotted #adadad;
  width: 400px;
  padding: 20px;
  float: left;
}

div.seatCharts-legend {
  padding-left: 0px;
  position: absolute;
  bottom: 16px;
}

ul.seatCharts-legendList {
  padding-left: 0px;
}

.seatCharts-legendItem {
  float: left;
  width: 90px;
  margin-top: 10px;
  line-height: 2;
}

span.seatCharts-legendDescription {
  margin-left: 5px;
  line-height: 30px;
}

.checkout-button {
  display: block;
  margin: 10px auto;
  cursor: pointer;
}

#selected-seats {
  max-height: 150px;
  overflow-y: auto;
  overflow-x: none;
  width: 200px;
}

#selected-seats li {
  float: left;
  width: 72px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d3d3d3;
  background: #f7f7f7;
  margin: 6px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}
</style>
