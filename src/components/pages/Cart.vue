<template>
    <div>
        <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft" /> 
        <!--显示购物车中的商品-->
        <div class="cart-list">
            <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="pang-img"><img :src="item.image" width="100%" /></div>
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.Name}}</div>

                        <div class="pang-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="pang-goods-price">
                   <div> {{item.price | moneyFilter}}</div>
                   <div>x {{item.count}}</div>
                   <div> {{item.price*item.count | moneyFilter}}</div>
                
                </div>
            </div>
        </div>
        <!-- 显示总金额 -->
        <div class="totalMoney">
            商品总价：{{totalMoney | moneyFilter}}
        </div>
        <!--清空购物车-->
        <div class="card-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
    </div>
</template>
<script>

import {toMoney} from '@/filter/moneyFilter.js'
export default{
    data() {
        return {
            isEmpty:false,//是否空购物车,空f 不空t
            cartInfo:[],//购物车中商品的信息
        }
    },
    created() {
        this.getCartInfo()
    },
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }
    },
    computed: {
        totalMoney(){
            let allMoney=0;
            this.cartInfo.forEach(item => {
                allMoney += item.price*item.count
            });
            localStorage.setItem("cartInfo",JSON.stringify(this.cartInfo))
            return allMoney
        }
    },
    methods:{
        getCartInfo(){
            if(localStorage.cartInfo){
                this.cartInfo=JSON.parse(localStorage.cartInfo)
            }
            console.log("this.carGoodInfo:"+JSON.stringify(this.cartInfo))
            this.isEmpty=this.cartInfo.length>0?true:false;
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        clearCart(){
            if (confirm("你清空购物车吗？")) {  
                localStorage.removeItem('cartInfo')
                this.cartInfo=[] 
            }
            
        },
    }
}

</script>
<style scoped>
.card-title{
    height: 2rem;
    line-height:2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align: right;
}
.cart-list{
    background-color: #fff;
}
.pang-row{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;


}
.pang-img{
    flex:6;
}
.pang-text{
    flex:14;
    padding-left:10px;
}
.pang-control{
    padding-top: 10px;
}
.pang-goods-price{
    flex:4;
    text-align: right;
}
.totalMoney{
    text-align: right;
    background-color: #fff;
     border-bottom:1px solid #E4E7ED;
     padding: 5px;
}
</style>