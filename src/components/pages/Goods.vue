<template>
    <div>
        <div class="navbay">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
                />
        </div>
        <div class="topImage">
            <img :src="goodsInfo.IMAGE1" alt="" width="100%" :onerror="errorImg" />
        </div>
        <div class="goodname">
            {{goodsInfo.NAME}}
        </div>
        <div class="goodprice">
            {{goodsInfo.PRESENT_PRICE | moneyFilter}}元
        </div>
        <van-tabs swipeable sticky>
            <van-tab title="商品详情">
                <div class="goodsInfoImage" v-html="goodsInfo.DETAIL">
                </div>
            </van-tab>
            <van-tab title="评论详情">暂无评论</van-tab>
        </van-tabs>
        <div class="goods-bottom">
            <div>
              <van-button size="large" type="primary" @click="getCarGoodsInfo" >加入购物车</van-button>
            </div>
            <div>
              <van-button size="large" type="danger">直接购买</van-button>
            </div>
          </div>
    </div>
</template>
<script>

import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'
import {toMoney}  from "@/filter/moneyFilter.js";
export default {
    data() {
        return {
            goodsId:'',
            goodsInfo:{},
            errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'   ,  //错误图片显示路径
        }
    },
    methods: {
        getInfo(){
            axios({
                method:"post",
                url:url.getDetailGoodsInfo,
                data:{
                    goodsId:this.goodsId
                }
            }).then(res=>{
                if(res.data.code==200&&res.data.message){
                    this.goodsInfo=res.data.message
                }else{
                    Toast.fail("数据请求失败")
                }
                console.log(this.goodsInfo)
            }).catch(error=>{
                console.log(error)
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        //添加购物车
        getCarGoodsInfo(){
            //取出购物车的商品
            let cartInfo=localStorage.cartInfo?JSON.parse(localStorage.cartInfo):[]
            // 判断商品在不在购物车
            let isHaveGood=cartInfo.find(cart=>{
                return cart.goodsId==this.goodsId
            })
            if(!isHaveGood){//如果不在泽添加重组
                let newcartInfo={
                    goodsId:this.goodsInfo.ID,
                    Name:this.goodsInfo.NAME,
                    price:this.goodsInfo.PRESENT_PRICE,
                    image:this.goodsInfo.IMAGE1,
                    count:1
                }
                cartInfo.push(newcartInfo)
                localStorage.setItem("cartInfo",JSON.stringify(cartInfo))
                console.log(localStorage.getItem("cartInfo"))
                Toast.success("添加购物车成功")
                this.$router.push({name:"Cart",params:{active:"cart"}})
            }else{
                Toast.fail("该商品已在购物车中")
            }
        }
    },
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }
    },
    created() {
        this.goodsId= this.$route.query.goodsId 
        this.getInfo()
        // localStorage.clear()
    },
}
</script>

<style>
    .goodsInfoImage{
        font-size:0px;
    }
    .goods-bottom{
        position: fixed;
        bottom:0px;
        left:0px;
        z-index: 10;
        background-color: #FFF;
        width:100%;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-bottom > div{
        flex:1;
        padding:5px;
    }
</style>