<template>
  <div>
    <!-- 头部搜索栏 -->
    <div class="serch_bar">
      <van-row>
        <van-col span="3">
          <img :src="lactionIcon" class="location-icon" alt="" width="80%">
        </van-col>
        <van-col span="16">
          <input type="text" class="serch_input" />
        </van-col>
        <van-col span="5">
          <van-button @click="goGoodsList" size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- ？轮播图 -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 大类 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index+cate" @click="goGoodsListId(cate.mallCategoryId)">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>{{item.price | moneyFilter}} ({{item.mallPrice |moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hottitle">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter=''>
            <van-col :span="12" v-for="(item,index) in hotgoods" :key="index">
              <hotgoodsComponent :goodsId="item.goodsId" :hotgoodsimage="item.image" :hotgoodsprice="item.price" :hotgoodsname="item.name"></hotgoodsComponent>

            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>


  </div>
</template>
<script>
  import axios from 'axios'
  import floorComponent from '../component/floorComponent'
  import hotgoodsComponent from '../component/hotgoodsComponent'
  import URL from '@/serviceAPI.config.js'
  import {
    toMoney
  } from '@/filter/moneyFilter'
  import {
    Swiper,
    SwiperSlide,
    directive
  } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  export default {
    data() {
      return {
        lactionIcon: require("../../assets/images/loction.png"),
        bannerPicArray: [],
        //  轮播下面的导航图片
        category: [],
        // 广告图片
        adBanner: '',
        //推荐的商品
        recommendGoods: [],
        floor1: [], //楼层数组
        floor2: [], //楼层数组2
        floor3: [], //楼层数组3
        floor1_0: '', //楼层数组
        floor1_1: '', //楼层数组
        floor1_2: '', //楼层数组
        swiperOptions: {
          slidesPerView: 3
        },
        floorName: {},
        hotgoods: [],

      }
    },
    filters: {
      moneyFilter(money) {
        return toMoney(money)
      }
    },
    components: {
      Swiper,
      SwiperSlide,
      floorComponent,
      hotgoodsComponent
    },methods: {
      goGoodsList(){
        this.$router.push({path:'/categoryList'})
      },
      goGoodsListId(mallCategoryId){
        // console.log(mallCategoryId)
        this.$router.push({path:'/categoryList',query: { mallCategoryId:mallCategoryId-1 }})
      }
    },
    created() {
      axios({
        url: URL.shoppingIndex,
        method: 'get',
      }).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.category = res.data.data.category; //导航的图
          this.adBanner = res.data.data.advertesPicture; //广告图
          this.bannerPicArray = res.data.data.slides; //轮播图
          this.recommendGoods = res.data.data.recommend //推荐商品
          this.floor1 = res.data.data.floor1 //楼层1数据
          this.floor2 = res.data.data.floor2 //楼层1数据
          this.floor3 = res.data.data.floor3 //楼层1数据
          this.floor1_0 = this.floor1[0]
          this.floor1_1 = this.floor1[1]
          this.floor1_2 = this.floor1[2]
          this.floorName = res.data.data.floorName;
          this.hotgoods = res.data.data.hotGoods
        }
      }).catch(error => {
        console.log(error)
      })
    },
  }

</script>
<style scoped>
  .serch_bar {
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
  }

  .serch_input {
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid !important;
    background-color: #e5017d;
    color: #fff;
  }

  .location-icon {
    padding-top: .2rem;
    padding-left: .3rem;
  }

  .swiper-area {
    width: 20rem;
    clear: both;
  }

  .swiper-area img {
    max-height: 10rem;
  }

  .type-bar {
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .type-bar div {
    padding: .3rem;
    font-size: 12px;
    text-align: center;
    flex: 1;
  }

  .recommend-area {
    background-color: #fff;
    margin-top: .3rem;
  }

  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
  }

  .recommend-body {
    border-bottom: 1px solid #eee;
  }

  .recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }

  .hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
    /* overflow: hidden; */
  }

  .hottitle {
    color: red;
    font-size: 20px;
    border-bottom: 1px solid #ddd;
  }
 .hot-goods{
   padding-bottom: 50px;
 }
</style>
