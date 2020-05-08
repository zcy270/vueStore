// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Tabbar, TabbarItem,Sidebar,Stepper ,PullRefresh , Toast ,SidebarItem ,Tab, Tabs , Button, Row, Col ,Search , Swipe , SwipeItem , Lazyload ,List ,Field ,NavBar, Cell, CellGroup} from 'vant'
Vue.use(Sidebar).use(Stepper).use(Tabbar).use(TabbarItem).use(PullRefresh).use(Toast).use(SidebarItem).use(Tab).use(Tabs).use(Button).use(Row).use(Col).use(Search).use(Cell).use(CellGroup).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
