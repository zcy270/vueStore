<template>
    <div>
        <div class="main-div">
            <keep-alive>
                    <router-view/>
            </keep-alive>
        </div>
        <van-tabbar v-model="active"   route>
            <van-tabbar-item  name="main" to="/"  icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item name="categoryList"  to="/categoryList"  icon="orders-o">列表页</van-tabbar-item>
            <van-tabbar-item name="cart"  to="/cart"  icon="cart-o">购物车</van-tabbar-item>
            <van-tabbar-item name="Member" to="/Member"  icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>   
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: "main",
        };
    },
    created() {
        this.getActive()
    },
    methods: {
        // 初始化第几个
        getActive(){
            // this.active=this.$route.params.active?this.$route.params.active:"main"
            this.nowPath= this.$route.path
            if(this.nowPath=="/Cart"){
                this.active="cart"
            }
        }
    },
}
</script>
<style scoped>
 

</style>