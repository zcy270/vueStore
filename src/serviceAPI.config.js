const BASEURL="http://rap2.taobao.org:38080/app/mock/249919/GET/"
const LOCALURL = "http://localhost:3000/"
const URL={
    shoppingIndex:BASEURL+'imagesData',//首页所有数据,
    registerUser:LOCALURL+'user/register',//用户注册接口
    login:LOCALURL+'user/login',//用户登录接口
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',//用户登录接口
    getCategoryList:LOCALURL+'goods/getCategoryList',//得到大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList',//得到小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',//得到小类商品信息
}
module.exports=URL