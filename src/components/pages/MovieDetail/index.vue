<template>
  <div class="movie-detail">
    <div class="banner_wrap">
      <div class="banner">
        <div class="left">
          <img :src="movie.m_picture" alt="该电影的图片迷路了" />
        </div>
        <div class="right">
          <div class="movie-brief">
            <h2>{{ movie.m_name }}</h2>
            <ul>
              <li>{{ movie.m_type }}</li>
              <li>{{ movie.m_length }}</li>
              <li>{{ movie.m_time }}</li>
            </ul>
          </div>
          <div class="movie_button">
            <button @click="toggle">特惠购票</button>
          </div>
          <div class="movie_status">
            <p>用户评分</p>
            <div class="score">
              <el-rate
                v-model="totalScore"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
              <span>共计{{ scorePersonNum }}人评分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="介绍" name="first">
          <h2>
            影片介绍
          </h2>
          <p>{{ movie.m_intro }}</p></el-tab-pane
        >
        <el-tab-pane label="演员" name="second">
          <h2>
            演员<i>({{ actors.length }})</i>
          </h2>
          <ul class="actor">
            <li v-for="actor in actors" :key="actor.a_id">
              <img :src="actor.a_photo" alt="演员不存在呢" />
              <p>
                {{ actor.a_actor }}
                <span>{{ actor.a_role }}</span>
              </p>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="评论" name="third">
          <h2>
            热门短评
          </h2>
          <span @click="dialogVisible = true">写短评</span>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose"
          >
            <em>请点击星星评分:</em>
            <el-rate
              v-model="grade"
              text-color="#ff9900"
              allow-half
              show-score
            ></el-rate>
            <el-divider></el-divider>
            <el-input placeholder="请输入评论" v-model="review"></el-input>
            <el-divider></el-divider>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addReview()">确 定</el-button>
          </el-dialog>
          <ul class="review">
            <li v-for="(review, ind) in reviews" :key="ind">
              <div class="left">
                <div class="portrait">
                  <img :src="review.u_img" alt="图片消失了" />
                </div>
              </div>
              <div class="right">
                <div class="title">
                  <div class="user">{{ review.u_name }}</div>
                  <i>{{ review.r_date }}</i>
                  <el-rate
                    v-model="review.r_grade"
                    disabled
                    show-score
                    text-color="#ff9900"
                  ></el-rate>
                </div>
                <div class="content">
                  {{ review.r_content }}
                </div>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="影院列表" name="fifth">
          <h2>
            影院列表
          </h2>
          <ul class="cinema">
            <li v-for="(cinema, ind) in cinemas" :key="ind">
              <div class="cinema_info">
                <h3>{{ cinema.c_cinema }}</h3>
                <p>{{ cinema.c_address }}</p>
              </div>
              <button
                @click="selectChamber(cinema.c_id, movie.m_id, cinema.price)"
              >
                选座购票
              </button>
              <div class="price">
                <span>¥{{ cinema.price }}</span> 起
              </div>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movie: {},
      activeName: "first",
      actors: [],
      reviews: [],
      cinemas: [],
      dialogVisible: false,
      review: "",
      value: 4.5,
      grade: null, //用户给与的评分,
      totalScore: 0,
      scorePersonNum: 0
    };
  },
  methods: {
    //点击特惠购票切换到购票页面
    toggle() {
      this.activeName = "fifth";
      this.selectCinema();
    },
    //发表评论
    addReview() {
      this.dialogVisible = false;
      console.log(this.review, this.grade);
      let data = {
        r_content: this.review,
        u_id: JSON.parse(sessionStorage.getItem("userInfo")).u_id,
        m_id: this.$route.params.id,
        r_grade: this.grade
      };
      this.$axios
        .post("http://localhost:3002/client/addReview", data)
        .then(res => {
          if (res.data.status === 200) {
            console.log("评论发布成功");
          }
        });
      this.review = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //第一个参数是影院id，第二个参数是电影id
    selectChamber(c_id, m_id, price) {
      console.log(c_id, m_id);
      this.$router.push({
        name: "Cinemas",
        path: "/Cinema",
        query: {
          c_id,
          m_id,
          price
        }
      });
    },
    handleClick(tab, event) {
      if (tab.label === "演员") {
        this.getActorsData();
      } else if (tab.label === "评论") {
        this.getReviewData();
      } else if (tab.label === "影院列表") {
        this.selectCinema();
      }
    },
    //获取该电影的演员列表
    getActorsData() {
      this.$axios({
        method: "post",
        url: "http://localhost:3002/client/getActors",
        data: { m_id: this.$route.params.id }
      }).then(res => {
        this.actors = res.data.result;
      });
    },
    //获取该电影的评论列表
    getReviewData() {
      this.$axios({
        method: "post",
        url: "http://localhost:3002/client/getReviews",
        data: { m_id: this.$route.params.id }
      }).then(res => {
        this.reviews = res.data.result;
        console.log(this.reviews);
        //将时间戳转化为日期显示
        res.data.result.forEach(ele => {
          let date = new Date(ele.r_date);
          ele.r_date = date.getMonth() + 1 + "月" + date.getDate() + "日";
        });
      });
    },
    //获取评分人数和总评分
    getScore() {
      this.$axios({
        method: "post",
        url: "http://localhost:3002/client/getAvgGrade",
        data: { m_id: this.$route.params.id }
      }).then(res => {
        if (res.data.code === 1) {
          this.scorePersonNum = res.data.result.userNum
          this.totalScore =Math.floor( res.data.result.avgGrade * 100) / 100;
        }
      });
    },
    //获取该电影的影院列表
    selectCinema() {
      this.$axios({
        method: "post",
        url: "http://localhost:3002/client/getCinemas",
        data: { m_id: this.$route.params.id }
      }).then(res => {
        this.cinemas = res.data.result;
      });
    }
  },
  mounted() {
    this.$axios({
      method: "post",
      url: "http://localhost:3002/client/getMovie",
      data: { m_id: this.$route.params.id }
    }).then(res => {
      if (res.data.code === 1) {
        this.movie = res.data.result[0];
        this.movie.m_picture = res.data.result[0]["m_picture"].substr(3);
      }
    });
    this.getScore();
  }
};
</script>
<style lang="scss" scoped>
.movie-detail {
  margin: 0 auto;
  height: auto;
  width: 100%;
  .banner_wrap {
    width: 100%;
    height: 376px;
    background: url("../../../../static/img/background/banner_bg.jpg");
    .banner {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      .left {
        float: left;
        position: relative;
        top: 70px;
        width: 232px;
        padding-bottom: 40px;
        margin: 0 30px;
        img {
          border: 4px solid #fff;
          height: 322px;
          width: 232px;
        }
      }
      .right {
        position: relative;
        width: 900px;
        float: right;
        top: 70px;
        color: white;
        .movie_status {
          p {
            font-size: 12px;
            margin-bottom: 8px;
          }
          span {
            display: inline-block;
            margin-top: 8px;
            font-size: 12px;
          }
          position: absolute;
          top: 158px;
          left: 342px;
        }
        h2 {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        ul {
          li {
            height: 30px;
          }
        }
        .movie_button {
          padding-top: 60px;
          button {
            width: 250px;
            height: 40px;
            background: red;
            line-height: 40px;
            text-align: 40px;
            color: white;
            font-size: 18px;
          }
        }
      }
    }
  }
  .detail {
    width: 1200px;
    height: auto;
    margin: 50px auto 20px;
    h2 {
      display: inline-block;
      margin-bottom: 20px;
      font-weight: 400;
      font-size: 18px;
      color: #333;
      line-height: 18px;
      span {
        line-height: 16px;
        font-size: 14px;
        color: #999;
      }
    }
    span {
      margin-left: 400px;
      display: inline-block;
      padding: 8px;
      border-radius: 15px;
      border: salmon 1px solid;
      color: salmon;
      cursor: pointer;
    }
    h2::before {
      float: left;
      content: "";
      display: inline-block;
      width: 4px;
      height: 18px;
      margin-right: 6px;
      background-color: #ef4238;
    }
    .actor {
      li {
        float: left;
        width: 128px;
        margin-right: 20px;
        margin-bottom: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        img {
          width: 128px;
          height: 170px;
        }
        p {
          height: 50px;
          overflow: hidden;
          padding: 5px;
          text-align: center;
          margin-top: 8px;
          line-height: 1.2;
          color: #333;
          span {
            font-size: 14px;
            line-height: 1.2;
            color: #666;
            display: block;
          }
        }
      }
    }
    .review {
      width: 100%;
      height: auto;
      li {
        height: auto;
        overflow: hidden;
        margin: 20px 0;
        .left {
          margin-right: 20px;
          float: left;
          width: 50px;
          height: 50px;
          .portrait {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            overflow: hidden;
            img {
              width: 50px;
              height: 50px;
            }
          }
        }
        .right {
          margin-left: 70px;
          .title {
            height: 50px;
            font-size: 16px;
            line-height: 16px;
            .user {
              vertical-align: middle;
              color: #333;
              font-size: 16px;
              margin: 5px 0;
            }
            i {
              float: left;
              color: #999;
            }
          }
          .content {
            margin-top: 10px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e5e5e5;
            color: #666;
            line-height: 26px;
            font-size: 14px;
          }
        }
      }
    }
    .cinema {
      width: 100%;
      li {
        display: block;
        padding: 20px 0;
        border-bottom: 1px dashed #e5e5e5;
        .cinema_info {
          display: inline-block;
          max-width: 80%;
          h3 {
            display: inline-block;
            font-size: 16px;
            line-height: 18px;
            color: #333;
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            line-height: 14px;
            color: #999;
          }
        }
        .price {
          float: right;
          font-size: 12px;
          color: #999;
          height: 45px;
          line-height: 45px;
          span {
            font-size: 16px;
            margin-right: -3px;
            font-weight: 700;
            color: #f03d37;
            border: none;
            padding: 0;
          }
        }
        button {
          float: right;
          width: 80px;
          height: 30px;
          line-height: 45px;
          margin: 5px 0 0 36px;
          display: inline-block;
          color: #fff;
          background-color: #f03d37;
          font-size: 14px;
          line-height: 30px;
          border-radius: 100px;
          text-align: center;
          -webkit-box-shadow: 0 2px 10px -2px #f03d37;
          box-shadow: 0 2px 10px -2px #f03d37;
        }
      }
    }
  }
}
</style>
