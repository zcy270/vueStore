import Vue from 'vue'
import Router from 'vue-router'
import ShowppingMall from '@/components/pages/ShowppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Main,
      children:[
        {path: '/',name: 'ShowppingMall',component: ShowppingMall}, 
        {path: '/cart',name: 'Cart',component: Cart},
        {path: '/categoryList',name: 'CategoryList',component: CategoryList},
        {path: '/member',name: 'Member',component: Member},
      ]}, 
    {path: '/register',name: 'Register',component: Register},
    {path: '/login',name: 'Login',component: Login},
    {path: '/goods',name: 'Goods',component: Goods},
  ]
})
