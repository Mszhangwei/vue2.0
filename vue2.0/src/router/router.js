import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const route = new VueRouter({
	routes:[{
    path:'/index',component:require('../views/index')
  },{
    path:'/hotel',component:require('../views/hotel')
  },{
    path:'/tieba',component:require('../views/tieba')
  },{
    path:'/nomoney',component:require('../views/nomoney')
  },{
    path:'/order',component:require('../views/order')
  },{
    path:'/bill',component:require('../views/bill')
  },{
    path:'/integral',component:require('../views/integral')
  },{
    path:'/about',component:require('../views/about')
  },{
    path:'/huiyi',component:require('../views/huiyi')
  },{
    path:'*',redirect:'/index'
  }]
   
   
})

export default route;