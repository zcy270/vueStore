<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" left-text="返回" left-arrow @click-left="onClickLeft"  />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <van-sidebar id="leftNav" v-model="activeKey">
            <van-sidebar-item v-for="(item , index) in category" :key="item.MALL_CATEGORY_NAME" :title='item.MALL_CATEGORY_NAME'  @click="clickCategory(index,item.ID)" />
          </van-sidebar>
        </van-col>
        <van-col span="18">
          <van-tabs v-model="active" @click="onClickCategorySub">
            <van-tab v-for="(item,index) in categorySub" :key="item.MALL_SUB_NAME+index" :title="item.MALL_SUB_NAME" >
            </van-tab>
          </van-tabs>
          <div class="van_list">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <div class="list-item" v-for="(item,index) in goodsList" :key="item+index" :title="item" @click="goGoodsInfo(item.ID)" >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>{{item.ORI_PRICE | myMonney}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import hotgoodsComponent from '../component/hotgoodsComponent'
  import {toMoney} from '@/filter/moneyFilter.js'
  export default {
    data() {
      return {
        category: [],
        activeKey:0,//大类选择器
        categorySub:[],//小类类别
        active:0,//小类的选择器
        loading: false,//上拉加载
        finished: false,
        isLoading:false,//下拉更新
        page:1,          //商品列表的页数
        goodsList:[],     //商品信息
        categorySubId:'' ,//商品子分类ID
        errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'   ,  //错误图片显示路径
      }
    },
    components:{
      hotgoodsComponent,
    },
    mounted() {
      let winHight=document.documentElement.clientHeight
      document.getElementById("leftNav").style.height=winHight-46-50+"px"
      document.getElementsByClassName("van_list")[0].style.height=winHight-90-50+"px"
    },
    filters:{
      myMonney(money){
        return toMoney(money)
      }
    },
    methods: {
      getCategory() {
        axios({
            url: url.getCategoryList,
            method: "get",

          })
          .then(res => {
            // console.log(res)
            if (res.data.code == 200 && res.data.message) {
              this.category = res.data.message
            } else {
              Toast('服务器错误，数据获取失败')
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      //点击大类的方法
      clickCategory(index,categoryId){
        this.categoryIndex=index
        this.page=1
        this.finished = false
        this.goodsList=[]
        this.getCategorySubByCategoryId(categoryId)

      },
      //根据大类ID读取小类类别列表
      getCategorySubByCategoryId(categoryId){
        // console.log(categoryId)
        axios({
            url:url.getCategorySubList,
            method:'post',
            data:{categoryId:categoryId}
        })
        .then(response=>{
          // console.log(response)
            if(response.data.code == 200 && response.data.message){
                this.categorySub=response.data.message
                // console.log( this.categorySub)
                this.active = 0
                this.categorySubId=this.categorySub[0].ID
                this.onLoad()
            }else{
                Toast('服务器错误，数据取得失败')
            }  
        })
        .catch(error=>{
            console.log(error)
        }) 
      },
      onLoad() {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
          this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
          this.getGoodsList()
        }, 1000);
      },
      //下拉刷新
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
          this.finished = false;
          this.goodsList=[];
          this.page=1
          this.onLoad();
        }, 1000);
      },
      //获取商品信息
      getGoodsList(){
        axios({
          url:url.getGoodsListByCategorySubID,
          method:"post",
          data:{
            categorySubId:this.categorySubId,
            page:this.page
          }
        })
        .then(response=>{
          // console.log(response)
          if(response.data.code==200&&response.data.message.length){
            this.page++
            this.goodsList=this.goodsList.concat(response.data.message)//吧数组添加进去
          }else{
            this.finished=true
          }
          this.loading=false;
          // console.log(this.finished)
        })
        .catch(error=>{
          console.log(error)
        })
      },
      //切换小类
      onClickCategorySub(index,title){
        // console.log(index)
        this.categorySubId=this.categorySub[index].ID
        // console.log(this.categorySubId)

        this.goodsList=[]
        // console.log(this.goodsList)
        this.finished=false
        this.page=1
        this.onLoad()
      },
      // s去商品详情
      goGoodsInfo(goodsId){
        this.$router.push({path:"/goods", query: { goodsId: goodsId } })
      }

    },
    created() {
      this.getCategory()
      this.getCategorySubByCategoryId(this.activeKey+1)
      this.getGoodsList()
      // console.log(this.$route.params.mallCategoryId)
      this.activeKey=this.$route.query.mallCategoryId?this.$route.query.mallCategoryId:0
      this.clickCategory(this.activeKey,this.activeKey+1)
    },
  }

</script>
<style scoped>
#leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}

#leftNav{
  background-color:#fafafa;
  height: 50rem;
}
.list_item{
  text-align:center;
  line-height:80px;
  border-bottom:1px solid #ddd;
  background-color:#fff;
}
.van_list{
  overflow: scroll;
}
.list-item{
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
}
.list-item-img{
    flex:8;
}
.list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
}
</style>
