<template>
  <div class="chamber">
    <div class="movie_info">
      <h3>{{movie.m_name}}</h3>
      <div class="movie-desc">
        <div><span class="key">时长</span><span class="value">{{movie.m_length}}</span></div>
        <div><span class="key">类型</span><span class="value">{{movie.m_type}}</span></div>
      </div>
    </div>
    <div class="show_date">
      <span>观影时间</span>
      <span class="date-item active" v-for="(date, ind) in dates" :key="ind" @click="toggle(ind)">{{
        date
      }}</span>
    </div>
    <div class="chamber_container active">
      <table>
        <thead>
          <tr>
            <th>放映时间</th>
            <th>语言版本</th>
            <th>放映厅</th>
            <th>售价</th>
            <th>选座购票</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,ind) in chambers[status]" :key="ind">
            <td>{{ getTimeStr(item.ch_time) }}</td>
            <td>{{ item.ch_lang }}</td>
            <td>{{ item.name }}</td>
            <td>{{ price }}</td>
            <td>
              <el-button type="danger" size="medium" round>选座购票</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="chamber_container"></div>
  </div>
</template>
<script>
export default {
  name: "Cinemas",
  data() {
    return {
      movie: {},
      chambers: [],
      month: 0,
      price: "",
      dates: [],
      status:1
    };
  },
  computed: {},

  methods: {
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
          let days = []; //存放播放该电影的日;
          res.data.result.forEach(item => {
            let date = new Date(item.ch_time);
            this.month = date.getMonth() + 1;
            let day = date.getDate();
            if (days.indexOf(day) === -1) {
              this.dates.push(this.getDateStr(item.ch_time));
              days.push(day);
            }
          });
          //给排片按照日期分组；
          this.grouping(res.data.result, days);
          console.log(this.chambers);
        });
    },
    //将排片按照日期分组
    grouping(data, days) {
      days.forEach(item => {
        let arr = [];
        data.forEach(ele => {
          let day = new Date(ele.ch_time).getDate();
          if (item === day) {
            arr.push(ele);
          }
        });
        this.chambers.push(arr);
      });
    },
    //整理时钟格式
    getTimeStr(time) {
      let date = new Date(time);
      let HH = date.getHours();
      let MM = date.getMinutes();
      if (MM < 10) {
        return `${HH}:0${MM}`;
      }
      return `${HH}:${MM}`;
    },
    //整理日期格式
    getDateStr(time) {
      let date = new Date(time);
      let MM = date.getMonth() + 1;
      let DD = date.getDate();
      return `${MM}月${DD}日`;
    },
    toggle(ind){
      this.status=ind;
    }
  },
  mounted() {
    //准备参数
    let m_id = Number(this.$route.query.m_id);
    let c_id = Number(this.$route.query.c_id);
    let price = Number(this.$route.query.price);
    this.price = price;
    //请求电影数据
    this.requsetMovie(m_id);
    //请求相关影厅数据
    this.requsetChambers(m_id, c_id);
  }
};
</script>
<style lang="scss" scoped>
.chamber {
  height: auto;
  min-height: 360px;
  width: 1200px;
  margin: 0 auto;
}
.movie_info{
      margin-top: 20px;
    border-bottom: 1px solid #e5e5e5;
    h3{
          display: inline-block;
    margin: 0 20px 20px 0;
    font-size: 26px;
    font-weight: 400;
    color: #333;
    }
    .movie-desc>div{
          display: inline-block;
    font-size: 14px;
    color: #151515;
    margin-bottom: 20px;
    margin-right: 40px;
    .key{
      color: #999;
    }
    .value{
      color: #151515;
    }
    }
}
table {
  width: 100%;
  border: none;
  border-spacing: 0;
  thead {
    background-color: #f7f7f7;
    color: #333;
    font-size: 16px;
    padding: 18px 0;
    th {
      padding: 16px 0;
      text-align: center;
    }
  }
  tbody {
    tr {
      height: 82px;
      td {
        text-align: center;
        width: 20%;
      }
    }
  }
}
.show_date {
  padding: 30px 0;
  font-size: 14px;
  color: #999;
  .date-item {
    display: inline-block;
    background-color: transparent;
    border-radius: 100px;
    color: #333;
    padding: 2px 10px;
    margin-left: 12px;
    cursor: default;
  }
  span.active {
    color: #fff;
    background-color: #f03d37;
  }
}
</style>
